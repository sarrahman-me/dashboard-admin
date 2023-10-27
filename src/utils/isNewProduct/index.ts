// Fungsi untuk memeriksa apakah barang baru
const isNewProduct = (date: string) => {
  const createdAt = new Date(date);
  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 30); // Kurangi 30 hari dari tanggal saat ini

  return createdAt >= oneWeekAgo;
};

export default isNewProduct;
