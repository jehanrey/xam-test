import { FC, InputHTMLAttributes } from "react";

type Props = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange" | "placeholder" | "className"
> & {
  error?: boolean;
};

const Input: FC<Props> = ({ error, className, ...rest }) => {
  const styles = `
    ${className}
    group
    p-1
    w-full
    border
    ${error ? "border-rose-600" : "border-gray-500"}
    focus:outline-none
    focus:border-gray-600
    focus:ring-1
    focus:ring-gray-600
  `;
  return <input className={styles} autoComplete="x-autocomplete" {...rest} />;
};

export default Input;
