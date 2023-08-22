import React, { PropsWithChildren } from "react";

type ButtonProps = {
  onClick?: () => void;
  variant?: "default" | "ghost";
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = (
  props: PropsWithChildren<ButtonProps>
) => {
  const { children, onClick, variant } = props;

  const cNGenerator = (variant: ButtonProps["variant"]) => {
    if (variant) {
      const styles: Record<typeof variant, string> = {
        default:
          "mx-auto flex flex-nowrap items-center justify-center gap-1 rounded bg-zinc-700 px-2 py-1 text-slate-50 transition duration-200 hover:bg-zinc-900",
        ghost:
          "mx-auto flex flex-nowrap items-center justify-center gap-1 rounded px-2 py-1 transition duration-200 hover:bg-slate-300",
      };
      return styles[variant];
    } else {
      return "mx-auto flex flex-nowrap items-center justify-center gap-1 rounded bg-zinc-700 px-2 py-1 text-slate-50 transition duration-200 hover:bg-zinc-900";
    }
  };

  return (
    <button onClick={onClick} className={cNGenerator(props.variant)}>
      {children}
    </button>
  );
};

export default Button;
