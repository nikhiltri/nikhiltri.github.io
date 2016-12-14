namespace :migrate do
  desc 'Migrate redirects from htaccess jekyll-redirect-from'
  task :redirects do
    ruby "_tasks/migrate_redirects.rb"
  end
end

desc 'Clean up posts after initial import from Drupal'
task :clean do
  ruby "_tasks/cleanup-after-import.rb"
end
