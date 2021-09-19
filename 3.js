'use strict'

class Hamburger {
    constructor(size,stuffing) { 
        this.size = size;
        this.stuffing = stuffing;
     }
    // addTopping(topping) {    // Добавить добавку }
    // removeTopping(topping) { // Убрать добавку }
    // getToppings(topping) {   // Получить список добавок }
    static getSize() { 
        return document.querySelector('input[name="size"]:checked').value;
          }      // Узнать размер гамбургера 
    static getStuffing() {
    return document.querySelector('input[name="stuffing"]:checked').value;
}          // Узнать начинку гамбургера 
    calculatePrice()  {}      // Узнать цену }
//     calculateCalories() {    // Узнать калорийность }
//   
}

document.querySelector('.calculateButton').addEventListener('click', function(){
    const ham = new Hamburger(Hamburger.getSize,Hamburger.getStuffing);
    alert(ham.size, ham.stuffing)
}
)

/* Как я предполагаю оно должно работать
 По нажатию на кнопку:
 1) получаем значение выбранных опций.
 2) создаем объект с передачей выбранных данных в качестве аргумента для создания свойств
 3) передаем эти свойства в методы для расчета, где все считается
 
Проблемы возникают уже сразу, я не знаю как всё это увязать. К примеру, методы описаны в классе,
но они не будут относится к элементу, с которым мы взаимодействуем (кнопке) */