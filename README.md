# Crumb & Crust Bakery

Four-page bakery website built for Sophia Introduction to Web Development
(Touchstone Task 2 structure, Touchstone 3 visual design).

Pages: index.html, products.html, about.html, contact.html
Styles: css/styles.css (external stylesheet linked on every page)

Media files to add (exact names/paths the pages reference):
- images/hero-large.jpg
- images/hero-small.jpg
- images/sourdough.jpg
- images/croissant.jpg
- images/master-baker.jpg
- media/baker-welcome.mp4
- media/baker-welcome.webm

Media sourced from Pexels (free to use):
- hero images: freestocks.org, photo 1383908
- sourdough.jpg: adrian vieriu, photo 11646507
- croissant.jpg: Anna Shvets, photo 5964496
- master-baker.jpg: Katerina Holmes, photo 5908170
- baker-welcome video: Monserrat Soldu, video 2959290

## Touchstone 4 Features
- Product favorites (wishlist) on products.html: visitors save items with the "Add to Favorites" buttons, and the list is stored in the browser with localStorage so it persists across visits. A Clear Favorites button removes the saved data.
- Quick Order Estimator on products.html: calculates an estimated pickup total from the product prices stored in the JavaScript product array.
- JavaScript form validation on contact.html: checks that the name is entered, the email matches a valid format, and the inquiry is at least 10 characters, showing error messages beside each field and preventing invalid submissions.
- All interactivity lives in the external file js/script.js, organized into functions (loadWishlist, saveToFavorites, validateName, validateEmail, validateMessage).

## How to Run
Open index.html in a web browser, or visit the live site: https://georgeabuga.github.io/crumb-crust-bakery/
