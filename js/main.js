/*$(function(){
   // $.simpleTicker($("#demo"),{'effectType':'fade'});
     //$.simpleTicker($("#ticker-roll"),{'effectType':'roll'});
     //$.simpleTicker($("#demo"),{'effectType':'slide'});
     //$.simpleTicker($("#demo"),{'effectType':'fade'});
});
$.simpleTicker($("#demo"),{
    speed : 1000,
    delay : 3000,
    easing : 'swing',
    effectType : 'slide'
});*/
const productsDOM = document.querySelector('.products-center')
const cartItem = document.querySelector('.cart-items')
const cartTotal = document.querySelector('.cart-total')
const cartContent = document.querySelector('.cart-content')
const cartDOM = document.querySelector('.cart')
const cartOverlay = document.querySelector('.cart-overlay')
const clearCartButton = document.querySelector('.clear-cart')

let cart = []

class Product {
    async getProducts() {
        try {
            const result = await fetch('product.json')
            const data = await result.json()

            let products = data.items
            products = products.map((item) => {
                const id = item.id
                const type = item.type
                const title = item.title
                const price = item.price
                const image = item.image
                return {title, type, id, image, price}
            })
            return products
        } catch (err) {
            console.log(err)
        }
    }
}

class View {
    displayProducts(products) {
        let result = ''
        products.forEach((item) => {
            result += ` <div class="col-12 col-md-4 col-lg-3 mt-4">
                <div class="card position-relative content-card custom-content-card">
                    <span class="position-absolute card-title-style rounded text-white">${item.type}</span>
                    <span class="badge badge-danger position-absolute new-post-badge  rounded text-white">${item.price}</span>
                    <img src=${item.image} class="card-img-top">
                    <div class="card-body content-card">
                    <button class="bag-btn" data-id=${item.id}>
                    خرید دوره
</button>
                        <a href="#">${item.title}</a>
                        <span class="float-left mt-1">2 فروردین 1399</span>
                    </div>
                    <div class="card-footer p-1 text-center custom-card-footer">
                        <ul class="list-inline p-0 m-0 post-meta">
                            <li class="list-inline-item"><span class="text-danger"><i class="material-icons ml-1">file_copy
</i>رایگان</span></li>
                            <li class="list-inline-item">45<i class="material-icons mr-1">comment</i></li>
                            <li class="list-inline-item">45<i class="material-icons mr-1">visibility</i></li>
                            <li class="list-inline-item">12<i class="material-icons mr-1">thumb_up_alt</i></li>
                        </ul>
                    </div>
                </div>
            </div>
`
        })
        productsDOM.innerHTML = result
    }

    getCartButtons() {
        const buttons = [...document.querySelectorAll('.bag-btn')]
        buttons.forEach((item) => {
            let id = item.dataset.id

            item.addEventListener('click', (event) => {
                let cartItem = {...Storage.getProduct(id), amount: 1}
                cart = [...cart, cartItem]
                Storage.saveCart(cart)

                this.setCartValues(cart)

                this.addCartItem(cartItem)

            })
        })
    }

    function

    setCartValues(cart) {
        let totalPrice = 0
        let totalItems = 0
        cart.map((item) => {
            totalPrice = totalPrice + item.price * item.amount
            totalItems = totalItems + item.amount
        })
        cartTotal.innerText = totalPrice
        cartItem.innerText = totalItems

        /*console.log(cartTotal, cartItem)*/
    }

    addCartItem(item) {
        const div = document.createElement('div')
        div.classList.add('cart-item')

        div.innerHTML = `<img class="shop-sm-image p-2" src="${item.image}" alt="${item.image}">
                                        
                                        <span>${item.title}</span>
                                        <span>${item.price}</span>
                                        <span class="remove-item" data-id=${item.id}>
                                        حذف
                                        </span>
                                    `
        cartContent.appendChild(div)
    }

    initApp() {
        cart = Storage.getCart()
        this.setCartValues(cart)
        this.populate(cart)
    }

    populate(cart) {
        cart.forEach((item) => {
            return this.addCartItem(item)
        })
    }
    cartProcess(){
        clearCartButton.addEventListener('click', () => {
            this.clearCart()
        })
        cartContent.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item')) {
                let removeItem = event.target
                let id = removeItem.dataset.id

                cartContent.removeChild(removeItem.parentElement.parentElement)
                this.removeProduct(id)
            }
        })
    }
    clearCart(){
        let cartItems = cart.map((item) => {
            return item.id
        })
        cartItems.forEach((item) =>{
            return this.removeProduct(item)
        })

        while (cartContent.children.length > 0){
            cartContent.removeChild(cartContent.children[0])
        }
        /*console.log(cartItem)*/
    }

    removeProduct(id){
       cart = cart.filter((item) => {
           return item.id !== id
        })

        this.setCartValues(cart)
        Storage.saveCart(cart)
    }
}


class Storage {
    static saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products))
    }

    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'))
        return products.find((item) => item.id == id)

    }

    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    static getCart() {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart'))
            : []
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const view = new View()
    const product = new Product()

    view.initApp()
    product
        .getProducts()
        .then((data) => {
        view.displayProducts(data)
        Storage.saveProducts(data)
    }).then(() => {
        view.getCartButtons()
        view.cartProcess()
    })
})