// Fungsi untuk menghitung berapa persen potongannya
const calculateDiscountPercentage = (harga: number, hargaPromo: number) => {
  const potongan = harga - hargaPromo;
  const persentasePotongan = (potongan / harga) * 100;
  return persentasePotongan.toFixed(0);
};

export default calculateDiscountPercentage;
