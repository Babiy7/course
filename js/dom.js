// const container = document.querySelector('.container');

// // create element
// const element = document.createElement('div'),
//    text = document.createTextNode('Created elements');

// // add class
// ['item', 'blue'].forEach(item => element.classList.add(item));

// // add element
// element.appendChild(text);
// document.body.insertAdjacentElement('afterbegin', element);

// // remove element
// document.body.removeChild(element);

// console.log(element);

// const menu = document.querySelector('.menu'),
//    items = document.querySelectorAll('.menu-item'),
//    five = document.createElement('li'),
//    title = document.getElementById('title'),
//    column = document.querySelectorAll('.column'),
//    ad = document.querySelector('.adv'),
//    prom = document.getElementById('prompt'),
//    itemh3 = document.getElementById('item');

// five.classList.add('menu-item');
// five.innerText = 'Пятий пункт';

// items.forEach(item => {
//    item.addEventListener('click', e => {
//       const inner = e.target.innerText;
//       const node = document.createElement('h3');

//       console.log(node);
//       node.innerHTML = inner;

//       prom.appendChild(node);
//    });
// });

// menu.insertBefore(items[2], items[1]);
// menu.appendChild(five);

// document.body.style.background = 'url("img/apple_true.jpg") center no-repeat';

// title.innerText = 'Мы продаем только подлинную технику Apple';

// column[1].removeChild(ad);

// const answer = prompt('Як ви відноситесь до техніки apple?');

// prom.innerText = answer;

//
//
// mobile events
//
//

// touchstart
// touchmove
// touchend
// touchenter
// touchleave
// touchcancel
