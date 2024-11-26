const searchInput = document.getElementById("faqSearch");
const faqItems = document.querySelectorAll(".faq-item");

searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    faqItems.forEach((item) => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(query) ? "block" : "none";
    });
});

