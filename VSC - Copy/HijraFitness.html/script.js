/* --------------------------------------------------
   Smooth Scroll with Navbar Offset
-------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (!target) return;

        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({ top, behavior: "smooth" });
    });
});


/* --------------------------------------------------
   Fade-In Animations
-------------------------------------------------- */
const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-in, .fade-left, .fade-right")
    .forEach(el => fadeObserver.observe(el));


/* --------------------------------------------------
   Stagger Animations
-------------------------------------------------- */
const staggerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll(".stagger-child");
            children.forEach((child, i) => {
                child.style.transitionDelay = `${i * 0.15}s`;
                child.classList.add("visible");
            });
            staggerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".stagger").forEach(el => staggerObserver.observe(el));


/* --------------------------------------------------
   Navbar Hide on Scroll
-------------------------------------------------- */
let lastScroll = 0;
const scrollThreshold = 40;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (Math.abs(currentScroll - lastScroll) < scrollThreshold) return;

    const navbar = document.querySelector(".navbar");
    if (currentScroll > lastScroll) {
        navbar.classList.add("hide");
    } else {
        navbar.classList.remove("hide");
    }

    lastScroll = currentScroll;
});


/* --------------------------------------------------
   Parallax Hero (Softened)
-------------------------------------------------- */
window.addEventListener("scroll", () => {
    const hero = document.querySelector("#hero");
    if (!hero) return;

    const offset = Math.min(window.pageYOffset * 0.08, 40);
    hero.style.backgroundPositionY = `${offset}px`;
});


/* --------------------------------------------------
   Magnetic Buttons
-------------------------------------------------- */
document.querySelectorAll(".cta-btn, .small-btn").forEach(btn => {
    btn.addEventListener("mousemove", e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0, 0)";
    });
});


/* --------------------------------------------------
   Scroll Progress Bar
-------------------------------------------------- */
const progressBar = document.createElement("div");
progressBar.id = "scroll-progress";
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
});


/* --------------------------------------------------
   Mobile Menu Toggle
-------------------------------------------------- */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
}


/* --------------------------------------------------
   Force Hero Fade + Stagger on Page Load
-------------------------------------------------- */
window.addEventListener("load", () => {
    const hero = document.querySelector("#hero");
    if (hero) {
        hero.classList.add("hero-visible");
    }

    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
        heroContent.classList.add("visible");
    }
});


