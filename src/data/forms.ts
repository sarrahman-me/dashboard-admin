const formRegister = [
  {
    type: "text",
    label: "Nama",
    name: "nama",
    placeholder: "Jhon Doe",
  },
  {
    type: "email",
    label: "Email",
    name: "email",
    placeholder: "contoh@email.com",
  },
  {
    type: "number",
    label: "Whatsapp",
    name: "whatsapp",
    placeholder: "08123456789",
  },
  {
    type: "password",
    label: "Password",
    name: "password",
    placeholder: "******",
  },
];

const formVerifyEmail = [
  {
    type: "number",
    label: "Kode verifikasi",
    name: "code",
    placeholder: "* * * * *",
    variant: "standard"
  },
];

const formLogin = [
  {
    type: "text",
    label: "Akun",
    name: "akun",
    placeholder: "Email atau Whatsapp",
  },
  {
    type: "password",
    label: "Password",
    name: "password",
    placeholder: "******",
  },
];

const ukuranLantai = [
  "20x20",
  "25x25",
  "30x30",
  "40x40",
  "50x50",
  "60x60",
  "80x80",
];

const ukuranDinding = ["25x20", "25x40", "25x50", "30x60", "60x120"];

const kalkulatorForm = [
  {
    name: "tipe",
    label: "Tipe",
    type: "select",
    list: ["Lantai", "Dinding"],
    placeholder: "pilih tipe",
  },
  {
    name: "ukuran",
    label: "Ukuran",
    type: "select",
    list: ukuranLantai.concat(ukuranDinding),
    placeholder: "pilih ukuran",
  },
  {
    name: "isi",
    label: "Isi per dus",
    type: "number",
    placeholder: "opsional",
  },
  {
    name: "panjang",
    label: "Panjang",
    type: "number",
  },
  {
    name: "lebar",
    label: "Lebar",
    type: "number",
  },
  {
    name: "tinggi",
    label: "Tinggi",
    type: "number",
  },
];

export { formRegister, formVerifyEmail, formLogin, kalkulatorForm };
