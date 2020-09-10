![nikhil trivedi](/images/logo@2x.png)

# Personal website
> The live code for my personal website, nikhiltrivedi.com. Built in [Jekyll](https://jekyllrb.com/)

My personal website is where I document all my projects, and share writings on my blog. Since 2017, I've used this repository as my website, and GitHub pages to publish to nikhiltrivedi.com.

## Frontend theme

The frontend theme uses [Canvas](https://themeforest.net/item/canvas-the-multipurpose-html5-template/9228123), a ThemeForest theme I purchased in 2017 to get me going. I generally rely on the default design.

## Developing

To run locally, run:

```shell
bundle exec jekyll serve
```

This will spin up small server and host the website locally at http://localhost:4000/.

## Updating

To add or update content, simply update the code file, commit it and push it to GitHub. GitHub Pages will take care of compiling the static files and deploy them to nikhiltrivedi.com through GitHub Pages.

To add or update projects, look in the [_projects](_projects) directory.

To add or update blog posts, look in the [_posts](_posts) directory.

To update the homepage, look at [_layouts/home.html](_layouts/home.html).