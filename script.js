// I am adding comments in each section to explain it's working as mentioned in class
// here i am select main elements from the DOM
const mainBody = document.querySelector("body");
const overlay = document.querySelector(".overdisplay");
const closeNavButton = document.querySelector(".navClose-btn");
const hamburgerMenu = document.querySelector(".menuBar");
const navItems = document.querySelector(".navbarItems");
const navigationBar = document.querySelector(".navbar");
const navItemList = document.querySelectorAll(".navbarItems-item");
const productImagesContainer = document.querySelectorAll(".product-image-lists");
const mainProductGallery = document.querySelector(".product-gallery");

const productImageElements = document.querySelectorAll(".products");


// Add to Cart Button elements
const addToCartButton = document.querySelector(".add-to-cart-btn");
const cartIcon = document.querySelector(".cart-img");
const cartDetails = document.querySelector(".cart-info");
const cartDetailsDescription = document.querySelector(".cart-info-description");

//Selecting Product quantity management
const decreaseQuantityButton = document.querySelector(".productdecrease-btn");
const increaseQuantityButton = document.querySelector(".productincrease-btn");
const quantityDisplay = document.querySelector(".productnumber");
const totalPriceDisplay = document.querySelector(".productfinal-price");

// Selecting Lightbox Gallery Elements
const lightboxGallery = document.querySelector(".lightbox-gallery");
const lightboxWrapper = document.querySelector(".light-box-wrapper");
const lightboxImageList = document.querySelector(".lightbox-gallery__image-lists");
const lightboxImages = document.querySelectorAll(".lightbox-gallery__product");
const closeLightboxButton = document.querySelector(".close-light-box-btn");
const thumbnailImageContainers = document.querySelectorAll(".small-image-section");
const navigationButtons = document.querySelectorAll(".btn-container");

// At last Delete Button
const removeItemButton = document.querySelector(".delete-icon");

// Navbar adding and removing
closeNavButton.addEventListener("click", function () {
  navItems.classList.add("collapseMenu");
});

hamburgerMenu.addEventListener("click", function () {
  navItems.classList.remove("collapseMenu");
});

// Navigate to the specified product image
const navigateToPage = function (currentIndex) {
  productImageElements.forEach((productImage, index) => {
    productImage.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
  });

  lightboxImages.forEach((lightboxImage, index) => {
    lightboxImage.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
  });
};

// Move to the next product image
const goToNextImage = function () {
  currentImageIndex = (currentImageIndex === totalImages - 1) ? 0 : currentImageIndex + 1;
  navigateToPage(currentImageIndex);
  highlightActiveThumbnail(currentImageIndex);
};

// Move to the previous product image
const goToPreviousImage = function () {
  currentImageIndex = (currentImageIndex === 0) ? totalImages - 1 : currentImageIndex - 1;
  navigateToPage(currentImageIndex);
  highlightActiveThumbnail(currentImageIndex);
};

// Managing product images display
let currentImageIndex = 0;
const totalImages = productImageElements.length;

// Create thumbnail images for the product gallery
const generateThumbnailImages = function () {
  productImageElements.forEach((_, index) => {
    const thumbnailMarkup = `
      <li class="thumbnail-image" data-image="${index}">
        <img src="./images/image-product-${index + 1}-thumbnail.jpg" alt="product-${index + 1} thumbnail image"/>
      </li>`;

    thumbnailImageContainers.forEach((container) => {
      container.insertAdjacentHTML("beforeend", thumbnailMarkup);
    });
  });
};

// Highlight the active thumbnail image
const highlightActiveThumbnail = function (currentIndex) {
  document.querySelectorAll(".thumbnail-image").forEach((img) => {
    img.classList.remove("thumbnail-image--active");
  });

  document.querySelectorAll(`.thumbnail-image[data-image="${currentIndex}"]`).forEach((img) => {
    img.classList.add("thumbnail-image--active");
  });
};


// Initialize thumbnail images and activate the first one
generateThumbnailImages();
highlightActiveThumbnail(0);
navigateToPage(currentImageIndex);

// Change product images based on button clicks
const handleImageChange = function (event) {
  const nextButton = event.target.closest(".btn-next");
  const previousButton = event.target.closest(".btn-previous");

  if (nextButton) goToNextImage();
  if (previousButton) goToPreviousImage();
};

productImagesContainer.forEach((container) => {
  container.addEventListener("click", handleImageChange);
});

lightboxWrapper.addEventListener("click", handleImageChange);

// Change product images when thumbnail is clicked
thumbnailImageContainers.forEach((container) => {
  container.addEventListener("click", function (event) {
    const thumbnail = event.target.closest(".thumbnail-image");
    if (!thumbnail) return;

    const selectedImageIndex = +thumbnail.dataset.image;
    currentImageIndex = selectedImageIndex;

    navigateToPage(currentImageIndex);
    highlightActiveThumbnail(currentImageIndex);
  });
});

// Manage product quantity in the cart
let productCount = +quantityDisplay.textContent;

decreaseQuantityButton.addEventListener("click", function () {
  if (productCount > 0) {
    productCount--;
    quantityDisplay.textContent = productCount;
  }
});

increaseQuantityButton.addEventListener("click", function () {
  productCount++;
  quantityDisplay.textContent = productCount;
});

// Toggle cart display on icon click
cartIcon.addEventListener("click", function () {
  cartDetails.classList.remove("hidden");
  cartDetails.classList.add("click");
});

cartIcon.addEventListener("mouseover", function () {
  cartDetails.classList.remove("hidden");
});

cartIcon.addEventListener("mouseout", function () {
  if (!cartDetails.classList.contains("click")) cartDetails.classList.add("hidden");
});

mainBody.addEventListener("click", function (event) {
  const cartButton = event.target.closest(".cart-img");
  const insideCartInfo = event.target.closest(".cart-info");

  if (cartButton === cartIcon || insideCartInfo) return;

  if (!cartDetails.classList.contains("hidden")) {
    cartDetails.classList.add("hidden");
    cartDetails.classList.remove("click");
  }
});

// Add product to cart functionality
const cartItemCount = document.querySelector(".product-num");
const productPriceValue = +totalPriceDisplay.textContent.slice(1);

addToCartButton.addEventListener("click", function () {
  if (productCount === 0) return;

  cartItemCount.classList.remove("hidden");
  cartItemCount.textContent = productCount;

  const cartMarkup = `
    <img src="./images/image-product-1-thumbnail.jpg" alt="thumbnail image for product" class="cart-product-image"/>
    <div class="cart-product-name-container">
      <p class="cart-product-name">Fall Limited Edition Sneakers</p>
      <div class="cart-product-quantity-container">
        <p class="cart-product-price">${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(productPriceValue)}</p>
        <p>x</p>
        <p class="cart-product-quantity">${productCount}</p>
        <p class="cart-product-final-price">${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(productPriceValue * productCount)}</p>
      </div>
    </div>
    <img src="./images/icon-delete.svg" alt="delete icon" class="delete-icon sizeIncOnHover"/>
    <button class="btn checkout-btn">
      <p class="add-to-cart-text">Checkout</p>
    </button>`;

  cartDetailsDescription.innerHTML = "";
  cartDetailsDescription.insertAdjacentHTML("afterbegin", cartMarkup);
});

// Empty the cart functionality
document.addEventListener("click", function (event) {
  const deleteButton = event.target.closest(".delete-icon");
  if (!deleteButton) return;
  // Reset product count
  productCount = 0;
  cartItemCount.textContent = productCount;
  quantityDisplay.textContent = productCount;
  cartItemCount.classList.add("hidden");

  cartDetailsDescription.innerHTML = "";
  const emptyCartMarkup = `<p class="empty-cart-image">Your cart is empty</p>`;
  cartDetailsDescription.insertAdjacentHTML("afterbegin", emptyCartMarkup);
});

// Add event listeners for window load and resize
const addEventListenerToWindow = function (eventName, callback) {
  window.addEventListener(eventName, callback);
};

const lightboxButtons = lightboxWrapper.querySelectorAll(".btn-container");

// Open the lightbox gallery
const openLightbox = function (event) {
  const selectedGallery = event.target.closest(".product-image-lists");
  if (!selectedGallery) return;

  overlay.classList.remove("hidden");
  lightboxButtons.forEach((arrowButton) => {
    arrowButton.classList.remove("hidden");
  });
};

// Close the lightbox gallery
overlay.addEventListener("click", function (event) {
  if (event.target !== overlay) return;
  overlay.classList.add("hidden");
});

closeLightboxButton.addEventListener("click", function () {
  overlay.classList.add("hidden");
});

// Change CSS styles based on window size
const adjustStyles = function () {
  const viewportWidth = window.innerWidth;

  // When the viewport width is above 1000
  if (viewportWidth >= 1000) {
    thumbnailImageContainers.forEach((container) => {
      container.classList.remove("hidden");
    });

    navigationButtons.forEach((button) => {
      button.classList.add("hidden");
    });
    navItems.classList.remove("collapseMenu");
    lightboxButtons.forEach((arrowButton) => {
      arrowButton.classList.remove("hidden");
      arrowButton.style.top = `calc(${lightboxImageList.offsetHeight / 2}px)`;
    });

    mainProductGallery.addEventListener("click", openLightbox);
    mainProductGallery.addEventListener("click", function () {
      lightboxButtons.forEach((arrowButton) => {
        arrowButton.style.top = `calc(${lightboxImageList.offsetHeight / 2}px)`;
      });
    });
  }


  // When the viewport width is below 1000
  if (viewportWidth < 1000) {
    
    overlay.classList.add("hidden");
    mainProductGallery.removeEventListener("click", openLightbox);
    navItems.classList.add("collapseMenu");
    thumbnailImageContainers.forEach((container) => {
      container.classList.add("hidden");
    });

    navigationButtons.forEach((button) => {
      button.classList.remove("hidden");
    });
  }
};

addEventListenerToWindow("load", adjustStyles);
addEventListenerToWindow("resize", adjustStyles);
