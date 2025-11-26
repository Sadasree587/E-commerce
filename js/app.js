// Simple product list + cart using local JSON
const productsEl = document.getElementById('products');
const template = document.getElementById('product-card');
const cartCount = document.getElementById('cart-count');
const search = document.getElementById('search');

let products = [];
let cart = JSON.parse(localStorage.getItem('cart')||'[]');

function renderProducts(list){
  productsEl.innerHTML = '';
  list.forEach(p=>{
    const clone = template.content.cloneNode(true);
    clone.querySelector('.card-img').src = p.image || 'https://via.placeholder.com/300x200';
    clone.querySelector('.card-title').textContent = p.title;
    clone.querySelector('.card-price').textContent = '₹' + p.price;
    const btn = clone.querySelector('.add-btn');
    btn.addEventListener('click', ()=> addToCart(p));
    productsEl.appendChild(clone);
  });
}

function addToCart(p){
  cart.push(p);
  localStorage.setItem('cart', JSON.stringify(cart));
  cartCount.textContent = cart.length;
  alert(p.title + ' added to cart');
}

function loadProducts(){
  fetch('data/products.json').then(r=>r.json()).then(data=>{
    products = data;
    renderProducts(products);
  });
}

search.addEventListener('input', ()=> {
  const q = search.value.toLowerCase();
  renderProducts(products.filter(p => p.title.toLowerCase().includes(q)));
});

cartCount.textContent = cart.length;
loadProducts();
