const orders = [
  {
    _id: 'ord001',
    userId: { name: 'NoorSonjoq', email: 'noorsonjoq@gmail.com' },
    products: [
      { productId: { name: 'Bag Men', price: 50 }, quantity: 1 },
      { productId: { name: 'Bag kids', price: 5 }, quantity: 3 }
    ],
    totalAmount: 65
  },
  {
    _id: 'ord002',
    userId: { name: 'sara ahmad', email: 'sara ahmad@gmail.com' },
    products: [
      { productId: { name: 'Bag Wonam', price: 30 }, quantity: 2 }
    ],
    totalAmount: 60
  }
];

const ordersTableBody = document.querySelector('#ordersTable tbody');
const orderDetailsDiv = document.getElementById('orderDetails');

function renderOrders() {
  ordersTableBody.innerHTML = '';
  orders.forEach(order => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${order._id}</td>
      <td>${order.userId.name}</td>
      <td>${order.userId.email}</td>
      <td>${order.products.length}</td>
      <td>$${order.totalAmount}</td>
      <td><button onclick="showDetails('${order._id}')">View</button></td>
    `;
    ordersTableBody.appendChild(tr);
  });
}

function showDetails(orderId) {
  const order = orders.find(o => o._id === orderId);
  if (!order) return alert('Order not found.');

  document.getElementById('detailOrderId').textContent = order._id;
  document.getElementById('detailUserName').textContent = order.userId.name;
  document.getElementById('detailUserEmail').textContent = order.userId.email;
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

renderOrders();
