
export const getTotalSum = (data, cmsTotalPrice) => {
  const totalSum = data.reduce((acc, item, arr) =>
    acc + ((item.price - (item.price / 100 *
      item.discount_count || item.discont || 0)) * item.count), 0);
  return cmsTotalPrice.textContent = '$' + totalSum;
};

export const getRandom = (min, max) => {
  const number = Math.floor(Math.random() * (max - min + 1) + min);
  return number;
};

