'use strict'

/* Моя основная идея заключается в том, чтобы при клике создавать объект из продукта,
затем создавать массив из этих объектов, на основе массива создавать необходимую таблицу. 
При каждом клике таблица обнуляется и создается заново. Блок по умолчанию visibility:hidden;
При нажатии на иконку корзины меняется на visible.
*/

const buttons = document.querySelectorAll('.add__item_box'); //все кнопки
const productCounter = document.querySelector('.cartCount'); //спан, показывающий кол-во товаров в корзине
let productCounterInSpan = 0; //счетчик количества товаров в спане
const cartDiv = document.createElement('div'); //блок с товарами в корзине
let productsArray = []; // массив из товаров в корзине

// Конструктор для продуктов в корзине 
class productInCart {
    constructor(name, price) {
        this.name = name;
        this.amount = 0;
        this.price = price;
        this.totalPrice = null;
    }
}


buttons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        productCounter.innerText = ++productCounterInSpan;
        let productName = event.target.offsetParent.parentNode.querySelector('.card__item_header').innerText;
        let productPrice = event.target.offsetParent.parentNode.querySelector('.card__item_price').innerText;
        let product = new productInCart(productName, productPrice);
        if (productsArray.length == 0) {  //необходимая проверка для самого первого клика
            productsArray.push(product);
        }
        cartDiv.innerHTML = '';
        productCounter.parentNode.appendChild(cartDiv);
        cartDiv.classList.add("cart_div");
        cartDiv.innerHTML = `<table><thead><tr><th>Название товара</th><th>Количество</th><th>Цена</th><th>Общая цена</th></tr></thead>`;

        
        for (let i=0; i < productsArray.length; i++) {
            //если товар с таким названием уже присутствует, то нужно лишь изменить кол-во и суммарную цену и завершить проверку
            if (productsArray[i].name == product.name) {
                productsArray[i].amount++;
                productsArray[i].totalPrice += Number(productsArray[i].price.replace(/\$/,''));
                break;
                // если такого товара нет, то надо его добавить в массив
            } else if (i == productsArray.length - 1) {
                productsArray.push(product);
                productsArray[productsArray.length-1].amount++;
                productsArray[productsArray.length-1].totalPrice += Number(productsArray[productsArray.length-1].price.replace(/\$/,''));
                break;
            }
        }
        // Здесь идет сборка таблицы на основе массива из продуктов и подсчет окончательной суммы
        let sumAllPrices = null;
        for (let i=0; i < productsArray.length; i++) {
            sumAllPrices += productsArray[i].totalPrice;
            cartDiv.getElementsByTagName('table')[0].innerHTML += `<tr><td class='cartTableEl'>${productsArray[i].name}</td><td class='cartTableEl'>${productsArray[i].amount}</td><td class='cartTableEl'>${productsArray[i].price}</td><td class='cartTableEl'>\$${productsArray[i].totalPrice}</td></tr>`;
        }
        cartDiv.innerHTML += `<br><p class="finalPrice" style='text-align: end;'>Итоговая цена = \$${sumAllPrices}</p>`
    })
})


const shoppingCart = document.querySelector('.shopping_cart')

shoppingCart.addEventListener('click',function() {
cartDiv.classList.toggle('visibility');
})

/* К сожалению, я не знаю как правильно разбить всё на несколько небольших функций, чтобы потом всё работало.
И еще как убрать автоматическую прокрутку к объекту при нажатии на кнопку.
 */ 


