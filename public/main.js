const categoryButtons = document.getElementsByClassName('category-button')
const addToCartButtons = document.getElementsByClassName('button-add-cart')
const shoppingCart = document.getElementsByClassName("shopping-cart-link")
let addedToCartGoods = [];


for(let i = 0; i < categoryButtons.length; i++) {
categoryButtons[i].addEventListener('click', _ => {
    fetch(`/getGoodsByShop?category=${categoryButtons[i].textContent}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {
        // if (res.ok) return res.json()
      })
      .then(response => {
        window.location.reload(true)
      })
      .catch(error => console.log(error))
})
}
/*
shoppingCart[0].addEventListener('click', _ => {
  fetch(`/getGoodsById?preorderInfo=${localStorage.getItem("addedToCartGoods")}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  })
  .then(res => {
    // if (res.ok) return res.json()
  })
  .then(response => {
    window.location.reload(true)
  })
  .catch(error => console.log(error))
})
*/

for(let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener('click', _ => {
  
  let goodsIndex = addedToCartGoods.findIndex( ({ id }) => id == addToCartButtons[i].id );

  if(goodsIndex != -1) {
    addToCartButtons[goodsIndex].count++
  }else{ 
  let goodForOrder = {
    id: addToCartButtons[i].id ,
    count: 1
  }
  addedToCartGoods.push(goodForOrder)
  }

  localStorage.setItem("addedToCartGoods" ,JSON.stringify(addedToCartGoods))
  
  console.log(JSON.parse(localStorage.getItem("addedToCartGoods")))
})
}

  

