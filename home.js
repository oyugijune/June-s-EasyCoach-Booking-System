// Global variables
let selectedBus = null;
let selectedSeats = [];
let busFare = 0;

// Sample bus data
const buses = [
    { id: 1, name: "EasyCoach Express", time: "9:00 AM", route: "Nairobi to Mombasa", fare: 1600 },
    { id: 2, name: "City Shuttle", time: "11:00 AM", route: "Kisumu to Nairobi", fare: 1600 },
    { id: 3, name: "Luxury Line", time: "2:00 PM", route: "Nairobi to Kisumu", fare: 1550 },
    { id: 4, name: "Express Connect", time: "5:00 PM", route: "Mombasa to Nairobi", fare: 1500 },
    { id: 5, name: "Luxury Line", time: "8:30 AM", route: "Nairobi to Awendo", fare: 1550 },
    { id: 6, name: "Express Connect", time: "8:30 AM", route: "Awendo to Nairobi", fare: 1550 },
];

// Function to search buses
function searchBuses() {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;

    if (!from || !to || from === to) {
        alert("Please select valid 'Departure' and 'Arrival' locations.");
        return;
    }

    const busList = document.getElementById("bus-list");
    const availableBusesSection = document.getElementById("available-buses");

    // Clear previous results
    busList.innerHTML = "";

    // Filter buses based on the selected route
    const filteredBuses = buses.filter((bus) =>
        bus.route.toLowerCase().includes(`${from.toLowerCase()} to ${to.toLowerCase()}`)
    );

    if (filteredBuses.length === 0) {
        busList.innerHTML = "<p>No buses available for the selected route.</p>";
    } else {
        // Render filtered buses
        filteredBuses.forEach((bus) => {
            const busItem = document.createElement("div");
            busItem.classList.add("bus-item");
            busItem.innerHTML = `
                <h3>${bus.name}</h3>
                <p>Route: ${bus.route}</p>
                <p>Departure Time: ${bus.time}</p>
                <p>Fare: KES ${bus.fare}</p>
                <button onclick="selectBus(${bus.id}, '${bus.name}', '${bus.time}', ${bus.fare})">Select</button>
            `;
            busList.appendChild(busItem);
        });
    }

    availableBusesSection.style.display = "block";
}

// Function to select a bus
function selectBus(busId, busName, busTime, fare) {
    selectedBus = { busId, busName, busTime, fare };
    busFare = fare; // Set the selected bus fare

    // Show seat selection section
    document.getElementById("available-buses").style.display = "none";
    document.getElementById("seat-selection").style.display = "block";

    // Generate seat map
    generateSeatMap();
}

// Function to generate the seat map dynamically
function generateSeatMap() {
    const seatMap = document.getElementById("seat-map");
    seatMap.innerHTML = ""; // Clear previous seat map

    const rows = 10; // Number of rows
    const columns = 4; // Number of columns (2 seats on each side of the aisle)
    const aislePosition = 2; // Position of the aisle in the middle
    let seatNumber = 1; // Start numbering seats from 1

    for (let row = 0; row < rows; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row"); // Add a class to group rows
        
        for (let col = 0; col < columns; col++) {
            const seat = document.createElement("div");
            seat.classList.add("seat");

            // Check if the column is the aisle position, and don't display a seat there
            if (col === aislePosition) {
                const aisle = document.createElement("div");
                aisle.classList.add("aisle");
                rowDiv.appendChild(aisle); // Add aisle between seats
            } else {
                seat.innerText = seatNumber++;
                seat.addEventListener("click", () => toggleSeatSelection(seat));
                rowDiv.appendChild(seat); // Add the seat to the row
            }
        }

        seatMap.appendChild(rowDiv); // Add the row to the seat map
    }
}

// Function to toggle seat selection
function toggleSeatSelection(seat) {
    if (!seat.classList.contains("unavailable")) {
        seat.classList.toggle("selected");
        updateSelectedSeats(); // Update the list of selected seats
    }
}

// Function to update selected seats
function updateSelectedSeats() {
    const selectedSeatsElements = document.querySelectorAll(".seat.selected");
    selectedSeats = Array.from(selectedSeatsElements).map((seat) => seat.innerText);
    document.getElementById("selected-seats").textContent =
        `Selected Seats: ${selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}`;
    calculateTotal(); // Recalculate total cost
}

// Function to calculate total cost
function calculateTotal() {
    const totalCost = selectedSeats.length * busFare;
    localStorage.setItem("totalCost", totalCost);
    document.getElementById("total-cost").textContent = `KES ${totalCost}`;
}

// Function to save booking data to localStorage
function saveToLocalStorage() {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
     // Ensure booking date is selected
     const bookingDate = document.getElementById("date").value;
     if (!bookingDate) {
         alert("Please select a travel date.");
         return;
     }

    if (!selectedBus || selectedSeats.length === 0) {
        alert("Please select a bus and at least one seat before proceeding.");
        return;
    }

    // Prepare booking data
    const bookingData = {
        from: from,
        to: to,
        bookingDate: bookingDate,
        busDetails: selectedBus, // Include selected bus details
        seatNumbers: selectedSeats,
        totalAmount: localStorage.getItem("totalCost"),
    };
    console.log("Booking data to save:", bookingData);

    // Save to localStorage
    localStorage.setItem("bookingDetails", JSON.stringify(bookingData));
    
    alert("Booking saved successfully!");

}

function addSnacks() {
    // This function will redirect the user to the snacks page where they can add snacks to their booking
    window.location.href = 'snacks.html';
}

// Date validation
const bookingDateInput = document.getElementById("date");
bookingDateInput.addEventListener("change", () => {
    const selectedDate = new Date(bookingDateInput.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (selectedDate < currentDate) {
        alert("Please select a valid future date.");
        bookingDateInput.value = "";
    }
});

// Set minimum date for the date input
const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0];
bookingDateInput.setAttribute('min', formattedDate);

// Prevent same departure and arrival
const departureInput = document.getElementById("from");
const arrivalInput = document.getElementById("to");
arrivalInput.addEventListener("change", () => {
    if (departureInput.value === arrivalInput.value) {
        alert("Departure and arrival cities cannot be the same.");
        arrivalInput.value = "";
    }
});
