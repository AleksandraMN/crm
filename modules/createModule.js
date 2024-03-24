

const createRow = (obj, count, vendorCodeId) => {
  const trEl = document.createElement('tr');
  const td1 = document.createElement('td');
  td1.className = 'table__cell';
  td1.textContent = count + 1;
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
  td6.textContent = '$' + (obj.price -
    (obj.price / 100 * obj.discount_count || obj.discont || 0));
  trEl.appendChild(td6);

  const td7 = document.createElement('td');
  td7.classList.add('table__cell');
  td7.textContent = '$' + ((obj.price -
    (obj.price / 100 * obj.discount_count || obj.discont || 0)) * obj.count);
  trEl.appendChild(td7);

  const td8 = document.createElement('td');
  td8.classList.add('table__cell', 'table__cell_btn-wrapper');
  const btn1 = document.createElement('button');
  btn1.classList.add('table__btn', 'table__btn_pic');
  btn1.setAttribute('data-pic', `https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309689.jpg?w=1380&t=st=1711245006~exp=1711245606~hmac=46039465afddd59624aad2bc6f2eef82013992d65cbbe944687f830b0cb775bf`);
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

export default createRow;
