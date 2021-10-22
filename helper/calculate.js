function calculate(total) {
  let hitung = 0;
  total.map((e) => {
    hitung += e.Vegetable.price;
  });
  return hitung;
}

module.exports = calculate;
