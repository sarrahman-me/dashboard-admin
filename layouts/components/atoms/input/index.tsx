export default function Input(props: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoFocus?: boolean;
  value?: any;
  onChange?: (e: any) => void;
  error?: string;
  optional?: boolean;
  onKeyDown?: any;
}) {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.label} {props.optional ? "(opsional)" : ""}
      </label>
      <input
        id={props.name}
        type={props.type || "text"}
        onKeyDown={props.onKeyDown}
        name={props.name}
        autoComplete="off"
        autoFocus={props.autoFocus || false}
        value={props.value}
        onChange={props.onChange}
        className={`bg-gray-50 border ${
          props.error ? "border-red-500" : "border-gray-300"
        } text-gray-900 bg-white sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500`}
        placeholder={props.placeholder}
      />
      {props.error && (
        <span className="text-red-500 text-sm">{props.error}</span>
      )}
    </div>
  );
}
