"use strict"
/**
 * Сложение двух чисел
 * @param {number} a первое слагаемое
 * @param {number} b второе слагаемое
 * @returns Сумма двух чисел
 */
function sum(a,b) {
  return a+b
}

/**
 * Вычитание двух чисел
 * @param {number} a Уменьшаемое
 * @param {number} b Вычитаемое
 * @returns Разность
 */
 function sub(a,b) {
    return a-b
  }

  /**
 * Произведение двух чисел
 * @param {number} a первый множитель
 * @param {number} b второй множитель
 * @returns Произведение
 */
function mult(a,b) {
    return a*b
  }


  /**
 * Деление двух чисел
 * @param {number} a Делимое
 * @param {number} b Делитель
 * @returns Частное
 */
function div(a,b) {
    return a/b
  }
/**
 * Осуществляет выбранную математическую операцию
 * @param {number} arg1 первое число
 * @param {number} arg2 второе число
 * @param {string} operation название операции на русском или символом
 * @returns Результат операции
 */
  function mathOperation(arg1,arg2,operation) {
      switch (operation) {
          case "сложение" && "+":
            return sum(arg1,arg2);
          case "вычитание" && "-":
            return sub(arg1,arg2);
          case "умножение" && "*":
            return mult(arg1,arg2);
          case "деление" && "/":
            return div(arg1,arg2);
          default:
              alert("Введите корректное название операции")  
      }
  }

 let oper = prompt("Введите название операции");
 let x = Number(prompt("Введите первое число"));
 let y = Number(prompt("Введите второе число"));
 console.log(mathOperation(x,y,oper))


 // Задание 6**

 let money = prompt("Введите количество денег, которые вы хотите положить на счет");
 if (isNaN(Number(money))) {
   alert ("Введите число!")
 }
switch (money.charAt(money.length-1)) {
  case "0": 
  case "5":
  case "6":
  case "7":
  case "8":
  case "9":
    alert(`Ваша сумма в ${money} рублей успешно зачислена.`);
    break;
  case "1":
    alert(`Ваша сумма в ${money} рубль успешно зачислена.`);
    break;
  case "2":
  case "3":
  case "4":
    alert(`Ваша сумма в ${money} рубля успешно зачислена.`);
    break;
}
