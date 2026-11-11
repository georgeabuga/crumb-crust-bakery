/* ==========================================================================
   NORTH STAR BAKERY - INTERACTIVITY & CLIENT-SIDE DATA (script.js)
   Touchstone 4: product favorites saved with localStorage, a custom
   order calculator, and JavaScript form validation.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* --- Product data: an array of objects (id, name, price) --- */
  const bakeryProducts = [
    { id: 1, name: "Artisan Sourdough Loaf", price: 7.50 },
    { id: 2, name: "Butter Croissant", price: 4.00 }
  ];

  const FAVORITES_KEY = "bakeryFavorites";

  /* --- Favorites (wishlist) with localStorage --- */
  const wishlistList = document.getElementById("wishlist-list");
  const clearWishlistBtn = document.getElementById("clear-wishlist");

  // Read the saved favorites array from localStorage (empty array if none)
  function getFavorites() {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  }

  // Render the saved favorites into the wishlist on the products page
  function loadWishlist() {
    if (!wishlistList) return;
    const savedFavorites = getFavorites();
    wishlistList.innerHTML = "";
    if (savedFavorites.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No favorite items saved yet. Click 'Add to Favorites' on any product!";
      wishlistList.appendChild(li);
      return;
    }
    savedFavorites.forEach(function (item) {
      const li = document.createElement("li");
      li.textContent = item.name + " - $" + item.price.toFixed(2);
      wishlistList.appendChild(li);
    });
  }

  // Save one product to favorites (skips duplicates)
  window.saveToFavorites = function (productId) {
    const product = bakeryProducts.find(function (p) { return p.id === productId; });
    if (!product) return;
    const savedFavorites = getFavorites();
    const exists = savedFavorites.some(function (item) { return item.id === productId; });
    if (exists) {
      alert(product.name + " is already in your favorites.");
      return;
    }
    savedFavorites.push(product);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(savedFavorites));
    alert(product.name + " has been added to your favorites!");
    loadWishlist();
  };

  if (clearWishlistBtn) {
    clearWishlistBtn.addEventListener("click", function () {
      localStorage.removeItem(FAVORITES_KEY);
      loadWishlist();
      alert("Favorites list cleared.");
    });
  }

  loadWishlist();

  /* --- Custom order calculator --- */
  const calcBtn = document.getElementById("calculate-btn");
  if (calcBtn) {
    calcBtn.addEventListener("click", function () {
      const sourdoughQty = parseInt(document.getElementById("calc-sourdough").value, 10) || 0;
      const croissantQty = parseInt(document.getElementById("calc-croissant").value, 10) || 0;
      const total = (sourdoughQty * bakeryProducts[0].price) + (croissantQty * bakeryProducts[1].price);
      document.getElementById("calc-result").textContent =
        "Estimated Order Total: $" + total.toFixed(2);
    });
  }

  /* --- Contact form validation --- */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const fullName = document.getElementById("fullname");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    // Show or clear one field's error state and message
    function setFieldState(input, errorEl, errorText) {
      if (errorText) {
        input.classList.add("error");
        input.classList.remove("success");
        errorEl.textContent = errorText;
        return false;
      }
      input.classList.remove("error");
      input.classList.add("success");
      errorEl.textContent = "";
      return true;
    }

    function validateName() {
      const errorEl = document.getElementById("name-error");
      if (fullName.value.trim() === "") {
        return setFieldState(fullName, errorEl, "Full name is required.");
      }
      return setFieldState(fullName, errorEl, "");
    }

    function validateEmail() {
      const errorEl = document.getElementById("email-error");
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value.trim() === "") {
        return setFieldState(email, errorEl, "Email address is required.");
      }
      if (!emailPattern.test(email.value.trim())) {
        return setFieldState(email, errorEl, "Please enter a valid email address (e.g., jane@example.com).");
      }
      return setFieldState(email, errorEl, "");
    }

    function validateMessage() {
      const errorEl = document.getElementById("message-error");
      if (message.value.trim().length < 10) {
        return setFieldState(message, errorEl, "Your inquiry must be at least 10 characters long.");
      }
      return setFieldState(message, errorEl, "");
    }

    // Real-time feedback as the user types or leaves a field
    fullName.addEventListener("blur", validateName);
    fullName.addEventListener("input", validateName);
    email.addEventListener("blur", validateEmail);
    email.addEventListener("input", validateEmail);
    message.addEventListener("blur", validateMessage);
    message.addEventListener("input", validateMessage);

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Always handle submission with JavaScript
      const nameOk = validateName();
      const emailOk = validateEmail();
      const messageOk = validateMessage();
      if (nameOk && emailOk && messageOk) {
        localStorage.setItem("lastUser", fullName.value.trim());
        alert("Thank you, " + fullName.value.trim() + "! Your inquiry has been successfully validated and submitted.");
        contactForm.reset();
        contactForm.querySelectorAll(".success").forEach(function (el) {
          el.classList.remove("success");
        });
      }
      // If anything is invalid, the entered text stays in place so the
      // user can correct the errors without retyping.
    });
  }
});
