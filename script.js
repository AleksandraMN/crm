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

const overlay = document.querySelector('.overlay');
const overlayModal = document.querySelector('.overlay__modal');
const tableBody = document.querySelector('.table__body');
const modalTitle = document.querySelector('.modal__title');

const modalForm = document.querySelector('.modal__form');
const modalCheckbox = document.querySelector('.modal__checkbox');
const modalInputDiscount = document.querySelector('.modal__input_discount');
const btnPanelAddGoods = document.querySelector('.panel__add-goods');
const btnModalClose = document.querySelector('.modal__close');
const modalInputs = document.querySelectorAll('.modal__input');
const price = document.querySelector('#price');
const countInput = document.querySelector('#count');
const vendorCodeId = document.querySelector('.vendor-code__id');
const modalTotalPrice = document.querySelector('.modal__total-price');
const cmsTotalPrice = document.querySelector('.cms__total-price');

let count = 1; // счетчик порядкового номера товаров


overlay.classList.toggle('active'); // скрыть модальное окно
console.log(overlay);

const data = JSON.parse(goods); // преобразование JSON формата в массив объектов
console.log(data);

// создание строки в таблице
const createRow = (obj) => {
  const trEl = document.createElement('tr');
  const td1 = document.createElement('td');
  td1.className = 'table__cell';
  td1.textContent = count;
  trEl.appendChild(td1);

  const td2 = document.createElement('td');
  td2.classList.add('table__cell', 'table__cell_left', 'table__cell_name');
  td2.setAttribute('data-id', obj.id);
  td2.textContent = obj.title || obj.name;
  const span = document.createElement('span');
  span.classList.add('table__cell-id');
  span.textContent = 'id: ' + obj.id || vendorCodeId.textContent;
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
  td6.textContent = '$' + (obj.price - (obj.price / 100 * obj.discount_count || obj.discont || 0));
  trEl.appendChild(td6);

  const td7 = document.createElement('td');
  td7.classList.add('table__cell');
  td7.textContent = '$' + ((obj.price - (obj.price / 100 * obj.discount_count || obj.discont || 0)) * obj.count);
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

  count++;

  return trEl;
};

// создание таблицы
const renderGoods = (arr) => {
  arr.forEach(obj => {
    tableBody.append(createRow(obj));
  })
};
renderGoods(data);

// функция подсчета итоговой суммы вверху таблицы
const getTotalSum = (data) => {
const totalSum = data.reduce((acc, item, arr) => {
  return acc + ((item.price - (item.price / 100 * item.discount_count || item.discont || 0)) * item.count);
}, 0);

return cmsTotalPrice.textContent = '$' + totalSum;
};
getTotalSum(data);

// функция генерации случайного числа
const getRandom = (min, max) => {
  const number = Math.floor(Math.random() * (max - min + 1) + min);
  return number;
};

// Открытие модального окна
btnPanelAddGoods.addEventListener('click', () => {
  overlay.classList.add('active');
  const id = getRandom(1, 10000000); // получение случайного id
  vendorCodeId.textContent = id; // присвоение id в модальном окне
  modalTotalPrice.textContent = '$' + 0; // обнуление итоговой суммы модальном окне
});

// закрытие модального окна
overlay.addEventListener('click', e => {
  const target = e.target;
  if (target.closest('.modal__close') ||
    target === overlay) {
    overlay.classList.remove('active');
  }
});

// удаление товара из таблицы и массива товаров
tableBody.addEventListener('click', e => {
  const target = e.target;
  console.log(target.parentElement.parentElement.childNodes[1].dataset.id); // id товара
  const id = target.parentElement.parentElement.childNodes[0].textContent;

  if (target.classList.contains('table__btn_del')) {
    target.closest('tr').remove();

    console.log(id);
    //data.splice(id - 1, 1);
    delete data[id - 1]; // удаление товара привязано к порядковому номеру и индексу в массиве товаров
    //data.splice([...document.querySelectorAll('.button-delete')]
    //  .indexOf(target.parentElement.parentElement.childNodes[1].dataset.id), 1);
    console.log('data', data);
    getTotalSum(data); // расчет итоговой суммы
  }
});


// валидация формы
// Все поля обязательны к заполнению (исключение изображение), с помощью атрибутов в html
// правильный тип полей в html, для текста - text, для чисел - number
const validateForm = () => {
  Array.from(modalInputs).map((element) => {
  element.setAttribute('required', 'true');
});
price.setAttribute('type', 'number');
countInput.setAttribute('type', 'number');
modalInputDiscount.setAttribute('type', 'number');
};
validateForm();


// отправка формы
modalForm.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(e.target);

  console.log(e.target);
  const newGood = Object.fromEntries(formData);
  console.log('newGood', newGood);
  newGood.id = vendorCodeId.textContent; // id присваивается новому товару

  data.push(newGood);
  console.log(data);

  tableBody.append(createRow(newGood)); // заполнение таблицы

  modalForm.reset(); // очистка полей модального окна при нажатии клавиши отправить
  overlay.classList.remove('active'); // закрытие модального окна
  getTotalSum(data);  // пересчет итоговой суммы вверху таблицы при закрытии модального окна
});

// Итоговая стоимость в модальном окне должна правильно высчитываться при смене фокуса
modalForm.addEventListener('change', () => {
  modalTotalPrice.textContent = '$' +
    ((price.value - (price.value / 100 * modalInputDiscount.value)) * countInput.value);
});


//  В форме если поставить чекбокс должен быть разблокирован input с name discount_count
// если чекбокс убрать поле discount_count очищается и блокируется
modalForm.addEventListener('click', e => {
  const target = e.target;

  if (target.type === 'checkbox') {
    if (target.checked === true) {
      modalInputDiscount.disabled = false;
    } else {
      modalInputDiscount.disabled = true;
    }
  }
});



