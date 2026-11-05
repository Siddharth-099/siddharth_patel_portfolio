const menuToggle = document.querySelector(".menu-toggle");
const navContent = document.querySelector(".nav-content");
const navLinks = document.querySelectorAll(".nav-links a");
const themeToggle = document.querySelector(".theme-toggle");

// MOBILE MENU
menuToggle?.addEventListener("click", () => {
    const isOpen = navContent.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

// NAVIGATION LINKS
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navContent.classList.remove("open");

        menuToggle?.setAttribute("aria-expanded", "false");

        if (menuToggle) {
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });
});

// DARK / LIGHT MODE
themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    const isLight = document.body.classList.contains("light-mode");

    themeToggle.innerHTML = isLight
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

    localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
});

// LOAD SAVED THEME
if (localStorage.getItem("portfolio-theme") === "light") {
    document.body.classList.add("light-mode");

    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}

// ACTIVE NAVIGATION ON SCROLL
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${entry.target.id}`
                );
            });
        }
    });
}, {
    rootMargin: "-35% 0px -55% 0px"
});

sections.forEach((section) => observer.observe(section));


// ===================================
// EMAILJS CONTACT FORM
// ===================================

// Initialize EmailJS
emailjs.init({
    publicKey: "xxcyFFR6INbdKjE_o"
});

const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");

contactForm?.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = "Please fill in all fields.";
        return;
    }

    // Disable button while sending
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    formStatus.textContent = "";

    try {

        const response = await emailjs.sendForm(
            "service_jinl4y8",
            "template_xorl8qp",
            contactForm
        );

        console.log("Email sent successfully:", response);

        formStatus.textContent = "Message sent successfully! Thank you for contacting me.";

        contactForm.reset();

    } catch (error) {

        console.error("EmailJS Error:", error);

        formStatus.textContent = "Message could not be sent. Please try again.";

    } finally {

        submitBtn.disabled = false;

        submitBtn.innerHTML =
            'Send Message <i class="fa-solid fa-paper-plane"></i>';

    }

});