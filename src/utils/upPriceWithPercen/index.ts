const upPriceWithPercen = (harga: number, persen: number) => {
  return Number(harga) + Number((harga * persen) / 100);
};

export default upPriceWithPercen;
