const productTableBody = document.getElementById('productTableBody');
const addProductModal = document.getElementById('addProductModal');
const openAddProductModalBtn = document.getElementById('openAddProductModal');
const closeAddProductModalBtn = document.getElementById('closeAddProductModal');
const addProductForm = document.getElementById('addProductForm');

const editProductModal = document.getElementById('editProductModal');
const closeEditProductModalBtn = document.getElementById('closeEditProductModal');
const editProductForm = document.getElementById('editProductForm');

const categoryButtons = document.querySelectorAll('.category-tabs button');

const confirmDeleteModal = document.getElementById('confirmDeleteModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

let products = [
  {
    name: "Women's Bags",
    category: "women",
    price: 20,
    description: "High quality Bag",
    image: "./images/Women's Bags1.avif"
  },
  {
    name: "Men's Bags",
    category: "men",
    price: 30,
    description: "Business Leather Bag",
    image: "./images/Men's Bags1.jpeg"
  },
  {
    name: "Kids' Bags",
    category: "kids",
    price: 15,
    description: "Colorful School Bag",
    image: "./images/Kids' Bags1.jpg"
  }
];

let currentFilter = 'all';
let editIndex = null;
let deleteIndex = null;

// دالة عرض المنتجات في الجدول
function renderProducts() {
  productTableBody.innerHTML = '';
  products.forEach((product, index) => {
    if (currentFilter === 'all' || product.category === currentFilter) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${product.name}</td>
        <td>${capitalize(product.category)}</td>
        <td>$${product.price}</td>
        <td>${product.description}</td>
        <td><img src="${product.image}" alt="${product.name}" style="width: 60px; height: 60px; object-fit: cover;" /></td>
        <td>
          <button class="btn-edit" onclick="openEditModal(${index})"><i class="fas fa-edit"></i> Edit</button>
          <button class="btn-delete" onclick="deleteProduct(${index})"><i class="fas fa-trash"></i> Delete</button>
        </td>
      `;
      productTableBody.appendChild(tr);
    }
  });
}

// دالة لتكبير الحرف الأول في اسم الفئة
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// فتح مودال إضافة منتج جديد
openAddProductModalBtn.addEventListener('click', () => {
  addProductModal.classList.add('active');
});

// إغلاق مودال الإضافة
closeAddProductModalBtn.addEventListener('click', () => {
  addProductModal.classList.remove('active');
  addProductForm.reset();
});

// إرسال نموذج إضافة منتج جديد
addProductForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newProduct = {
    name: document.getElementById('productName').value.trim(),
    price: Number(document.getElementById('productPrice').value),
    category: document.getElementById('productCategory').value,
    description: document.getElementById('productDescription').value.trim(),
    image: document.getElementById('productImage').value.trim()
  };
  products.push(newProduct);
  renderProducts();
  addProductModal.classList.remove('active');
  addProductForm.reset();
});

// فتح مودال التعديل وتعبئة البيانات
function openEditModal(index) {
  editIndex = index;
  const product = products[index];
  document.getElementById('editProductName').value = product.name;
  document.getElementById('editProductPrice').value = product.price;
  document.getElementById('editProductCategory').value = product.category;
  document.getElementById('editProductDescription').value = product.description;
  document.getElementById('editProductImage').value = product.image;
  editProductModal.classList.add('active');
}

// إغلاق مودال التعديل
closeEditProductModalBtn.addEventListener('click', () => {
  editProductModal.classList.remove('active');
  editProductForm.reset();
  editIndex = null;
});

// حفظ التعديلات بعد تعديل المنتج
editProductForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (editIndex !== null) {
    products[editIndex] = {
      name: document.getElementById('editProductName').value.trim(),
      price: Number(document.getElementById('editProductPrice').value),
      category: document.getElementById('editProductCategory').value,
      description: document.getElementById('editProductDescription').value.trim(),
      image: document.getElementById('editProductImage').value.trim()
    };
    renderProducts();
    editProductModal.classList.remove('active');
    editProductForm.reset();
    editIndex = null;
  }
});

// فتح مودال تأكيد الحذف
function deleteProduct(index) {
  deleteIndex = index;
  confirmDeleteModal.classList.add('active');
}

// تأكيد الحذف
confirmDeleteBtn.addEventListener('click', () => {
  if (deleteIndex !== null) {
    products.splice(deleteIndex, 1);
    renderProducts();
    deleteIndex = null;
  }
  confirmDeleteModal.classList.remove('active');
});

// إلغاء الحذف
cancelDeleteBtn.addEventListener('click', () => {
  deleteIndex = null;
  confirmDeleteModal.classList.remove('active');
});

// تصفية المنتجات حسب الفئة
function filterProducts(category, btn) {
  currentFilter = category;
  categoryButtons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts();
}

// بدء العرض
renderProducts();
