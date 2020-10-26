[wiki]: https://github.com/FaithfulTweaks/FaithfulTweaks/wiki
[hugo]: https://gohugo.io/
[node]: https://nodejs.org/
[webpack]: https://webpack.js.org/
[sass]: https://sass-lang.com/
[typescript]: https://www.typescriptlang.org/

# Website
This folder is the home of the website. The website is built with [HUGO][hugo]. If you have any issues, please check out HUGO's documentation first.

## Testing and Building
[HUGO][hugo] and [NodeJS][node] are required to run the website. Please first run `npm install` to install the required NodeJS packages.

- `npm run build` - This command will build the website and place the output in /public/
- `npm run dev` - This command will build the website and serve a live development version that you can open in the browser.
- `npm run clear` - This command will clear the output directories of [HUGO][hugo] and [Webpack][webpack].

## A Quick Rundown
Here's a quick rundown on what a few different folders do.

- `content/` - Markdown for the homepage and blog posts.
- `data/` - Data for all the modules.
- `layouts/` - The HTML code for the different pages.
- `src/scss/` - The [SCSS][sass] styles for the website.
- `src/ts/` - The [TypeScript][typescript] code for the website.
- `static/` - Files to be included in the build.

## Looking For More?
If you need some more help please refer to [the wiki][wiki].