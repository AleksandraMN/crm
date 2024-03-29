
import createRow from './createModule.js';
import {renderGoods} from './render.js';
import {getTotalSum, getRandom} from './calculationsModule.js';

const modalControl =
(btnPanelAddGoods, overlay, vendorCodeId, modalTotalPrice) => {
  const openModal = () => {
    overlay.classList.add('active');
  };

  const closeModal = () => {
    overlay.classList.remove('active'); // скрыть модальное окно
  };

  overlay.addEventListener('click', e => { // закрытие модального окна
    const target = e.target;
    if (target.closest('.modal__close') ||
      target === overlay) {
      closeModal();
    }
  });

  btnPanelAddGoods.addEventListener('click', () => {
    openModal();
    const id = getRandom(1, 100000); // получение случайного id
    vendorCodeId.textContent = id; // присвоение id в модальном окне
    modalTotalPrice.textContent = '$' + 0; // обнуление итоговой суммы
  });

  return {
    closeModal,
  };
};

// удаление товара из таблицы и массива товаров
const deleteGoodsModal = (tableBody, data, cmsTotalPrice, count) => {
  tableBody.addEventListener('click', e => {
    const target = e.target;
    const el =
      Number(target.parentElement.parentElement.childNodes[1].dataset.id);

    if (target.classList.contains('table__btn_del')) {
      target.closest('tr').remove();

      for (let i = 0; i < data.length; i++) {
        if (data[i].id === el) {
          data.splice(i, 1);
        }
      }
      while (tableBody.firstChild) { // удаление таблицы
        tableBody.removeChild(tableBody.firstChild);
      }
      renderGoods(data, tableBody, count); // заполнение таблицы
      getTotalSum(data, cmsTotalPrice); // расчет итоговой суммы
      console.log(data);
    }
  });
};

// валидация формы
// Все поля обязательны к заполнению (исключение изображение)
// правильный тип полей в html, для текста - text, для чисел - number
const validateForm = (modalInputs, price, countInput, modalInputDiscount) => {
  Array.from(modalInputs).map((element) => {
    element.setAttribute('required', 'true');
  });
  price.setAttribute('type', 'number');
  countInput.setAttribute('type', 'number');
  modalInputDiscount.setAttribute('type', 'number');
};

// отправка формы
const formControl =
(modalForm, vendorCodeId, closeModal, tableBody, data, modalTotalPrice,
    modalInputDiscount, countInput, price, cmsTotalPrice, count) => {
  modalForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newGood = Object.fromEntries(formData);
    newGood.id = Number(vendorCodeId.textContent); // id
    data.push(newGood);
    tableBody.append(createRow(newGood, count = data.length - 1, vendorCodeId));
    modalForm.reset(); // очистка полей модального окна
    closeModal(); // закрытие модального окна
    getTotalSum(data, cmsTotalPrice); // пересчет итоговой суммы вверху
  });
  // Итог. стоимость в мод окне должна правильно высчитываться при смене фокуса
  modalForm.addEventListener('change', () => {
    modalTotalPrice.textContent = '$' +
      ((price.value - (price.value / 100 * modalInputDiscount.value)) *
      countInput.value);
  });
  // В форме если поставить чекбокс должен быть разблокирован input
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
};

export default {
  modalControl,
  deleteGoodsModal,
  validateForm,
  formControl,
};
