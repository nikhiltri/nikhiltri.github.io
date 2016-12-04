require 'fileutils'
require 'yaml'
require 'open-uri'

class CleanupAfterImport

  def run
    posts = '_posts/'

    # TODO Create non-post pages
    
    Dir.foreach(posts) do |item|
      next if item.start_with?(".")

      text = File.read(File.join(posts, item))

      # Remove breaks
      text = text.gsub(/<!--break-->/, "")

      # Clean up tabs
      text = text.gsub(/\t/, "")

      # Fix incorrect HTML
      text = text.gsub(/(<a href="http:\/\/www.nytimes.com\/2012\/12\/13\/arts\/music\/ravi-shankar-indian-sitarist-dies-at-92.html\?pagewanted=all&_r=0">New York Times)/, "\\1</a>")
      text = text.gsub(/(<a href="http:\/\/www.melissaharrislacewell.com\/")./, "\\1>")

      # Make categories tabs
      text = text.gsub(/categories:/, "tags:")

      # Clean up new lines and <br/>s
      text = text.gsub(/\r/, "")
      text = text.gsub(/<br[ \/]*>/, "\n")
      
      # Replace <img>
      text = text
               .gsub(/<img src=["']([^"']+)["']( alt=["']([^"']+)["'])?[^>]*>/) { |m| "![" + $3.to_s + "](" + $1.to_s + ")" }
     
      # Replace <a>
      text = text
               .gsub(/<a [ a-zA-Z="']*href=["']([^"']+)["'][^>]*>([^<]*)<\/a>/, "[\\2](\\1)")
      
      # Replace <em>
      text = text.gsub(/<[\/]?em>/, "_")
      text = text.gsub(/<[\/]?i>/, "_")

      # Replace <strong>
      text = text.gsub(/<strong>([^<]+)<\/strong>\n/, "### \\1\n")
      text = text.gsub(/<strong>([^<]+)<\/strong>/, "**\\1**")

      # Replace <b>
      text = text.gsub(/<b>([^<]+)<\/b>/, "**\\1**")

      # Replace <h3>
      text = text.gsub(/<h3>([^<]+)<\/h3>\n/, "### \\1\n")

      # Replace <p>s
      text = text.gsub(/<p>([^<]+)<\/p>/, "\\1")

      # Replace <ul> and <ol>
      text = text.gsub(/<[\/]?ol>/, "")
      text = text.gsub(/<[\/]?ul>/, "")
      text = text.gsub(/<li>([^<]+)<\/li>/, "* \\1")
      
      # Replace <code>
      text = text.gsub(/<code>([^<]+)<\/code>/, "`\\1`")

      # Replace &lt; and &gt;s
      text = text.gsub(/&lt;/, "<")
      text = text.gsub(/&gt;/, ">")

      # Replace <hr />
      text = text.gsub(/<hr[ \/]*>/, "---")

      # Replace <blockquote> and <pre>
      indentIt = false
      indentWith = ""
      newText = ""
      text.each_line do |line|
        if line.include? "<blockquote>" or line.include? "<bockquote>"
          line = line.gsub(/<bl?ockquote>/, "")
          indentIt = true
          indentWith = "> "
        elsif line.include? "<pre>"
          line = line.gsub(/<pre>/, "    ")
          indentIt = true
          indentWith = '    '
        end
        if indentIt
          line = indentWith + line.strip + "\n"
        end
        if line.include? "</blockquote>"
          line = line.gsub(/<\/blockquote>/, "")
          indentIt = false
        elsif line.include? "</pre>"
          line = line.gsub(/<\/pre>/, "    ")
          indentIt = false
        end
        newText += line
      end
      text = newText

      # wget image file to images directory
      text = text
               .gsub(/[htp:\/w2\.niklrvedcom]*(\/sites\/default\/files\/images\/([a-zA-Z0-9\._\-]+))/) { |m| open('images/' + $2, 'wb') do |f| f << open('http://www.nikhiltrivedi.com' + $1).read end; '/images/' + $2 }
        
      # Make absolute links local
      # TODO Ignore non-post pages
      text = text
               .gsub(/http:\/\/[w\.]*nikhiltrivedi.com\/[conten\/]*([a-z\-]+)/) { |m| file = Dir.glob("_posts/*" + ($1 == 'memory-aparna-sharma' ? 'aparna-sharma' : $1) + ".md"); file.first.gsub(/_posts/, "").gsub(/([0-9]+)\-([0-9]+)\-([0-9]+)\-/, "\\1/\\2/\\3/").gsub(/\.md/, "") }

      # Clean up numbered lists
      text = text.gsub(/^> ([0-9]+)\)/, "> \\1.")

      # Write changes to the file
      File.open(File.join(posts, item), "w") {|file| file.puts text }
    end
    
    # Make list of redirects and write .htaccess file
    redirects = get_redirects('./')
    redirects += get_redirects('content/')
    redirects += get_redirects('diary-uh/')
    redirects += get_redirects('node/')
    
    if not redirects.empty?
      File.open(".htaccess", "w") {|file| file.puts redirects }
    end
  end
  
  def get_redirects(dir)
    redirects = '';
    if File.directory?(dir)
      Dir.foreach(dir) do |item|
        next if item.start_with?(".") or item == 'content' or item == 'diary-uh' or item == 'node' or item == 'images'
        
        if File.directory?(File.join(dir,item)) and not item.start_with?("_")
          props = YAML.load_file(File.join(dir, item, "index.md"))
          redirects += "Redirect 301 /" + (dir == './' ? item : File.join(dir, item)) + " " + props['refresh_to_post_id'] + "\n"
          FileUtils.rm_r File.join(dir,item)
        end
      end
    
      if dir != "./"
        FileUtils.rm_r File.join(dir)
      end
    end
    redirects
  end
end

CleanupAfterImport.new.run
