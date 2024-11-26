let map, marker;

// Simulated bus location data
const simulatedLocations = [
    { lat: -1.286389, lng: 36.817223 }, // Nairobi
    { lat: -1.320075, lng: 36.848459 }, // Westlands
    { lat: -1.303205, lng: 36.707307 }  // Mombasa Road
];

let locationIndex = 0;

// Initialize Google Map
function initMap() {
    const initialLocation = simulatedLocations[locationIndex];
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: initialLocation
    });

    marker = new google.maps.Marker({
        position: initialLocation,
        map: map,
        title: "Bus Location"
    });
}

// Update location on the map
function updateLocation() {
    locationIndex = (locationIndex + 1) % simulatedLocations.length;
    const newLocation = simulatedLocations[locationIndex];

    // Move the marker to the new location
    marker.setPosition(newLocation);
    map.panTo(newLocation);
}

// Load booking details
function loadBookingDetails() {
    const booking = JSON.parse(localStorage.getItem("currentBooking"));

    if (booking) {
        document.getElementById("bus-name").textContent = booking.busName || "N/A";
        document.getElementById("route").textContent = booking.route || "N/A";
        document.getElementById("departure-time").textContent = booking.departureTime || "N/A";
    } else {
        document.getElementById("booking-details").textContent =
            "No active booking available for tracking.";
    }
}

// Initialize map and load data on page load
document.addEventListener("DOMContentLoaded", () => {
    initMap();
    loadBookingDetails();

    // Refresh button event
    document.getElementById("refresh-location").addEventListener("click", updateLocation);
});

