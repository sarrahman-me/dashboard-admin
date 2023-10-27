import Label from "../Label";

/**
 * Komponen Radio Group button yang digunakan untuk memilih satu dari beberapa opsi.
 *
 * @param {string} label - Label yang mendeskripsikan pilihan.
 * @param {string} name - Nama grup Radio button.
 * @param {string[]} options - Daftar pilihan yang akan ditampilkan dalam Radio Group.
 * @param {string} selectedValue - Nilai Radio button yang dipilih.
 * @param {function} onRadioChange - Fungsi yang dipanggil saat Radio button dipilih.
 */

interface RadioGroupProps {
  label: string;
  options: string[];
  name: string;
  selectedValue: string;
  onRadioChange: (item: string) => void;
}

const RadioGroup = ({
  label,
  name,
  options,
  onRadioChange,
  selectedValue,
}: RadioGroupProps) => {
  // CSS classes untuk styling Radio buttons

  const classNameInput =
    "w-4 h-4 text-indigo-600 bg-white dark:bg-slate-800 border-indigo-600 dark:border-indigo-600";

  return (
    <div>
      <Label>{label}</Label>
      {options.map((item, i) => (
        <div key={i} className="flex items-center mb-2">
          <input
            id={item}
            type="radio"
            value={item}
            name={name}
            className={classNameInput}
            checked={selectedValue === item}
            onChange={() => onRadioChange(item)}
          />
          <Label otherClass="ml-2" htmlFor={item}>
            {item}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
