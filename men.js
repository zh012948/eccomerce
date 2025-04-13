let allProducts = [];
let currentPage = 1;
const productsPerPage = 9;

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const priceFilter = document.getElementById("priceFilter");
const categoryFilter = document.getElementById("categoryFilter");
const paginationControls = document.getElementById("paginationControls");

// Fetch product data
fetch("men.json")
    .then(res => res.json())
    .then(data => {
        allProducts = data;
        renderPage();
    })
    .catch(err => console.error("Error loading products:", err));

// Renders the page with filtered & paginated products
function renderPage() {
    let filteredProducts = applyFilters(allProducts);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Make sure currentPage is within valid bounds
    if (currentPage > totalPages) currentPage = 1;

    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsToShow = filteredProducts.slice(start, end);

    renderProducts(productsToShow);
    renderPagination(totalPages);
}

// Applies filters and sorting
function applyFilters(products) {
    let result = [...products];
    const searchValue = searchInput.value.toLowerCase();
    const priceValue = priceFilter.value;
    const categoryValue = categoryFilter.value.toLowerCase();

    if (searchValue) {
        result = result.filter(product =>
            product.title.toLowerCase().includes(searchValue)
        );
    }

    if (categoryValue) {
        result = result.filter(product =>
            product.category.toLowerCase() === categoryValue
        );
    }

    if (priceValue === "low-to-high") {
        result.sort((a, b) => a.price - b.price);
    } else if (priceValue === "high-to-low") {
        result.sort((a, b) => b.price - a.price);
    }

    return result;
}

// Renders products into the container
function renderProducts(products) {
    productContainer.innerHTML = "";

    if (products.length === 0) {
        productContainer.innerHTML = "<p>No products found.</p>";
        return;
    }

    products.forEach(product => {
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

        productContainer.appendChild(card);
    });
}

// Renders pagination buttons
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

// Event Listeners (with currentPage reset fix)
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
