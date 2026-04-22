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

document.addEventListener("DOMContentLoaded", function () {
    new Splide("#feedback-carousel", {
        type: "loop",
        drag: "free",
        focus: "center",
        perPage: 4, // Adjust based on screen size
        gap: "60px",
        // autoplay: true,
        interval: 1000,
        pauseOnHover: false,
        arrows: false,
        pagination: true,
        autoScroll: {
            speed: 1,
        },
        breakpoints: {
            768: { perPage: 1 },
        },
    }).mount(window.splide.Extensions);
});

document.addEventListener("DOMContentLoaded", function () {
    new Splide("#feedback-carousel2", {
        type: "loop",
        drag: "free",
        focus: "center",
        perPage: 4, // Adjust based on screen size
        gap: "60px",
        // autoplay: true,
        interval: 1000,
        pauseOnHover: false,
        arrows: false,
        pagination: true,
        autoScroll: {
            speed: -1,
        },
        breakpoints: {
            768: { perPage: 1 },
        },
    }).mount(window.splide.Extensions);
});

// Filter projects
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectItems = document.querySelectorAll(".project-item");

    filterButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            // Remove active style from all buttons
            filterButtons.forEach((btn) => {
                btn.classList.remove("bg-[#FF7A3B]", "border-[#FF7A3B]");
                btn.classList.add("border-white/30");
            });

            // Add active style to clicked button
            button.classList.add("bg-[#FF7A3B]", "border-[#FF7A3B]");
            button.classList.remove("border-white/30");

            const filterValue = button.getAttribute("data-filter");

            projectItems.forEach((item) => {
                const category = item.getAttribute("data-category");
                const match = filterValue === "all" || category === filterValue;

                if (match) {
                    item.classList.remove("hidden");
                } else {
                    item.classList.add("hidden");
                }
            });
        });
    });
});

//video modal
const modal = document.getElementById("videoModal");
const modalTitle = document.getElementById("modalTitle");
const modalWrapper = document.getElementById("modalVideoWrapper");
const modalClose = document.getElementById("modalClose");

function openVideoModal(btn) {
    const src = btn.getAttribute("data-video");
    const title = btn.getAttribute("data-title") || "Video";

    modalTitle.textContent = title;

    let embedHTML = "";
    if (src.includes("youtube.com") || src.includes("youtu.be")) {
        const videoId = src.includes("youtu.be")
            ? src.split("youtu.be/")[1].split("?")[0]
            : new URL(src).searchParams.get("v");
        embedHTML = `<iframe class="w-full h-full" src="https://www.youtube.com/embed/${videoId}?autoplay=1" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    } else if (src.includes("vimeo.com")) {
        const videoId = src.split("vimeo.com/")[1];
        embedHTML = `<iframe class="w-full h-full" src="https://player.vimeo.com/video/${videoId}?autoplay=1" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    } else {
        embedHTML = `<video class="w-full h-full" src="${src}" controls autoplay playsinline></video>`;
    }

    modalWrapper.innerHTML = embedHTML;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.classList.add("overflow-hidden");
}

function closeVideoModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    modalWrapper.innerHTML = "";
    document.body.classList.remove("overflow-hidden");
}

document.querySelectorAll(".play-btn").forEach((btn) => {
    btn.addEventListener("click", () => openVideoModal(btn));
});

modalClose.addEventListener("click", closeVideoModal);

modal.addEventListener("click", function (e) {
    if (e.target === modal) closeVideoModal();
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeVideoModal();
});
