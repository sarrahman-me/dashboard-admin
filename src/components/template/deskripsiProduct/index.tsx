import { IconSelect } from "@/layouts/components/molecules";
import { Container, Typography } from "../../atoms";

interface DeskripsiProdukProps {
  barang: {
    ukuran: string;
    kualitas: string;
    motif: string;
    tekstur: string;
    penggunaan_umum: string[];
    area_penggunaan: string[];
  };
}

const DeskripsiProduk = ({ barang }: DeskripsiProdukProps) => {
  return (
    <Container>
      <div className="flex flex-col md:flex-row m-2">
        <div className="text-sm md:text-base space-y-2 md:space-y-3 w-1/2">
          <Typography>Ukuran: {barang.ukuran}</Typography>
          <Typography>Kualitas: {barang.kualitas}</Typography>
          <Typography>Motif: {barang.motif}</Typography>
          <Typography>Tekstur: {barang.tekstur}</Typography>
        </div>

        <div className="w-1/2">
          <div className="my-2">
            <div className="my-2">
              {/* <IconSelect options={barang.penggunaan_umum} /> */}
            </div>
          </div>
          <div className="my-2">
            <div className="my-2">
              {/* <IconSelect options={barang.area_penggunaan} /> */}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DeskripsiProduk;
