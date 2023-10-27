"use client";
import { Button, Container, ListData, Textfield } from "../../atoms";
import { useState } from "react";
import { TextfieldLocation } from "../../molecules";
import { GetDataApi, formatCurrency } from "@/src/utils";
import { Notify } from "notiflix";

const OngkirCalculator = () => {
  const [distanceMatrix, setDistanceMatrix] = useState({} as any);
  const [ongkos, setOngkos] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lokasi, setLokasi] = useState({
    asal: {
      latlang: "",
      nama: "",
    },
    tujuan: {
      latlang: "",
      nama: "",
    },
  });

  const calculateDistance = async () => {
    setLoading(true);
    try {
      const response = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/maps/distance-matrix?origins=${lokasi.asal.latlang}&destinations=${lokasi.tujuan.latlang}`
      );

      if (response.success) {
        const jarak = response.data.distance.value / 1000;

        const biaya = jarak * ongkos;

        setDistanceMatrix({
          ...response.data,
          biaya,
        });
        setLoading(false);
      } else {
        Notify.failure("alamat tidak ditemukan");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 space-y-4">
        <Textfield
          type="number"
          fullWidth
          label="ongkos (Rp)"
          placeholder="ongkos per km"
          name="ongkos"
          onChange={setOngkos}
        />

        <TextfieldLocation
          setValue={({ latlang, nama }) =>
            setLokasi({
              ...lokasi,
              asal: {
                latlang,
                nama,
              },
            })
          }
          name={"origin"}
          label={"Alamat asal"}
        />

        <TextfieldLocation
          setValue={({ latlang, nama }) =>
            setLokasi({
              ...lokasi,
              tujuan: {
                latlang,
                nama,
              },
            })
          }
          name={"destination"}
          label={"Alamat tujuan"}
        />

        <Button
          loading={loading}
          onClick={calculateDistance}
          disabled={!lokasi.asal.latlang || !lokasi.tujuan.latlang || !ongkos}
        >
          Hitung jarak
        </Button>
      </div>

      <div className="flex-1 flex m-2">
        <Container otherClass="w-full space-y-2">
          <div className="border-b space-y-2 px-4 py-2">
            <ListData label={"Asal"} value={lokasi.asal.nama} />
            <ListData label={"Tujuan"} value={lokasi.tujuan.nama} />
          </div>
          <div className="border-b space-y-2 px-4 py-2">
            <ListData
              label={"Ongkos Kirim"}
              value={formatCurrency(distanceMatrix?.biaya || 0)}
            />
            <ListData
              label={"Perkiraan Jarak"}
              value={distanceMatrix?.distance?.text}
            />
            <ListData
              label={"Estimasi waktu"}
              value={distanceMatrix?.duration?.text}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default OngkirCalculator;
