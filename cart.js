/* =====================================================
   CONFIG
   ===================================================== */
const DISCOUNT_PERCENT = 10; // درصد تخفیف
const TAX_PERCENT = 9;       // درصد مالیات
const SHIPPING_COST = 50000; // هزینه ارسال (تومان)

/* =====================================================
   ADD TO CART (WITH IMAGE)
   ===================================================== */
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (!Array.isArray(cart)) {
    cart = [];
  }

  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      name: name,
      price: Number(price),
      image: image,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();

  alert("به سبد خرید اضافه شد");
}

/* =====================================================
   RENDER CART + TOTALS
   ===================================================== */
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalBox = document.getElementById("total");

  if (!container || !totalBox) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  container.innerHTML = "";

  if (!cart.length) {
    container.innerText = "سبد خرید خالی است";
    totalBox.innerHTML = "";
    updateCartCount();
    return;
  }

  let subtotal = 0;

  cart.forEach((item, i) => {
    subtotal += item.price * item.qty;

    const row = document.createElement("div");
    row.className = "cart-row";

    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-info">
        <strong>${item.name}</strong>
        <span>${item.price.toLocaleString()} تومان</span>
        <div class="cart-qty">
          <button onclick="decreaseQty(${i})">−</button>
          <span>${item.qty}</span>
          <button onclick="increaseQty(${i})">+</button>
        </div>
      </div>
    `;

    container.appendChild(row);
  });

  const discount =subtotal * DISCOUNT_PERCENT / 100;
  const afterDiscount = subtotal - discount;
  const tax = afterDiscount * TAX_PERCENT / 100;
  const shipping = afterDiscount> 0 ? SHIPPING_COST : 0;
  const finalTotal = afterDiscount + tax + shipping;

  totalBox.innerHTML = `
    <div>جمع کالاها: ${subtotal.toLocaleString()} تومان</div>
    <div>تخفیف (${DISCOUNT_PERCENT}٪): −${discount.toLocaleString()} تومان</div>
    <div>مالیات (${TAX_PERCENT}٪): ${tax.toLocaleString()} تومان</div>
    <div>هزینه ارسال: ${shipping.toLocaleString()} تومان</div>
    <hr>
    <strong>مبلغ نهایی: ${Math.round(finalTotal).toLocaleString()} تومان</strong>
  `;

  updateCartCount();
}

/* =====================================================
   INCREASE / DECREASE
   ===================================================== */
function increaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].qty += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function decreaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
  } else {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

/* =====================================================
   CART COUNT (BADGE)
   ===================================================== */
function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (!countEl) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalQty = 0;

  cart.forEach(item => {
    totalQty += item.qty;
  });

  countEl.innerText = totalQty;
}

/* =====================================================
   CLEAR CART
   ===================================================== */
function clearCart() {
  localStorage.removeItem("cart");
  renderCart();
  updateCartCount();
}

/* =====================================================
   PAYMENT + ORDER SAVE
   ===================================================== */
function generateTrackingCode() {
  return "ORD-" + Math.floor(100000 + Math.random() * 900000);
}



/* =====================================================
   INIT
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});

function goToPayment() {
  window.location.href = "payment.html";
}

const form = document.getElementById("paymentForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("SUBMIT OK"); 

    const fullname   = document.getElementById("fullname")?.value.trim();
    const mobile     = document.getElementById("mobile")?.value.trim();
    const nationalId = document.getElementById("nationalId")?.value.trim();
    const country    = document.getElementById("country")?.value;
    const province   = document.getElementById("province")?.value;
    const city       = document.getElementById("city")?.value.trim();
    const address    = document.getElementById("address")?.value.trim();
    const cardNumber = document.getElementById("cardNumber")?.value.replace(/\s/g,"");

    if (!fullname) return alert("نام را وارد کنید");
    if (!/^09\d{9}$/.test(mobile)) return alert("شماره موبایل معتبر نیست");
    if (!/^\d{10}$/.test(nationalId)) return alert("کد ملی معتبر نیست");
    if (!country) return alert("کشور را انتخاب کنید");
    if (!province) return alert("استان را انتخاب کنید");
    if (!city) return alert("شهر را وارد کنید");
    if (!address) return alert("آدرس را وارد کنید");
    if (!/^\d{16}$/.test(cardNumber)) return alert("شماره کارت معتبر نیست");

    console.log("ALL VALID"); // تست

    // ساخت سفارش کامل (سازگار با پنل ادمین)
const order = {
  trackingCode,
  status: "در حال پردازش",
  createdAt: new Date().toISOString(),

  customer: {
    fullname,
    mobile,
    nationalId,
    country,
    province,
    city,
    address
  },

  items: cart.map(item => ({
    name: item.name,
    qty: item.qty,
    price: item.price
  }))
};

// ===== ذخیره برای پنل ادمین =====
const orders = JSON.parse(localStorage.getItem("orders")) || [];
orders.push(order);
localStorage.setItem("orders", JSON.stringify(orders));

// ===== ذخیره برای پیگیری مشتری =====
localStorage.setItem("lastOrder", JSON.stringify(order));

// خالی کردن سبد خرید
localStorage.removeItem("cart");

// انتقال
window.location.href ="success.html";

    // 👉 مرحله بعد
    window.location.href = "payment.html"; // یا success.html
});
}

/* =====================================================
   CONTINUE PAYMENT (DEMO)
   ===================================================== */
function continuePayment() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cart.length) {
    alert("سبد خرید خالی است");
    return;
  }

  const fullname = document.getElementById("fullname")?.value.trim() || "—";
  const mobile   = document.getElementById("mobile")?.value.trim() || "—";
  const city     = document.getElementById("city")?.value.trim() || "—";
  const address  = document.getElementById("address")?.value.trim() || "—";

  const trackingCode = "ORD-" + Date.now();

  const order = {
    trackingCode,
    status: "ثبت شد (پرداخت نشده)",
    createdAt: new Date().toISOString(),
    customer: { fullname, mobile, city, address },
    items: cart.map(item => ({
      name: item.name,
      qty: item.qty,
      price: item.price
    }))
  };

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.setItem("lastOrder", JSON.stringify(order));
  localStorage.removeItem("cart");

  window.location.href = "track.html";
}

