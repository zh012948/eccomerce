let allProducts = [];
let currentPage = 1;
const productsPerPage = 9;

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const priceFilter = document.getElementById("priceFilter");
const categoryFilter = document.getElementById("categoryFilter");
const collectionFilter = document.getElementById("collectionFilter");
const paginationControls = document.getElementById("paginationControls");
const countdownContainer = document.getElementById("countdownContainer");
const countdownDisplay = document.getElementById("countdown");

fetch("shop.json")
    .then((res) => res.json())
    .then((data) => {
        allProducts = data;
        renderPage();
    })
    .catch((err) => console.error("Error loading products:", err));

function renderPage() {
    let filteredProducts = applyFilters(allProducts);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (currentPage > totalPages) currentPage = 1;

    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsToShow = filteredProducts.slice(start, end);

    renderProducts(productsToShow);
    renderPagination(totalPages);
}

function applyFilters(products) {
    let result = [...products];
    const searchValue = searchInput.value.toLowerCase();
    const priceValue = priceFilter.value;
    const categoryValue = categoryFilter.value.toLowerCase();
    const collectionValue = collectionFilter.value.toLowerCase();

    if (searchValue) {
        result = result.filter((product) =>
            product.title.toLowerCase().includes(searchValue)
        );
    }

    if (categoryValue) {
        result = result.filter(
            (product) => product.category.toLowerCase() === categoryValue
        );
    }

    if (collectionValue) {
        result = result.filter(
            (product) => product.collection?.toLowerCase() === collectionValue
        );
    }

    if (priceValue === "low-to-high") {
        result.sort((a, b) => a.price - b.price);
    } else if (priceValue === "high-to-low") {
        result.sort((a, b) => b.price - a.price);
    }

    return result;
}

function renderProducts(products) {
    productContainer.innerHTML = "";

    const selectedCollection = collectionFilter.value.toLowerCase();

    if (products.length === 0) {
        if (selectedCollection === "women") {
            productContainer.innerHTML = "";
            countdownContainer.style.display = "block";
            startCountdown("2025-04-20T00:00:00");
        } else {
            productContainer.innerHTML = "<p>No products found.</p>";
            countdownContainer.style.display = "none";
        }
        return;
    }

    countdownContainer.style.display = "none";

    products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        const label =
            product.availability === "sale"
                ? "Sale"
                : product.availability.toLowerCase() === "available"
                    ? "Sale"
                    : "Sold Out";

        card.innerHTML = `
      <div class="img-wrapper">
        <img src="${product.image}" alt="${product.title}" />
      </div>
      <p class="availability">${label}</p>
      <p class="product-name">${product.title}</p>
      <p class="cross-price">Rs. ${product.originalPrice} PKR</p>
      <p class="original-price">Rs. ${product.price} PKR</p>
      <button class="order-now">Order Now</button>
    `;

        // Add event listener to "Order Now" button
        const orderButton = card.querySelector(".order-now");
        orderButton.addEventListener("click", () => {
            // Clear previous localStorage data
            localStorage.clear();

            // Store the product details in localStorage
            const productData = {
                title: product.title,
                price: product.price,
                originalPrice: product.originalPrice,
                rating: product.rating,
                availability: product.availability,
                image: product.image,
            };

            localStorage.setItem("selectedProduct", JSON.stringify(productData));

            // Redirect to order-card.html
            window.location.href = "order-card.html";
        });

        productContainer.appendChild(card);
    });
}

function renderPagination(totalPages) {
    paginationControls.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.classList.add("active");
        }
        pageButton.addEventListener("click", () => {
            currentPage = i;
            renderPage();
        });
        paginationControls.appendChild(pageButton);
    }
}

// Countdown Logic
function startCountdown(targetDateStr) {
    const targetDate = new Date(targetDateStr).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            countdownDisplay.innerHTML = "Women collection is now available!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownDisplay.innerHTML = `
      <div class="count-box"><span>${days}</span> Days</div>
      <div class="count-box"><span>${hours}</span> Hours</div>
      <div class="count-box"><span>${minutes}</span> Minutes</div>
      <div class="count-box"><span>${seconds}</span> Seconds</div>
    `;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Event listeners
searchInput.addEventListener("input", () => {
    currentPage = 1;
    renderPage();
});
priceFilter.addEventListener("change", () => {
    currentPage = 1;
    renderPage();
});
categoryFilter.addEventListener("change", () => {
    currentPage = 1;
    renderPage();
});
collectionFilter.addEventListener("change", () => {
    currentPage = 1;
    renderPage();
});
