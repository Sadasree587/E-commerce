export default class Cart{
constructor(){
this.items = JSON.parse(localStorage.getItem('cart')||'[]');
this.panel = document.getElementById('cart-panel');
this.countEl = document.getElementById('cart-count');
this.renderCount();
}
add(p){
const found = this.items.find(i=>i.id===p.id);
if(found) found.qty++;
else this.items.push({...p,qty:1});
this.save();
this.animateAdd();
this.renderCount();
}
save(){localStorage.setItem('cart',JSON.stringify(this.items));}
renderCount(){this.countEl.textContent=this.items.reduce((s,i)=>s+i.qty,0)}
togglePanel(){
if(this.panel.classList.contains('hidden')){ this.panel.classList.remove('hidden'); this.renderPanel(); }
else this.panel.classList.add('hidden');
}
renderPanel(){
this.panel.innerHTML = `<h3>Cart</h3>` + this.items.map(i=>`<div>${i.title} x ${i.qty} — ₹${(i.price*i.qty).toFixed(2)}</div>`).join('') + `<hr/><button id='checkout'>Checkout</button>`;
this.panel.querySelector('#checkout').addEventListener('click',()=>alert('Demo checkout — integrate payment API'));
}
animateAdd(){
// small visual feedback
const b=document.querySelector('.brand');
b.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:260});
}
}
