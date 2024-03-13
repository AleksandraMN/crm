
import createRow from './createModule.js';


export const renderGoods = (data, tableBody, count) => {
  const tableList = data.map(createRow);
  tableBody.append(...tableList);
  return tableList;
};

