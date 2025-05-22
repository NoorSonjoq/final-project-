// بيانات العربة (تمثل المنتجات في العربة مع كمية السعر)
let cart = [
  {
    id: 1,
    name: "Classic Leather Bag",
    price: 30,
    quantity: 1,
    image: "./images/Women's Bags1.avif",
  },
  {
    id: 2,
    name: "Elegant Women's Bag",
    price: 40,
    quantity: 2,
    image: "./images/Women's Bags2.jpeg",
  },
  // يمكن إضافة المزيد من المنتجات هنا
];

// عرض المنتجات في العربة
function displayCartItems() {
  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = ''; // مسح المحتوى الحالي

  let totalPrice = 0;

  cart.forEach(item => {
    totalPrice += item.price * item.quantity;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h3>${item.name}</h3>
        <p>${item.price} JD</p>
        <p>Quantity: <span class="quantity">${item.quantity}</span></p>
      </div>
      <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  // تحديث إجمالي السعر
  document.getElementById('totalPrice').textContent = `${totalPrice} JD`;
}

// إزالة منتج من العربة
function removeItem(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  displayCartItems();
}

// عرض نافذة التأكيد
function showConfirmationModal() {
  const modal = document.getElementById('confirmationModal');
  modal.style.display = 'block';
}

// إغلاق نافذة التأكيد
function closeModal() {
  const modal = document.getElementById('confirmationModal');
  modal.style.display = 'none';
}

// تحديد خيار الدفع
function setPaymentOption(option) {
  const paymentDetails = document.getElementById('paymentDetails');

  if (option === 'cash') {
    paymentDetails.innerHTML = `
      <p>You will pay in cash upon delivery. Please ensure you have the exact amount.</p>
    `;
  } else if (option === 'card') {
    paymentDetails.innerHTML = `
      <p>Please enter your credit card details.</p>
      <input type="text" placeholder="Card Number" />
      <input type="text" placeholder="Expiration Date" />
      <input type="text" placeholder="CVV" />
    `;
  }
}

// إضافة أحداث زر "الذهاب إلى الدفع"
document.getElementById('checkoutButton').addEventListener('click', showConfirmationModal);

// إضافة أحداث زر إغلاق النافذة
document.getElementById('closeModal').addEventListener('click', closeModal);

// إضافة أحداث خيارات الدفع
document.getElementById('cashOption').addEventListener('click', () => setPaymentOption('cash'));
document.getElementById('cardOption').addEventListener('click', () => setPaymentOption('card'));

// إضافة أحداث زر تأكيد الشراء
document.getElementById('confirmPurchase').addEventListener('click', () => {
  // إغلاق نافذة التأكيد
  closeModal();

  // إظهار رسالة التأكيد
  const confirmationMessage = document.getElementById('confirmationMessage');
  confirmationMessage.style.display = 'block';

  // إخفاء رسالة التأكيد بعد 3 ثوانٍ
  setTimeout(() => {
    confirmationMessage.style.display = 'none'; // إخفاء رسالة التأكيد بعد 3 ثوانٍ
  }, 3000);
});

// تحميل العربة عند تحميل الصفحة
window.onload = displayCartItems;
