// Slideshow Logic
let slideIndex = 0;
let autoSlideTimeout;

// Show the initial slides
showSlides();

// Function to display the slides
function showSlides() {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    // Reset all slides and remove active dots
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Increment the slide index and reset if necessary
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // Display the current slide and activate the corresponding dot
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    // Auto-advance slides every 3 seconds
    autoSlideTimeout = setTimeout(showSlides, 3000);
}

// Function to manually move to the previous or next slide
function plusSlides(n) {
    clearTimeout(autoSlideTimeout); // Stop the auto-slide
    slideIndex += n - 1; // Adjust index
    showSlides(); // Show the updated slide
}

// Function to move to a specific slide
function currentSlide(n) {
    clearTimeout(autoSlideTimeout); // Stop the auto-slide
    slideIndex = n - 1; // Adjust index
    showSlides(); // Show the specified slide
}
