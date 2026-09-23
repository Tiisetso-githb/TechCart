/* =========================
   PRODUCT DATA
========================= */

const productData = [

    {
        id: 1,
        name: "TechBook Pro Laptop",
        price: 12999,
        category: "laptops",
        image: "images/laptop.jpg"
    },

    {
        id: 2,
        name: "SoundMax Headphones",
        price: 899,
        category: "audio",
        image: "images/headphones.jpg"
    },

    {
        id: 3,
        name: "ProType Mechanical Keyboard",
        price: 1299,
        category: "accessories",
        image: "images/keyboard.jpg"
    },

    {
        id: 4,
        name: "Nova X Smartphone",
        price: 9499,
        category: "smartphones",
        image: "images/phone.jpg"
    },

    {
        id: 5,
        name: "HyperSpeed Gaming Mouse",
        price: 699,
        category: "gaming",
        image: "images/mouse.jpg"
    },

    {
        id: 6,
        name: "TechTab 11 Tablet",
        price: 6999,
        category: "tablets",
        image: "images/tablet.jpg"
    }

];


/* =========================
   CART
========================= */

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


/* =========================
   UPDATE CART COUNT
========================= */

function updateCartCount() {

    const cartCount =
        document.querySelector("#cart-count");


    if (cartCount) {

        const totalQuantity =
            cart.reduce(function(total, item) {

                return total + item.quantity;

            }, 0);


        cartCount.textContent =
            totalQuantity;

    }

}


/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


/* =========================
   ADD PRODUCT TO CART
========================= */

function addToCart(product) {

    const existingProduct =
        cart.find(function(item) {

            return item.id === product.id;

        });


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

}


/* =========================
   ADD TO CART BUTTONS
========================= */

const addToCartButtons =
    document.querySelectorAll(".add-to-cart-button");


addToCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const productId =
            Number(button.dataset.productId);


        const selectedProduct =
            productData.find(function(product) {

                return product.id === productId;

            });


        if (selectedProduct) {

            addToCart(selectedProduct);

            alert(
                selectedProduct.name +
                " has been added to your cart."
            );

        }

    });

});


/* =========================
   CATEGORY FILTERING
========================= */

const categoryButtons =
    document.querySelectorAll(".category-btn");


const products =
    document.querySelectorAll(".product-card");


categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedCategory =
            button.dataset.category;


        categoryButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        products.forEach(function(product) {

            const productCategory =
                product.dataset.category;


            if (
                selectedCategory === "all" ||
                productCategory === selectedCategory
            ) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });

});


/* =========================
   PRODUCT SEARCH
========================= */

const searchInput =
    document.querySelector("#search-input");


if (searchInput) {

    searchInput.addEventListener("input", function() {

        const searchTerm =
            searchInput.value.toLowerCase();


        products.forEach(function(product) {

            const productName =
                product
                    .querySelector("h3")
                    .textContent
                    .toLowerCase();


            if (
                productName.includes(searchTerm)
            ) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });

}


/* =========================
   DISPLAY CART
========================= */

const cartContainer =
    document.querySelector("#cart-container");


const cartTotal =
    document.querySelector("#cart-total");


function displayCart() {

    if (!cartContainer) {

        return;

    }


    cartContainer.innerHTML = "";


    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add some products to your cart
                    to get started.
                </p>

            </div>

        `;


        if (cartTotal) {

            cartTotal.textContent = "0";

        }


        return;

    }


    let total = 0;


    cart.forEach(function(product) {

        total +=
            product.price * product.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.classList.add(
            "cart-item"
        );


        cartItem.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >


            <div class="cart-item-info">

                <h3>
                    ${product.name}
                </h3>


                <p class="cart-item-price">

                    R${product.price.toLocaleString()}

                </p>


                <div class="quantity-controls">


                    <button
                        class="decrease-button"
                        data-id="${product.id}"
                    >
                        -
                    </button>


                    <span>
                        Quantity: ${product.quantity}
                    </span>


                    <button
                        class="increase-button"
                        data-id="${product.id}"
                    >
                        +
                    </button>


                </div>

            </div>


            <button
                class="remove-button"
                data-id="${product.id}"
            >
                Remove
            </button>

        `;


        cartContainer.appendChild(
            cartItem
        );

    });


    if (cartTotal) {

        cartTotal.textContent =
            total.toLocaleString();

    }

}


/* =========================
   CART BUTTONS
========================= */

if (cartContainer) {

    cartContainer.addEventListener(
        "click",
        function(event) {

            const button =
                event.target;


            const productId =
                Number(button.dataset.id);


            if (
                button.classList.contains(
                    "increase-button"
                )
            ) {

                increaseQuantity(productId);

            }


            if (
                button.classList.contains(
                    "decrease-button"
                )
            ) {

                decreaseQuantity(productId);

            }


            if (
                button.classList.contains(
                    "remove-button"
                )
            ) {

                removeFromCart(productId);

            }

        }
    );

}


/* =========================
   INCREASE QUANTITY
========================= */

function increaseQuantity(productId) {

    const product =
        cart.find(function(item) {

            return item.id === productId;

        });


    if (product) {

        product.quantity += 1;

    }


    saveCart();

    updateCartCount();

    displayCart();

}


/* =========================
   DECREASE QUANTITY
========================= */

function decreaseQuantity(productId) {

    const product =
        cart.find(function(item) {

            return item.id === productId;

        });


    if (!product) {

        return;

    }


    if (product.quantity > 1) {

        product.quantity -= 1;

    } else {

        cart =
            cart.filter(function(item) {

                return item.id !== productId;

            });

    }


    saveCart();

    updateCartCount();

    displayCart();

}


/* =========================
   REMOVE FROM CART
========================= */

function removeFromCart(productId) {

    cart =
        cart.filter(function(item) {

            return item.id !== productId;

        });


    saveCart();

    updateCartCount();

    displayCart();

}


//CHECKOUT


const checkoutButton =
    document.querySelector("#checkout-button");


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function() {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            alert(
                "Checkout functionality will be added later."
            );

        }
    );

}



  // START CART


updateCartCount();

displayCart();