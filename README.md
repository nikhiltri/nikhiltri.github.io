![nikhil trivedi](/images/logo@2x.png)

# Personal website
> The live code for my personal website, nikhiltrivedi.com. Built in [Jekyll](https://jekyllrb.com/)

My personal website is where I document all my projects, and share writings on my blog. Since 2017, I've used this repository as my website, and GitHub pages to publish to nikhiltrivedi.com.

## Frontend theme

The frontend theme uses [Canvas](https://themeforest.net/item/canvas-the-multipurpose-html5-template/9228123), a ThemeForest theme I purchased in 2017 to get me going. I generally rely on the default design.

Canvas files are kept separate from my own, so upgrading is a drop-in replacement:

```
assets/
  vendor/canvas/        # Canvas files, copied as-is. Never edit these.
    style.css           #   theme + Bootstrap 5 (version is in its header comment)
    css/font-icons.css  #   icon fonts (Font Awesome, Bootstrap Icons, Unicons)
    css/icons/
    js/plugins.min.js   #   jQuery + all Canvas plugins
    js/functions.bundle.js
    images/             #   images referenced by style.css
  css/custom.css        # my style overrides, including the brand color
  js/custom.js          # my scripts
images/                 # my images (logos, posts, projects)
_includes/, _layouts/   # page markup, based on Canvas's HTML
```

Stylesheets are loaded in [_includes/head.html](_includes/head.html), scripts at the bottom of [_layouts/default.html](_layouts/default.html).

### Upgrading Canvas

From the downloaded `canvas-template-full/` folder, copy these files over the matching ones in `assets/vendor/canvas/`:

* `style.css`
* `css/font-icons.css` and `css/icons/`
* `js/plugins.min.js` and `js/functions.bundle.js`
* `images/pattern.png`, `images/grid.png`, `images/icons/{play.png,close.png,iconalt.svg}`

Then check the theme's `UPGRADE.md` for markup changes, and compare the demo HTML (e.g. `blog.html`) against `_includes/` and `_layouts/`.
To use a new Canvas component, copy its markup into a template and its CSS/JS into `assets/vendor/canvas/` if it isn't already bundled.

## Developing

This site uses Ruby 3.3 to match [GitHub Pages](https://pages.github.com/versions/). With Homebrew, install it and make it the default `ruby`:

```shell
brew install ruby@3.3
brew unlink ruby   # only if Homebrew's ruby (4.x) is installed
brew link --force ruby@3.3
bundle install
```

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
