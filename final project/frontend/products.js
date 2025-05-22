// جلب العناصر الأساسية
const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const closeBtn = document.querySelector(".close");

// إضافة حدث عند الضغط على أي زر View Details
document.querySelectorAll(".view-details").forEach(button => {
  button.addEventListener("click", function () {
    const card = this.closest(".product-card");
    const imgSrc = card.querySelector("img").src;
    const title = card.querySelector("h3").innerText;
    const price = card.querySelector("p").innerText;

    modalImage.src = imgSrc;
    modalTitle.textContent = title;
    modalPrice.textContent = price;
    modalDescription.textContent = "This is a high-quality and stylish bag, perfect for any occasion.";

    modal.style.display = "block";
  });
});

// زر الإغلاق
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// إغلاق النافذة عند الضغط خارجها
window.addEventListener("click", event => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// // إرسال طلب POST لإضافة منتج جديد
// function addProduct(product) {
//   fetch("http://localhost:5000/api/products", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(product),
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log("Product added:", data);
//     })
//     .catch(error => {
//       console.error("Error adding product:", error);
//     });
// }

// مثال:
const newProduct = {
  name: "Leather Bag",
  description: "A stylish leather bag for everyday use",
  price: 120,
  category: "Bags",
  image: "https://example.com/images/bag.jpg",
};

addProduct(newProduct);


// إرسال طلب GET للحصول على جميع المنتجات
function fetchProducts() {
  fetch("http://localhost:5000/api/products")
    .then(response => response.json())
    .then(data => {
      console.log("Products:", data);
    })
    .catch(error => {
      console.error("Error fetching products:", error);
    });
}

fetchProducts();


// إرسال طلب PUT لتحديث منتج معين
function updateProduct(productId, updatedData) {
  fetch(`http://localhost:5000/api/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then(response => response.json())
    .then(data => {
      console.log("Product updated:", data);
    })
    .catch(error => {
      console.error("Error updating product:", error);
    });
}

// مثال:
const updatedProduct = {
  name: "Updated Leather Bag",
  description: "A new description",
  price: 100,
  category: "Bags",
  image: "https://example.com/images/updated_bag.jpg",
};

updateProduct("productId123", updatedProduct);

// إرسال طلب DELETE لحذف منتج معين
function deleteProduct(productId) {
  fetch(`http://localhost:5000/api/products/${productId}`, {
    method: "DELETE",
  })
    .then(response => response.json())
    .then(data => {
      console.log("Product deleted:", data);
    })
    .catch(error => {
      console.error("Error deleting product:", error);
    });
}