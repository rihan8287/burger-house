/* =========================
   NAVBAR
========================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================
   MENU FILTER
========================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const menuCards =
    document.querySelectorAll(".menu-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        menuCards.forEach(card => {

            if (
                filter === "all" ||
                card.dataset.category === filter
            ) {

                card.style.display = "block";

                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }, 10);

            } else {

                card.style.opacity = "0";
                card.style.transform = "translateY(15px)";

                setTimeout(() => {
                    card.style.display = "none";
                }, 250);

            }

        });

    });

});


/* =========================
   CART
========================= */

let cart = [];


const cartBtn =
    document.getElementById("cartBtn");

const cartDrawer =
    document.getElementById("cartDrawer");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");


function openCart() {

    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeCartDrawer() {

    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


cartBtn.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartDrawer);

cartOverlay.addEventListener(
    "click",
    closeCartDrawer
);


/* =========================
   ADD TO CART
========================= */

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);
        const image = button.dataset.image;

        const existing =
            cart.find(item => item.name === name);

        if (existing) {

            existing.quantity++;

        } else {

            cart.push({
                name,
                price,
                image,
                quantity: 1
            });

        }

        updateCart();

        showToast(`${name} added to cart 🍔`);

    });

});


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <span>🍔</span>
                <p>Your cart is empty.</p>
                <small>Add something delicious!</small>
            </div>
        `;

    }


    let total = 0;
    let quantityTotal = 0;


    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        quantityTotal += item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <img src="${item.image}" alt="${item.name}">

            <div>

                <h4>${item.name}</h4>

                <div class="cart-item-price">
                    ₹${item.price} × ${item.quantity}
                </div>

            </div>

            <button
                class="remove-item"
                onclick="removeItem(${index})">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;

        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = quantityTotal;

    cartTotal.textContent = `₹${total}`;

}


/* =========================
   REMOVE ITEM
========================= */

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

    showToast("Item removed");

}


/* =========================
   TOAST
========================= */

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

let toastTimer;


function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("active");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("active");

    }, 2500);

}


/* =========================
   REVIEW SLIDER
========================= */

const reviews =
    document.querySelectorAll(".review-card");

let currentReview = 0;


function showReview(index) {

    reviews.forEach(review => {
        review.classList.remove("active");
    });

    reviews[index].classList.add("active");

}


showReview(0);


document
    .getElementById("nextReview")
    .addEventListener("click", () => {

        currentReview++;

        if (currentReview >= reviews.length) {
            currentReview = 0;
        }

        showReview(currentReview);

    });


document
    .getElementById("prevReview")
    .addEventListener("click", () => {

        currentReview--;

        if (currentReview < 0) {
            currentReview = reviews.length - 1;
        }

        showReview(currentReview);

    });


/* Auto slider */

setInterval(() => {

    currentReview++;

    if (currentReview >= reviews.length) {
        currentReview = 0;
    }

    showReview(currentReview);

}, 5000);


/* =========================
   COUNTER ANIMATION
========================= */

const counters =
    document.querySelectorAll("[data-target]");

let counterStarted = false;


function animateCounters() {

    if (counterStarted) return;

    counterStarted = true;


    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        let current = 0;

        const increment =
            Math.max(1, Math.ceil(target / 80));


        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                counter.textContent =
                    target + (target === 100 ? "%" : "+");

                return;

            }

            counter.textContent = current;

            requestAnimationFrame(updateCounter);

        };


        updateCounter();

    });

}


const statsSection =
    document.querySelector(".stats");


const statsObserver =
    new IntersectionObserver(

        entries => {

            if (entries[0].isIntersecting) {

                animateCounters();

                statsObserver.disconnect();

            }

        },

        {
            threshold: .5
        }

    );


statsObserver.observe(statsSection);


/* =========================
   CONTACT FORM
========================= */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", event => {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (!name || !phone || !message) {

        showToast("Please fill all fields.");

        return;

    }


    showToast(
        "Message submitted successfully! ❤️"
    );


    contactForm.reset();

});


/* =========================
   SMOOTH NAVIGATION
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(event) {

        const target =
            document.querySelector(
                this.getAttribute("href")
            );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* =========================
   INITIAL CART
========================= */

updateCart();