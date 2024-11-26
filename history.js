// Retrieve and display transaction history
const historyContainer = document.getElementById("history-container");
const transactionHistory = JSON.parse(localStorage.getItem("transactionHistory")) || [];

if (transactionHistory.length > 0) {
    transactionHistory.forEach((transaction, index) => {
        const historyItem = document.createElement("div");
        historyItem.classList.add("history-item");

        historyItem.innerHTML = `
            <h2>Booking ${index + 1}</h2>
            <p><strong>From:</strong> ${transaction.from}</p>
            <p><strong>To:</strong> ${transaction.to}</p>
            <p><strong>Departure:</strong> ${transaction.date}</p>
            <p><strong>Seats:</strong> ${transaction.seats}</p>
            <p><strong>Total (KES):</strong> ${transaction.totalAmountKES}</p>
            <p><strong>Total (USD):</strong> ${transaction.totalAmountUSD}</p>
            <p><strong>Payment Date:</strong> ${transaction.paymentDate}</p>
            <button onclick="downloadReceipt(${index})">Download Receipt</button>
        `;

        historyContainer.appendChild(historyItem);
    });
} else {
    historyContainer.innerHTML = "<p>No bookings found.</p>";
}

// Download receipt as a file
function downloadReceipt(index) {
    const transaction = transactionHistory[index];
    const receipt = `
        Booking Receipt
        =====================
        From: ${transaction.from}
        To: ${transaction.to}
        Departure: ${transaction.date}
        Seats: ${transaction.seats}
        Total (KES): ${transaction.totalAmountKES}
        Total (USD): ${transaction.totalAmountUSD}
        Payment Date: ${transaction.paymentDate}
        Snacks & Meals: ${transaction.cartItems.map(item => `${item.name} (x${item.quantity})`).join(", ")}
    `;

    const blob = new Blob([receipt], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `BookingReceipt_${index + 1}.txt`;
    link.click();
}
