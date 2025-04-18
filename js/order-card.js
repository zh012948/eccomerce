window.addEventListener("DOMContentLoaded", () => {
    // Get the product data from localStorage (the key is 'selectedProduct')
    const productData = localStorage.getItem("selectedProduct");

    if (productData) {
        // Parse the stringified JSON data
        const product = JSON.parse(productData);

        // If parsed data exists, update the product card with the product details
        if (product) {
            // Select elements from the DOM to update with product data
            const productImage = document.querySelector(".product-image img");
            const productName = document.querySelector(".product-name");
            const oldPrice = document.querySelector(".old-price");
            const newPrice = document.querySelector(".new-price");
            const productRating = document.querySelector(".rating");
            const productAvailability = document.querySelector(".badge");
            const orderButton = document.querySelector(".order-btn");  // The Order Now button

            // Set the values for the product card
            document.title = product.title;
            productImage.src = product.image;  // Set image source
            productName.textContent = product.title;  // Set product name
            oldPrice.textContent = `₨ ${product.originalPrice}`;  // Set original price
            newPrice.textContent = `₨ ${product.price}`;  // Set current price
            productRating.textContent = `⭐️ ${product.rating} reviews`;  // Set rating
            productAvailability.textContent = product.availability;  // Set availability

            // Optional: Add conditional classes or styling for availability, like "Sale" badge
            if (product.availability === "sale") {
                productAvailability.classList.add("sale");
            }

            // Disable the "Order Now" button if availability is not "sale"
            if (product.availability !== "sale") {
                orderButton.disabled = true;
                orderButton.style.backgroundColor = "#ccc";  // Optional: change button color to indicate it's disabled
                orderButton.style.cursor = "not-allowed";  // Change cursor to indicate the button is disabled
            }
        }
    } else {
        console.log("No product data found in localStorage.");
    }
});

