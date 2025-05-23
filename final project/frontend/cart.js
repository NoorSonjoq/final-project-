// بيانات العربة
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
];

// تحديث كمية منتج في العربة
function updateQuantity(itemId, newQuantity) {
  newQuantity = parseInt(newQuantity);
  if (newQuantity < 1 || isNaN(newQuantity)) {
    alert("الكمية يجب أن تكون رقم صحيح أكبر من 0");
    displayCartItems(); // لإعادة تعيين القيمة القديمة
    return;
  }

  const item = cart.find(product => product.id === itemId);
  if (item) {
    item.quantity = newQuantity;
  }
  displayCartItems();
}

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
        <p>
          Quantity: 
          <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)" />
        </p>
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

// أحداث الأزرار وخيارات الدفع
document.getElementById('checkoutButton').addEventListener('click', showConfirmationModal);
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('cashOption').addEventListener('click', () => setPaymentOption('cash'));
document.getElementById('cardOption').addEventListener('click', () => setPaymentOption('card'));
document.getElementById('confirmPurchase').addEventListener('click', () => {
  closeModal();
  const confirmationMessage = document.getElementById('confirmationMessage');
  confirmationMessage.style.display = 'block';

  setTimeout(() => {
    confirmationMessage.style.display = 'none';
  }, 3000);
});

// تحميل العربة عند تحميل الصفحة
window.onload = displayCartItems;
