const orders = [
  {
    _id: 'ord123',
    products: [
      { productId: { name: 'Product A', price: 10 }, quantity: 2 },
      { productId: { name: 'Product B', price: 15 }, quantity: 1 },
    ],
    paymentMethod: 'Credit Card',
    totalAmount: 35,
  },
  {
    _id: 'ord124',
    products: [
      { productId: { name: 'Product C', price: 20 }, quantity: 1 },
    ],
    paymentMethod: 'Cash',
    totalAmount: 20,
  },
];

const ordersTableBody = document.querySelector('#ordersTable tbody');
const orderDetailsDiv = document.getElementById('orderDetails');

function renderOrders() {
  ordersTableBody.innerHTML = '';
  orders.forEach(order => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${order._id}</td>
      <td>${order.products.length}</td>
      <td>$${order.totalAmount}</td>
      <td>
        <button onclick="showDetails('${order._id}')">View</button>
        <button onclick="deleteOrder('${order._id}')">Delete</button>
      </td>
    `;
    ordersTableBody.appendChild(tr);
  });
}

function showDetails(orderId) {
  const order = orders.find(o => o._id === orderId);
  if (!order) return alert('Order not found.');

  document.getElementById('detailOrderId').textContent = order._id;
  document.getElementById('detailPaymentMethod').textContent = order.paymentMethod;
  document.getElementById('detailTotal').textContent = order.totalAmount;

  const productsList = document.getElementById('detailProducts');
  productsList.innerHTML = '';
  order.products.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.productId.name} - $${p.productId.price} x ${p.quantity}`;
    productsList.appendChild(li);
  });

  orderDetailsDiv.style.display = 'block';
}

function closeDetails() {
  orderDetailsDiv.style.display = 'none';
}

function deleteOrder(orderId) {
  if (!confirm('Are you sure you want to delete this order?')) return;
  const index = orders.findIndex(o => o._id === orderId);
  if (index > -1) {
    orders.splice(index, 1);
    renderOrders();
    closeDetails();
    alert(`Order ${orderId} deleted (simulated)`);
  }
}

// Initial render
renderOrders();
