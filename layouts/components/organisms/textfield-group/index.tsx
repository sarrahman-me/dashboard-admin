import { Input, SelectApi } from "../../atoms";

export default function TextfieldGroup(props: {
  form: any[];
  setData: (data: any) => void;
  data: any;
  error?: any;
}) {
  return (
    <div>
      {props.form.map((input, i) => {
        if (input.type === "select-api") {
          return (
            <div key={i} className="my-5">
              <SelectApi
                apiUrl={input.apiUrl}
                label={input.label}
                useNameForValue={input.useName}
                error={
                  (props.error &&
                    props.error.fields &&
                    props.error.fields[input.name]) ||
                  ""
                }
                keyValue={input.keyValue}
                value={props.data[input.name] || ""}
                onChange={(value) =>
                  props.setData({
                    ...props.data,
                    [input.name]: value,
                  })
                }
              />
            </div>
          );
        } else {
          return (
            <div key={i} className="my-5">
              <Input
                label={input.label}
                optional={input.optional || false}
                name={input.name}
                autoFocus={input.autoFocus || false}
                placeholder={input.placeholder || ""}
                error={
                  (props.error &&
                    props.error.fields &&
                    props.error.fields[input.name]) ||
                  ""
                }
                type={input.type || "text"}
                value={props.data[input.name] || ""}
                onChange={(event) =>
                  props.setData({
                    ...props.data,
                    [input.name]: event.target.value,
                  })
                }
              />
            </div>
          );
        }
      })}
    </div>
  );
}
