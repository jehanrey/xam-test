import { FC, PropsWithChildren, ButtonHTMLAttributes } from "react";

type Props = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled" | "onClick" | "type" | "className"
> & {
  primary?: boolean;
  rounded?: boolean;
};

const Button: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  primary = false,
  rounded = true,
  ...rest
}) => {
  const color =
    (primary && "bg-sky-400 hover:bg-sky-300 active:bg-sky-200") ||
    "bg-slate-50 hover:bg-slate-100 active:bg-slate-200";
  const styles = `
    p-2
    ${rounded ? "rounded-xl" : ""}
    ${color}
    focus:outline-none
    ${className}
  `;
  return (
    <button className={styles} {...rest}>
      {children}
    </button>
  );
};

export default Button;
