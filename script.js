 (() => {
  "use strict";

  const products = window.YARDS_PRODUCTS || [];

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const state = {
    cart: [],
    searchTerm: "",
    activeProduct: null
  };

  const money = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);

  function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };

      return entities[character];
    });
  }

  function getImage(product) {
    return escapeHTML(product.image || "");
  }

  /* ========================================
     NOTIFICATIONS
  ======================================== */

  function showToast(message) {
    let toast = $("#yards-toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "yards-toast";
      toast.className = "toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }

  /* ========================================
     PRODUCT CARDS
  ======================================== */

  function renderProducts(category, containerSelector) {
    const container = $(containerSelector);

    if (!container) {
      console.warn(
        `YARDS: Product container not found: ${containerSelector}`
      );
      return;
    }

    const collection = products.filter(
      (product) => product.category === category
    );

    container.innerHTML = collection
      .map((product) => {
        const badge = product.badge
          ? `<span class="product-badge">${escapeHTML(product.badge)}</span>`
          : "";

        const oldPrice = product.oldPrice
          ? `<span style="color:#999;text-decoration:line-through;margin-left:6px">${money(product.oldPrice)}</span>`
          : "";

        const colorDots = (product.colors || [])
          .slice(0, 5)
          .map(
            (color) =>
              `<span class="color-dot" style="background:${escapeHTML(color)}" title="${escapeHTML(color)}"></span>`
          )
          .join("");

        return `
          <article class="product-card" data-product-id="${product.id}">
            <div class="product-image-wrap">
              ${badge}

              <img
                class="product-image"
                src="${getImage(product)}"
                alt="${escapeHTML(product.name)}"
                loading="lazy"
              >

              <button
                class="product-quick-add"
                type="button"
                data-action="quick-add"
                data-id="${product.id}"
                aria-label="Add ${escapeHTML(product.name)} to cart"
              >
                QUICK ADD · ${money(product.price)}
              </button>
            </div>

            <div class="product-info">
              <h3>
                <button
                  type="button"
                  data-action="details"
                  data-id="${product.id}"
                  style="border:0;background:none;color:inherit;text-align:left;font-weight:inherit"
                >
                  ${escapeHTML(product.name)}
                </button>
              </h3>

              <div class="product-meta">
                <span>${escapeHTML(product.color || product.type || "")}</span>
                <span class="product-price">
                  ${money(product.price)}${oldPrice}
                </span>
              </div>

              <div class="product-colors" aria-label="Available colors">
                ${colorDots}
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }


function renderAllProducts() {
  renderProducts("Men", "#men-products");
  renderProducts("Women", "#women-products");
}


  /* ========================================
     CART
  ======================================== */

  function getCartQuantity() {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  }

  function getCartTotal() {
    return state.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  function updateCartCount() {
    const count = getCartQuantity();

    $$(".cart-count").forEach((element) => {
      element.textContent = count;
      element.setAttribute("aria-label", `${count} items in cart`);
    });

    const totalElement = $("#cart-total");

    if (totalElement) {
      totalElement.textContent = money(getCartTotal());
    }
  }

  function renderCart() {
    const container = $("#cart-items");

    if (!container) {
      updateCartCount();
      return;
    }

    if (state.cart.length === 0) {
      container.innerHTML = `
        <div class="empty-cart">
          <p style="font-size:34px;margin-bottom:10px">🛍️</p>
          <p>Your bag is waiting for something good.</p>
        </div>
      `;
    } else {
      container.innerHTML = state.cart
        .map(
          (item) => `
            <article class="cart-item">
              <img
                src="${getImage(item)}"
                alt="${escapeHTML(item.name)}"
              >

              <div>
                <h3>${escapeHTML(item.name)}</h3>
                <p>${money(item.price)}</p>
                <p>Quantity: ${item.quantity}</p>

                <button
                  type="button"
                  class="remove-item"
                  data-action="remove"
                  data-id="${item.id}"
                >
                  Remove
                </button>
              </div>

              <strong>${money(item.price * item.quantity)}</strong>
            </article>
          `
        )
        .join("");
    }

    updateCartCount();
  }

  function addToCart(productId) {
    const product = products.find(
      (item) => item.id === Number(productId)
    );

    if (!product) {
      showToast("Sorry, this product could not be found.");
      return;
    }

    const existing = state.cart.find(
      (item) => item.id === product.id
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({
        ...product,
        quantity: 1
      });
    }

    renderCart();
    showToast(`${product.name} added to your bag!`);
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter(
      (item) => item.id !== Number(productId)
    );

    renderCart();
    showToast("Item removed from your bag.");
  }

  function openCart() {
    const drawer = $("#cart-drawer");
    const overlay = $("#overlay");

    if (!drawer) {
      showToast("Cart panel is not available in the HTML yet.");
      return;
    }

    drawer.classList.add("active");
    overlay?.classList.add("active");
    document.body.classList.add("no-scroll");

    drawer.setAttribute("aria-hidden", "false");
    renderCart();

    const closeButton = $('[data-action="close-cart"]', drawer);
    closeButton?.focus();
  }

  function closePanels() {
    $("#cart-drawer")?.classList.remove("active");
    $("#product-modal")?.classList.remove("active");
    $("#overlay")?.classList.remove("active");

    document.body.classList.remove("no-scroll");

    $("#cart-drawer")?.setAttribute("aria-hidden", "true");
    $("#product-modal")?.setAttribute("aria-hidden", "true");
  }

  /* ========================================
     PRODUCT DETAILS MODAL
  ======================================== */

  function openProductDetails(productId) {
    const product = products.find(
      (item) => item.id === Number(productId)
    );

    if (!product) return;

    const modal = $("#product-modal");

    if (!modal) {
      showToast("Product details panel is not available in the HTML yet.");
      return;
    }

    state.activeProduct = product;

    const image = $(".product-modal-image img", modal);
    const title = $("#modal-product-name");
    const price = $("#modal-product-price");
    const description = $("#modal-product-description");

    if (image) {
      image.src = product.image;
      image.alt = product.name;
    }

    if (title) title.textContent = product.name;
    if (price) price.textContent = money(product.price);

    if (description) {
      description.textContent =
        product.description || "A YARDS fashion essential.";
    }

    const oldPrice = $("#modal-product-old-price");

    if (oldPrice) {
      oldPrice.textContent = product.oldPrice
        ? money(product.oldPrice)
        : "";
    }

    modal.classList.add("active");
    $("#overlay")?.classList.add("active");
    document.body.classList.add("no-scroll");

    modal.setAttribute("aria-hidden", "false");
  }

  /* ========================================
     SEARCH
  ======================================== */

  function createSearchResults() {
    let results = $("#yards-search-results");

    if (!results) {
      results = document.createElement("div");
      results.id = "yards-search-results";
      results.className = "container";
      results.style.paddingTop = "20px";
      results.style.paddingBottom = "20px";
      results.style.display = "none";

      const searchPanel = $("#search-panel");

      if (searchPanel) {
        searchPanel.insertAdjacentElement("afterend", results);
      } else {
        const header = $(".site-header");

        if (header) {
          header.insertAdjacentElement("afterend", results);
        }
      }
    }

    return results;
  }

  function searchProducts(term) {
    state.searchTerm = term.trim().toLowerCase();

    const results = createSearchResults();

    if (!results) return;

    if (!state.searchTerm) {
      results.style.display = "none";
      results.innerHTML = "";
      return;
    }

    const matches = products.filter((product) => {
      const searchableText = [
        product.name,
        product.category,
        product.type,
        product.color,
        product.description
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(state.searchTerm);
    });

    results.style.display = "block";

    if (matches.length === 0) {
      results.innerHTML = `
        <p>No products found for "${escapeHTML(term)}". Try another search.</p>
      `;
      return;
    }

    results.innerHTML = `
      <p style="margin-bottom:15px;color:#777">
        ${matches.length} product${matches.length === 1 ? "" : "s"} found
      </p>

      <div class="product-grid">
        ${matches
          .map(
            (product) => `
              <article class="product-card">
                <div class="product-image-wrap">
                  <img
                    class="product-image"
                    src="${getImage(product)}"
                    alt="${escapeHTML(product.name)}"
                    loading="lazy"
                  >

                  <button
                    class="product-quick-add"
                    type="button"
                    data-action="quick-add"
                    data-id="${product.id}"
                    style="opacity:1;transform:none"
                  >
                    QUICK ADD · ${money(product.price)}
                  </button>
                </div>

                <div class="product-info">
                  <h3>
                    <button
                      type="button"
                      data-action="details"
                      data-id="${product.id}"
                      style="border:0;background:none;color:inherit;text-align:left"
                    >
                      ${escapeHTML(product.name)}
                    </button>
                  </h3>

                  <div class="product-meta">
                    <span>${escapeHTML(product.category)}</span>
                    <span class="product-price">${money(product.price)}</span>
                  </div>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    `;

    results.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function setupSearch() {
    const toggle = $(".search-toggle");
    const panel = $("#search-panel");
    const input = $("#search-input");
    const form = $("#search-form");

    toggle?.addEventListener("click", () => {
      panel?.classList.toggle("active");

      if (panel?.classList.contains("active")) {
        input?.focus();
      }
    });

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      searchProducts(input?.value || "");
    });

    input?.addEventListener("input", () => {
      if (!input.value.trim()) {
        searchProducts("");
      }
    });
  }

  /* ========================================
     MOBILE NAVIGATION
  ======================================== */

  function setupNavigation() {
    const menuButton = $(".menu-toggle");
    const navigation = $("#main-nav");

    menuButton?.addEventListener("click", () => {
      const isOpen = navigation?.classList.toggle("active");

      menuButton.setAttribute(
        "aria-expanded",
        String(Boolean(isOpen))
      );
    });

    $$("#main-nav a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation?.classList.remove("active");
        menuButton?.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ========================================
     NEWSLETTER DEMO
  ======================================== */

  function setupNewsletter() {
    const form = $("#newsletter-form");

    form?.addEventListener("submit", (event) => {
      event.preventDefault();

      const emailInput = $('input[type="email"]', form);

      if (!emailInput || !emailInput.checkValidity()) {
        emailInput?.reportValidity();
        return;
      }

      showToast("Thanks for your interest in YARDS!");

      form.reset();
    });
  }

  /* ========================================
     SCROLL REVEAL ANIMATIONS
  ======================================== */

  function setupRevealAnimations() {
    const sections = $$(".section, .category-card, .product-card");

    sections.forEach((element) => {
      element.classList.add("reveal");
    });

    if (!("IntersectionObserver" in window)) {
      sections.forEach((element) => {
        element.classList.add("visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08
      }
    );

    sections.forEach((element) => observer.observe(element));
  }

  /* ========================================
     GENERAL CLICK HANDLING
  ======================================== */

  document.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");

    if (actionButton) {
      const action = actionButton.dataset.action;
      const id = actionButton.dataset.id;

      switch (action) {
        case "quick-add":
        case "add-to-cart":
          addToCart(id);
          break;

        case "details":
          openProductDetails(id);
          break;

        case "remove":
          removeFromCart(id);
          break;

        case "close-cart":
        case "close-modal":
          closePanels();
          break;

        case "checkout":
          showToast(
            "Demo checkout only. Connect a payment provider before accepting orders."
          );
          break;
      }

      return;
    }

    if (event.target.closest(".cart-toggle")) {
      openCart();
      return;
    }

    if (event.target === $("#overlay")) {
      closePanels();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePanels();

      $("#main-nav")?.classList.remove("active");
      $(".menu-toggle")?.setAttribute("aria-expanded", "false");
    }
  });

  /* ========================================
     INITIALIZE WEBSITE
  ======================================== */

  function initializeYards() {
    renderAllProducts();
    renderCart();
    setupSearch();
    setupNavigation();
    setupNewsletter();

    // Run after products have been inserted into the page.
    requestAnimationFrame(setupRevealAnimations);

    console.log("YARDS website interactions initialized.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeYards);
  } else {
    initializeYards();
  }
})();
