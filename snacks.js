// Snacks and Meals Data
document.addEventListener("DOMContentLoaded", () => {
    const snacks = [
        { id: 1, name: "Chips", price: 100, image: "chips.png" },
        { id: 2, name: "Cookies", price: 50, image: "cookies.png" },
        { id: 3, name: "Soda", price: 80, image: "soda.png" },
        { id: 4, name: "Yoghurt", price: 100, image: "ghurt.png" },
        { id: 5, name: "ProBiotic", price: 150, image: "yoghurt.png" },
    ];
    
    const meals = [
        { id: 6, name: "Burger", price: 300, image: "bugger.png" },
        { id: 7, name: "Pizza", price: 500, image: "pizza.png" },
        { id: 8, name: "Ugali wetfry", price: 400, image: "ugali.png" },
        { id: 9, name: "Chicken wetfry", price: 500, image: "chicken.png" },
    ];

    const snacksList = document.getElementById("snacks-list");
    const mealsList = document.getElementById("meals-list");

    snacks.forEach(snack => {
        const item = document.createElement('div');
        item.classList.add('menu-item');
        item.innerHTML = `
        <img src="${snack.image}" alt="${snack.name}">
        <h3>${snack.name}</h3>
        <p>Price: ${snack.price} KES</p>
        <button onclick="addToCart(${snack.id}, '${snack.name}', ${snack.price})">Add to Cart</button>
    `;
    snacksList.appendChild(item);
    });

    meals.forEach(meal => {
        const item = document.createElement('div');
        item.classList.add('menu-item');
        item.innerHTML = `
        <img src="${meal.image}" alt="${meal.name}">
        <h3>${meal.name}</h3>
        <p>Price: ${meal.price} KES</p>
        <button onclick="addToCart(${meal.id}, '${meal.name}', ${meal.price})">Add to Cart</button>
    `;
    mealsList.appendChild(item);
    });

    // Load cart from localStorage if available
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cart = savedCart;
        updateCartDisplay();
}
});

// Cart functionality
let cart = [];

function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCartDisplay();
}

// Update Cart
function updateCartDisplay() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>No items in your cart yet.</p>";
        document.getElementById('checkout-button').disabled = true;
        return;
    } else {
        document.getElementById('checkout-button').disabled = false;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
        <p>${item.name} (x${item.quantity}) - ${item.price * item.quantity} KES</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
     `;
        cartItems.appendChild(cartItem);
    });

    const totalElement = document.createElement('p');
    totalElement.innerHTML = `<strong>Total: ${total} KES</strong>`;
    cartItems.appendChild(totalElement);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDisplay();
}

document.getElementById('checkout-button').addEventListener('click', () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = "confirmation.html";
});
