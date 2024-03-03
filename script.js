'use strict';

const goods = `
[
  {
    "id": 1,
    "title": "Смартфон Xiaomi 11T 8/128GB",
    "price": 27000,
    "description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
    "category": "mobile-phone",
    "discont": false,
    "count": 3,
    "units": "шт",
    "images": {
      "small": "img/smrtxiaomi11t-m.jpg",
      "big": "img/smrtxiaomi11t-b.jpg"
    }
  },
  {
    "id": 2,
    "title": "Радиоуправляемый автомобиль Cheetan",
    "price": 4000,
    "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
    "category": "toys",
    "discont": 5,
    "count": 1,
    "units": "шт",
    "images": {
      "small": "img/cheetancar-m.jpg",
      "big": "img/cheetancar-b.jpg"
    }
  },
  {
    "id": 3,
    "title": "ТВ приставка MECOOL KI",
    "price": 12400,
    "description": "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
    "category": "tv-box",
    "discont": 15,
    "count": 4,
    "units": "шт",
    "images": {
      "small": "img/tvboxmecool-m.jpg",
      "big": "img/tvboxmecool-b.jpg"
    }
  },
  {
    "id": 4,
    "title": "Витая пара PROConnect 01-0043-3-25",
    "price": 22,
    "description": "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
    "category": "cables",
    "discont": false,
    "count": 420,
    "units": "v",
    "images": {
      "small": "img/lan_proconnect43-3-25.jpg",
      "big": "img/lan_proconnect43-3-25-b.jpg"
    }
  }
]`;

const overlayModal = document.querySelector('.overlay__modal');
const tableBody = document.querySelector('.table__body');
const modalTitle = document.querySelector('.modal__title');
const modalForm = document.querySelector('.modal__form');
const modalCheckbox = document.querySelector('.modal__checkbox');
const modalInputDiscount = document.querySelector('.modal__input_discount');
const overlay = document.querySelector('.overlay');
const btnPanelAddGoods = document.querySelector('.panel__add-goods');
const btnModalClose = document.querySelector('.modal__close');

overlay.classList.toggle('active');
console.log(overlay);

const data = JSON.parse(goods);
console.log(data);

const createRow = (obj) => {
  const trEl = document.createElement('tr');
  const td1 = document.createElement('td');
  td1.className = 'table__cell';
  td1.textContent = obj.id;
  trEl.appendChild(td1);

  const td2 = document.createElement('td');
  td2.classList.add('table__cell', 'table__cell_left', 'table__cell_name');
  td2.setAttribute('data-id', obj.id);
  td2.textContent = obj.title;
  const span = document.createElement('span');
  span.classList.add('table__cell-id');
  span.textContent = 'id: ' + obj.id;
  td2.prepend(span);
  trEl.appendChild(td2);

  const td3 = document.createElement('td');
  td3.classList.add('table__cell', 'table__cell_left');
  td3.textContent = obj.category;
  trEl.appendChild(td3);

  const td4 = document.createElement('td');
  td4.classList.add('table__cell');
  td4.textContent = obj.units;
  trEl.appendChild(td4);

  const td5 = document.createElement('td');
  td5.classList.add('table__cell');
  td5.textContent = obj.count;
  trEl.appendChild(td5);

  const td6 = document.createElement('td');
  td6.classList.add('table__cell');
  td6.textContent = '$' + (obj.price - (obj.price / 100 * obj.discont));
  trEl.appendChild(td6);

  const td7 = document.createElement('td');
  td7.classList.add('table__cell');
  td7.textContent = '$' + ((obj.price - (obj.price / 100 * obj.discont)) * obj.count);
  trEl.appendChild(td7);

  const td8 = document.createElement('td');
  td8.classList.add('table__cell', 'table__cell_btn-wrapper');
  const btn1 = document.createElement('button');
  btn1.classList.add('table__btn', 'table__btn_pic');
  td8.append(btn1);
  const btn2 = document.createElement('button');
  btn2.classList.add('table__btn', 'table__btn_edit');
  td8.append(btn2);
  const btn3 = document.createElement('button');
  btn3.classList.add('table__btn', 'table__btn_del');
  td8.append(btn3);
  trEl.appendChild(td8);

  return trEl;
};

const renderGoods = (arr) => {
  arr.forEach(obj => {
    tableBody.append(createRow(obj));
})
};

renderGoods(data);

btnPanelAddGoods.addEventListener('click', () => {
  overlay.classList.add('active');
});

btnModalClose.addEventListener('click', () => {
  overlay.classList.remove('active');
});

overlay.addEventListener('click', event => {
  overlay.classList.remove('active');
});

overlayModal.addEventListener('click', event => {
  event.stopPropagation();
});
