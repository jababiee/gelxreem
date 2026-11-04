# GelXReem website

Static site for GelXReem (Gel X nails by Reem, Blacksburg VA). No build step — plain HTML, CSS, and JS.

## Put it on GitHub Pages
1. Create a repo (e.g. `gelxreem`) and upload everything in this folder, keeping the `images/` folder.
2. Repo **Settings → Pages → Build and deployment → Deploy from a branch**, pick `main` and `/ (root)`, save.
3. The site goes live at `https://<username>.github.io/gelxreem/` within a minute or two.

## Quick edits
- **Availability line:** search `Booked until` in `index.html`.
- **Prices:** the price list and the booking pills (`data-low` / `data-high`) are both in `index.html`.
- **About text:** search `Meet Reem` in `index.html`.
- **Gallery:** add photos to `images/` and add a `<figure>` line inside a `.track` in `gallery.html`. Copy a whole `.reel` block to start a new set.
- **Instagram handle for booking DMs:** top of `script.js`.

## How booking works
The form builds a request (length, shape, design details, add-ons, date, estimate), copies it to the clipboard, and opens an Instagram DM to @gelxreem. No server or paid service needed.
