'use strict'

const text = document.querySelector('.text1');
const button = document.querySelector('.replace');

button.addEventListener('click', () => text.innerText = text.innerText.replace(/'/gm,'"')
);

const text2 = document.querySelector('.text2');
const button2 = document.querySelector('.replace2');

button2.addEventListener('click', () => text2.innerText = text2.innerText.replace(/\B'/gm,'"')
);

document.querySelector('.btn-submit').addEventListener('click', () => {
const inputName = document.querySelector('.inputName');
const inputPhone = document.querySelector('.inputPhone');
const inputEmail = document.querySelector('.inputEmail');
const inputText = document.querySelector('.inputText');    
// Если блок с ошибкой уже существует, то удаляем его и для всех инпутов с красной рамкой возвращаем стандартный цвет
    if (document.querySelectorAll('.error')) {
        document.querySelectorAll('.error').forEach(el => el.remove())
        document.querySelectorAll('.inputs').forEach(el => {
            if (el.style.borderColor == 'red') {
            el.style.borderColor = 'initial'
        }
    })
    }



    if (!inputName.value.match(/^[a-z]+$/ig)) {
        inputName.style.borderColor = 'red';
        inputName.insertAdjacentHTML('afterend',`<div class='error'>Имя должно содержать только буквы.</div>`)
    }
    if (!inputPhone.value.match(/^\+\d{1}\(\d{3}\)\d{3}\-\d{4}$/ig)) {
        inputPhone.style.borderColor = 'red';
        inputPhone.insertAdjacentHTML('afterend',`<div class='error'>Телефон должен быть вида +7(000)000-0000</div>`)
    }
    if (!inputEmail.value.match(/^([a-z0-9\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/ig)) {
        inputEmail.style.borderColor = 'red';
        inputEmail.insertAdjacentHTML('afterend',`<div class='error'>E-mail должен быть вида mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.</div>`)
    }
    // Возможен ли случай, при котором нижнее условие будет выполняться?
    if (!inputText.value.match(/\w*/ig)) {
        inputText.style.borderColor = 'red';
        inputText.insertAdjacentHTML('afterend',`<div class='error'>?</div>`)
    }
}

)