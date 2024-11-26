document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Simulate sending message
    alert(`Message sent successfully!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);

    // Clear form fields
    document.getElementById("contactForm").reset();
});

