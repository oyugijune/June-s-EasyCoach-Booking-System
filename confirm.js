document.addEventListener("DOMContentLoaded", () => {
    // Retrieve data from localStorage
    const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Populate booking details
    if (bookingDetails) {
        document.getElementById("from").textContent = bookingDetails.from;
        document.getElementById("to").textContent = bookingDetails.to;
        document.getElementById("confirm-date").textContent = bookingDetails.date;
        document.getElementById("seats").textContent = bookingDetails.seats.join(", ");
    }

    // Populate cart details and calculate total
    const cartDetails = document.getElementById("cart-details");
    let totalAmount = 0;

    if (cart.length > 0) {
        cartDetails.innerHTML = "<h2>Snacks & Meals</h2>";
        cart.forEach(item => {
            totalAmount += item.price * item.quantity;
            const itemElement = document.createElement("p");
            itemElement.textContent = `${item.name} (x${item.quantity}) - ${item.price * item.quantity} KES`;
            cartDetails.appendChild(itemElement);
        });
    } else {
        cartDetails.innerHTML = "<p>No snacks or meals selected.</p>";
    }

    // Display total amount
    const ticketPrice = bookingDetails?.ticketPrice || 0;
    totalAmount += ticketPrice;
    document.getElementById("total-amount").textContent = `KES ${totalAmount}`;
    document.getElementById("total-amount-usd").textContent = `USD ${(totalAmount / 140).toFixed(2)}`; // Assume 1 USD = 140 KES

    // Save totalAmount for payment processing
    localStorage.setItem("totalAmount", totalAmount);
});
function payment() {
    const paymentStatus = document.getElementById("payment-status");
    const phoneNumber = document.getElementById("phone-number").value;

    if (!phoneNumber || phoneNumber.length < 10) {
        paymentStatus.textContent = "Please enter a valid phone number.";
        paymentStatus.style.color = "red";
        return;
    }

    // Simulate Mobile Money Payment
    paymentStatus.textContent = "Processing payment...";
    setTimeout(() => {
        paymentStatus.textContent = "Payment successful!";
        paymentStatus.style.color = "green";

        // Save booking details to history and navigate to history.html
        saveBookingToHistory();
        window.location.href = "history.html";
    }, 6000);
}

// Save booking history to localStorage
function saveBookingToHistory() {
    const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalAmount = localStorage.getItem("totalAmount");

    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.push({
        ...bookingDetails,
        snacks: cart,
        total: totalAmount,
        date: new Date().toISOString(),
    });

    localStorage.setItem("history", JSON.stringify(history));
}
//paypal
document.getElementById("pay-paypal").addEventListener("click", () => {
    alert("Redirecting to PayPal...");
    saveBookingToHistory();
    window.location.href = "history.html"; // Replace with PayPal redirect in production
});

//card
document.getElementById("pay-card").addEventListener("click", () => {
    const cardName = document.getElementById("card-name").value;
    const cardNumber = document.getElementById("card-number").value;
    const cardExpiry = document.getElementById("card-expiry").value;
    const cardCVV = document.getElementById("card-cvv").value;

    if (!cardName || !cardNumber || !cardExpiry || !cardCVV) {
        alert("Please fill in all card details.");
        return;
    }

    alert("Processing card payment...");
    saveBookingToHistory();
    window.location.href = "history.html"; // Replace with card processing in production
});
