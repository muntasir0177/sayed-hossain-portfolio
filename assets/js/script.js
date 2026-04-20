const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const [ham1, ham2, ham3] = [
    document.getElementById("ham1"),
    document.getElementById("ham2"),
    document.getElementById("ham3"),
];

hamburger.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.contains("hidden");

    if (!isHidden) {
        mobileMenu.classList.add("hidden");
        ham1.style.transform = "";
        ham2.style.opacity = "1";
        ham3.style.transform = "";
        ham3.style.width = "1rem";
    } else {
        mobileMenu.classList.remove("hidden");
        ham1.style.transform = "translateY(7px) rotate(45deg)";
        ham2.style.opacity = "0";
        ham3.style.transform = "translateY(-7px) rotate(-45deg)";
        ham3.style.width = "1.5rem";
    }
});

// Video
function playVideo() {
    const container = document.getElementById("video-container");
    const videoId = "-EE0W5Lg738"; // Your YouTube ID

    // Replace the inner content with the iframe
    container.innerHTML = `
            <div class="aspect-[820/529] w-full">
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0" 
                    class="w-full h-full "
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        `;
}

// counter animation
const counters = document.querySelectorAll(".counter");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const updateCount = (counter) => {
                    const target = +counter.getAttribute("data-target");
                    const count = +counter.innerText;
                    const increment = target / 100;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(() => updateCount(counter), 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 },
);

counters.forEach((counter) => observer.observe(counter));

// Services accordion
document.querySelectorAll(".accordion-item").forEach((item) => {
    item.addEventListener("click", () => {
        const content = item.querySelector(".accordion-content");
        const isOpen = !content.classList.contains("max-h-0");

        // 1. Close all items
        document.querySelectorAll(".accordion-content").forEach((el) => {
            el.style.maxHeight = "0px";
            el.classList.add("max-h-0");
        });

        // 2. If the clicked item was closed, open it
        if (!isOpen) {
            content.classList.remove("max-h-0");
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

// Set the first item height on load
window.addEventListener("load", () => {
    const firstContent = document.querySelector(
        ".accordion-item .accordion-content",
    );
    firstContent.style.maxHeight = firstContent.scrollHeight + "px";
    firstContent.classList.remove("max-h-0");
});
