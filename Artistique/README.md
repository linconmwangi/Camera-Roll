# Artistique Pictures

A responsive photography portfolio and booking website built with plain HTML, CSS, and JavaScript.

## Project files

- `index.html` contains the page content and forms.
- `styles.css` contains the layout, responsive rules, and visual styles.
- `script.js` powers the navigation, portfolio filters, photo lightbox, video dialogs, and form interactions.

## Run locally

Open `index.html` in a browser, or start a local server from this directory:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Features

- Responsive photography portfolio with category filters and a photo lightbox.
- Video previews in modal dialogs.
- Booking form with Kenyan mobile number validation. Full numbers in `+254` or local `07`/`01` formats are accepted.
- Contact details, a WhatsApp link, and a map centered on Rongai, Kenya.
- Mobile navigation and reduced-motion support.

## Before publishing

- Replace the empty About photo source in `index.html` when the final image is available.
- Connect the booking and contact forms to a submission service. They currently show client-side confirmation messages and do not send or store submissions.
- Replace any remaining sample content or media with the final business information and assets.

Google Fonts, Unsplash images, YouTube embeds, Google Maps, and WhatsApp links require an internet connection.
