class ProductList{
    constructor(container='.products'){
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();//вывод товаров на страницу
        this.sumAllPrice(); // вывод в консоль суммарную цену всех товаров
    }
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }
    
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
             block.insertAdjacentHTML("beforeend",item.render());
        }
    }

    sumAllPrice(){
        let sum = null;
        for(let product of this.goods){
            const item = new ProductItem(product);
            sum += item.price;
        }
        console.log (sum);
    }
}

class ProductItem{
    constructor(product,img='https://via.placeholder.com/200x150'){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render(){
           return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

class ProductInCart {
    addProduct() {} // по нажатию кнопки "купить" нужно будет добавлять продукт в корзину
}

class Cart{
    renderCart(){}  // нужно будет отображать корзину и элементы в ней
}

let list = new ProductList();



