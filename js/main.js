const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                 this.goods = [...data];
                 this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts(){
      
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
//            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class Basket {
    constructor(){
        this.ProductsListInBasket = [];
        document.querySelector('.btn-cart').insertAdjacentHTML('beforeend', this.render());    
    this.addGoods()
        .then(data => {
            this.ProductsListInBasket = data.contents;
            for (let product of data.contents){
                const productObj = new ElemBasket(product)
                document.querySelector('.basket').insertAdjacentHTML('beforeend', productObj.render());
            }
        });
        
    }
    addGoods() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    removeGoods() {
    
    }
    changeGoods(givenId, list) {
        // 1. По клику получить переменную с id товара
        // 2. Найти по id товар в list.goods
        // 3. Добавить в список товаров в корзине новый товар
        // 4. Создать и добавить в корзину разметку товара.
        let newProductInBasket = list.goods.find(
            product => product.id === givenId);
        // console.log(newProductInBasket);
        ProductsListInBasket.push(newProductInBasket);
        const newProduct = new ElemBasket(newProductInBasket);
        document.querySelector('.basket').insertAdjacentHTML('beforeend', newProduct.render());


    }
    
    render(){
        return `<div class="basket" ></div>`
    }
}

class ElemBasket {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.id = product.id_product;
        this.price = product.price;
        this.title = product.product_name;
        this.quantity = product.quantity;
        this.img = img;
    }
    render(){
        return  `<div class="ElemBasket" data-id="${this.id}">
        <img src="${this.img}" alt="Some img">
        <div class="ElemBasketDesc">
            <h3>${this.title}</h3>
            <p>Цена ${this.price} $</p>
            <p>Кол-во товара ${this.quantity} </p>
            <i class="fas fa-times"></i>
        </div>
    </div>`
    }

}

let list = new ProductsList();
const basket = new Basket();
console.log(list.allProducts);

document.querySelector('.btn-cart').addEventListener('click', 
event => event.target.lastElementChild.classList.toggle('visible'));

document.querySelectorAll('.buy-btn').forEach(
    el => el.addEventListener('click',event => basket.changeGoods(event.target.parentNode.parentNode.dataset.id, list)));






// document.querySelectorAll('.fa-times').forEach(el => el.addEventListener('click',event => {
//     event.stopPropagation();
//     event.target.remove()}
// ));

// Для метода removeGoods:
// 1. При нажатии на элемент fa-times нужно удалять объект из массива,
// получая event.target.parentNode.parentNode.dataset.id
// 2. Затем нужно удалить ElemBasket, используя поиск по тому же id 

