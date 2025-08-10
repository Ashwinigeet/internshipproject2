
const products = [
    {
        id: 1,
        name: "OLEVS Mens Watches",
        description: "Stylish Quartz Analog Business Watch",
        price: "$150",
        image: "img/product1.jpg"
    },
    {
        id: 2,
        name: "Bluetooth Smartwatch",
        description: "Daily Activity Tracker, Heart Rate Sensor",
        price: "$90",
        image: "img/product2.jpg"
    },
    {
        id: 3,
        name: "Carlington Elite Ladies Watch",
        description: "Water Resistant Analog Watch",
        price: "$130",
        image: "img/product3.jpg"
    },
    {
        id: 4,
        name: "Smart Fitness Band",
        description: "Fitness Tracker with Heart Rate Monitor",
        price: "$50",
        image: "img/product4.jpg"
    },
    {
        id: 5,
        name: "Men's Casual Shoes",
        description: "Stylish and Comfortable",
        price: "$70",
        image: "img/product5.jpg"
    },
    {
        id: 6,
        name: "Women’s Handbag",
        description: "Fashionable Leather Handbag",
        price: "$120",
        image: "img/product6.jpg"
    }
];


let cart = JSON.parse(localStorage.getItem('cart')) || [];
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productHTML = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-price">${product.price}</p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Buy Now</button>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productHTML;
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart)); 
    alert(`${product.name} has been added to your cart.`);
    document.getElementById('cart-count').textContent = `(${cart.length})`;
    updateCartTotal(); 
}
function updateCartTotal() {
    const cartTotal = document.getElementById('cart-total');
    let total = 0;
    cart.forEach(item => {
        total += parseFloat(item.price.substring(1)); 
    });
    cartTotal.textContent = `$${total.toFixed(2)}`;
}
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; 

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        updateCartTotal();
    } else {
        cart.forEach((item, index) => {
            const itemHTML = `
                <div class="col-md-12 mb-4">
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-3">
                        <div class="d-flex align-items-center">
                            <img src="${item.image}" class="img-fluid" alt="${item.name}">
                            <div class="ms-3">
                                <h5>${item.name}</h5>
                                <p class="text-muted">${item.description}</p>
                                <p>${item.price}</p>
                            </div>
                        </div>
                        <button class="btn btn-danger " onclick="removeFromCart(${index})">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.innerHTML += itemHTML;
        });
        updateCartTotal(); 
    }
}

function removeFromCart(index) {
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart)); 
    displayCartItems(); 
    document.getElementById('cart-count').textContent = `(${cart.length})`;

    
    if (cart.length === 0) {
        document.getElementById('cart-total').textContent = `0.00`; 
    } else {
        updateCartTotal(); 
    }
}


window.onload = function() {
    if (document.getElementById('product-list')) {
        displayProducts();
    }

    if (document.getElementById('cart-items')) {
        displayCartItems();
    }

    document.getElementById('cart-count').textContent = `(${cart.length})`;
};
