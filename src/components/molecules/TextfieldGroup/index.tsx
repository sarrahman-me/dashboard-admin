import { Textfield, Select, Autocomplete } from "../../atoms";

/**
 * Komponen TextfieldGroup digunakan untuk membuat grup elemen form berdasarkan definisi yang diberikan.
 *
 * @param {Object} forms - Definisi elemen-elemen form yang akan ditampilkan dalam grup seperti contoh dibawah component.
 * @param {Object} data - Data form yang dikelola oleh komponen yang lebih tinggi.
 * @param {function} setData - Fungsi yang digunakan untuk menyimpan data form.
 * @param {Object} error - Pesan kesalahan validasi untuk setiap elemen form yang dikirimkan dari server.
 */

interface TextfieldGroupProps {
  forms: {
    name: string;
    label: string;
    type:
      | "text"
      | "number"
      | "password"
      | "date"
      | "email"
      | "tel"
      | "select"
      | "autocomplete"
      | string;
    list?: any[];
    placeholder?: string;
    disabled?: boolean;
    variant?: "outlined" | "standard" | string;
    keyValue?: {
      key: string;
      value: string;
    };
  }[];
  setData: ({}: any) => void;
  data: any;
  error?: {
    fields: any;
  };
}

const TextfieldGroup = ({
  forms,
  data,
  setData,
  error,
}: TextfieldGroupProps) => {
  return (
    <div className="space-y-3">
      {forms.map((form, i) => {
        /**
         * mendefinisikan select component
         */

        if (form.type === "select") {
          return (
            <Select
              key={i}
              placeholder={form.placeholder}
              label={form.label}
              error={(error && error.fields && error.fields[form.name]) || ""}
              value={data[form.name]}
              setValue={(value) =>
                setData({
                  ...data,
                  [form.name]: value,
                })
              }
              lists={form.list || []}
            />
          );
        } else if (form.type === "autocomplete") {
          /**
           * mendefinisikan autocomplete component
           */

          return (
            <Autocomplete
              key={i}
              label={form.label}
              error={(error && error.fields && error.fields[form.name]) || ""}
              value={data[form.name]}
              setValue={(value) =>
                setData({
                  ...data,
                  [form.name]: value,
                })
              }
              placeholder={form.placeholder}
              lists={form.list}
              keyValue={form.keyValue || { key: "", value: "" }}
            />
          );
        } else {
          /**
           * mendefinisikan textfield component
           */

          return (
            <Textfield
              key={i}
              placeholder={form.placeholder}
              fullWidth
              value={data[form.name] || ""}
              variant={form.variant || "outlined"}
              name={form.name}
              error={(error && error.fields && error.fields[form.name]) || ""}
              type={form.type || "text"}
              label={form.label}
              onChange={(value) =>
                setData({
                  ...data,
                  [form.name]: value,
                })
              }
            />
          );
        }
      })}
    </div>
  );
};

export default TextfieldGroup;

/**
 * 
 * sebagai contoh untuk membuat beberapa component textfield, select dan autocomplete
 * 
 * forms =  
 * [
      {
        type: "password",
        label: "Password",
        name: "password",
        placeholder: "******",
      },
      {
        type: "select",
        label: "Kota",
        name: "kota",
        placeholder: "Pilih kota",
        list: ["samarinda", "balikpapan", "bontang"],
      },
      {
        type: "autocomplete",
        label: "Nama",
        name: "cari_nama",
        placeholder: "Pilih Nama",
        list: [
          {
            id: 1,
            name: "rahman"
          },
          {
            id: 2,
            name: "sarah"
          }
        ],
        keyValue: {
          key: "id",
          value: "name",
        },
      },
  ];
  
 */
