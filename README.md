# kunhao18.github.io

My personal academic site. A single static page — no build step, no framework,
no dependencies. It deploys to GitHub Pages exactly as it sits in this repo.

Design: "classic academic" two-column serif (Source Serif 4 + JetBrains Mono),
with a light/dark toggle. Adapted from a Claude Design handoff (Direction A).

## Files

| File              | What it is                                                        |
| ----------------- | ----------------------------------------------------------------- |
| `index.html`      | Page shell + all styling (the `<style>` block).                   |
| `config.js`       | **All my content** — name, bio, news, publications, experience.   |
| `render.js`       | Builds the page from `config.js`. Rarely needs editing.           |
| `assets/img/`     | Images (e.g. the portrait `prof_pic_my.jpg`).                     |
| `.nojekyll`       | Tells GitHub Pages to serve the files as-is (skip Jekyll).        |

## Updating my info

Edit **`config.js`** — it's the only file I normally touch. Each section has
comments. To add a news item or paper, copy an existing entry in the relevant
list and edit it.

- **Theme / accent color:** `defaultTheme`, `accentLight`, `accentDark`.
- **Portrait:** drop a file in `assets/img/` and point `photo` at it.
- **Colors / spacing / layout:** the `<style>` block in `index.html`.

## Preview locally

Open `index.html` directly in a browser, or serve the folder:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy

Push to the `main` branch of `kunhao18/kunhao18.github.io`. GitHub Pages serves
it at https://kunhao18.github.io within a minute or two.

## Unlisted page (`p-…/`)

The `p-<random-id>/` directory is a separate, self-contained static page
(its own HTML, JS and images). It is not linked from the homepage, carries
`noindex, nofollow, noarchive` and a `no-referrer` policy, and is not in any
sitemap. It is unlisted, not private: anyone with the URL can open it, and the
directory name is visible in this public repository.

All of its content lives in the config file inside that directory; the comments
there explain every field. Preview locally with the same
`python3 -m http.server 8000` and open `http://localhost:8000/p-<id>/`.
