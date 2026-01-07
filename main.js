/* ===============================
   أدوات مساعدة (Throttle)
================================ */
function throttle(fn, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ===============================
   Active Link في الـ Navbar
================================ */
const currentPage = location.pathname.split("/").pop();

document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});

/* ===============================
   Hero Parallax (Throttle)
================================ */
const hero = document.querySelector(".hero");

if (hero) {
    window.addEventListener(
        "mousemove",
        throttle(e => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            hero.style.backgroundPosition = `${50 - x}% ${50 - y}%`;
        }, 40)
    );
}

/* ===============================
   تحديث عداد السلة
================================ */
const cartCounter = document.getElementById("cartCount");

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = 0;

    cart.forEach(item => count += Number(item.qty));

    if (cartCounter) {
        cartCounter.innerText = count;
        cartCounter.style.display = count > 0 ? "flex" : "none";
    }
}
updateCartCount();

/* ===============================
   طلب عبر واتساب (Checkout)
================================ */
function orderWhatsApp() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("السلة فارغة");
        return;
    }

    /* ✅ تصليح optional chaining */
    const name = document.getElementById("customerName") ? .value || "";
    const phone = document.getElementById("phone") ? .value || "";
    const address = document.getElementById("address") ? .value || "";

    const phoneNumber = "201044373744";
    let message = "طلب جديد من MOVE ON 👕🔥\n\n";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;

        message += `
- ${item.product}
  المقاس: ${item.size}
  اللون: ${item.color}
  العدد: ${item.qty}
  السعر: ${itemTotal} جنيه
`;
    });

    message += `
------------------
الإجمالي: ${total} جنيه

الاسم: ${name}
الموبايل: ${phone}
العنوان: ${address}
`;

    window.open(
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
}

/* ===============================
   Scroll Reveal (Performance)
================================ */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    reveals.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
}
window.addEventListener("scroll", revealOnScroll, { passive: true });
revealOnScroll();

/* ===============================
   Lazy Load Images
================================ */
const lazyImages = document.querySelectorAll("img[data-src]");

if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

/* ===============================
   Smooth Scroll (متصلّح)
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

/* ===============================
   Dark Mode Toggle 🌙
================================ */
const darkToggle = document.getElementById("darkToggle");

if (localStorage.getItem("darkMode") === "on") {
    document.body.classList.add("dark");
}

if (darkToggle) {
    darkToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem(
            "darkMode",
            document.body.classList.contains("dark") ? "on" : "off"
        );
    });
}

/* ===============================
   Page Transition (آمن)
================================ */
document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", e => {
        const href = link.getAttribute("href");

        if (
            link.target === "_blank" ||
            !href ||
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:")
        ) return;

        const overlay = document.getElementById("page-transition");
        if (!overlay) return;

        e.preventDefault();
        overlay.classList.add("active");

        setTimeout(() => {
            window.location.href = href;
        }, 400);
    });
});