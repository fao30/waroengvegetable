function sort(barang) {
  let nama = [];
  let harga = [];
  let flag = false;
  let count = {};

  for (let i = 0; i < barang.length; i++) {
    if (count[barang[i].Vegetable.name] == undefined) {
      count[barang[i].Vegetable.name] = 1;
    } else {
      count[barang[i].Vegetable.name]++;
    }
    flag = false;
    // nama.push(barang[i].Vegetable.name);
    if (i == 0) {
      nama.push(barang[i].Vegetable.name);
      harga.push(barang[i].Vegetable.price);
    } else {
      for (let j = 0; j < nama.length; j++) {
        if (barang[i].Vegetable.name == nama[j]) {
          flag = true;
        }
      }
      if (flag == false) {
        nama.push(barang[i].Vegetable.name);
        harga.push(barang[i].Vegetable.price);
      }
    }
  }
  let obj = {
    nama,
    harga,
    count,
  };

  return obj;
}

module.exports = sort;
