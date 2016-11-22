require 'fileutils'
require 'yaml'

class CleanupAfterImport

  def run
    posts = '_posts/'

    Dir.foreach(posts) do |item|
      next if item.start_with?(".")

      text = File.read(File.join(posts, item))

      # Remove breaks
      text = text
               .gsub(/<!--break-->/, "")

      # Replace links
      text = text
               .gsub(/<a href=["']([^"']+)["'][^>]*>([^<]*)<\/a>/, "[\\2](\\1)")

      # Make absolute links local
  
      # Clean up links

      # Replace image tags
      # wget image file to assets/images directory

      # To write changes to the file, use:
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
        next if item.start_with?(".") or item == 'content' or item == 'diary-uh' or item == 'node'
        
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
