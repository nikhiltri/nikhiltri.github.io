require 'uri'
require 'yaml'

redirs = File.read(".htaccess")
redirs.each_line do |line|
  if line.include? "Redirect 301"
    values = line.split(" ")
    uri = URI.parse(values[3])
    if uri.path =~ /^\/\d{4}/
      begin
        filename = '_posts/' + uri.path[1..uri.path.length].gsub(/\//, "-").gsub(/\.html/, ".md")
        text = File.read(filename)
        text = text.gsub(/---\nlayout: post/, "---\nredirect_from: " + values[2] + "\nlayout: post")
        File.open(filename, "w") {|file| file.puts text }
        redirs = redirs.gsub(/#{line}/, "")
      rescue
        next
      end
    end
  end
end
File.open(".htaccess", "w") {|file| file.puts redirs }
