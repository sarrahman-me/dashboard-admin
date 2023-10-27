"use client";
import { GetDataApi } from "@/src/utils";
import { useState } from "react";
import { Container, Textfield, Typography } from "../../atoms";
import { FaSearchLocation } from "react-icons/fa";
import { LoadingAnimation } from "../../template";
import { Notify } from "notiflix";

interface TextfieldLocationProps {
  setValue: (value: { latlang: string; nama: any }) => void;
  name: string;
  label: string;
}

const TextfieldLocation = ({
  setValue,
  name,
  label,
}: TextfieldLocationProps) => {
  // query adalah input dari pencarian user

  const [query, setQuery] = useState("");

  //   daftar lokasi hasil dari pencarian pengguna

  const [locations, setLocations] = useState([] as any);
  const [loading, setLoading] = useState(false);

  //   fungsi pencarian lokasi

  const searchLocation = async () => {
    setLoading(true);
    try {
      const response = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/maps/geocoding/search/${query}`
      );

      if (response.success) {
        setLocations(response.data);
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
    <div className="space-y-1">
      <Textfield
        icon={<FaSearchLocation />}
        onClickIcon={searchLocation}
        fullWidth
        value={query}
        label={label}
        placeholder="cari alamat dan klik ikon ->"
        name={name}
        onChange={setQuery}
      />

      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="space-y-1 max-h-48 overflow-scroll">
          {locations.map((location: any, i: any) => (
            <Container
              key={i}
              onClick={() => {
                setLocations([]);
                setQuery(location.display_name);
                setValue({
                  latlang: `${location.lat}, ${location.lon}`,
                  nama: location.display_name,
                });
              }}
              otherClass="p-2 cursor-pointer hover:bg-gray-50 hover:border-black"
            >
              <div>
                <p className="text-indigo-500 text-xs">{location.type}</p>
                <Typography>{location.display_name}</Typography>
                <Typography variant="helper" color="secondary">
                  {location.class}
                </Typography>
              </div>
            </Container>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextfieldLocation;
