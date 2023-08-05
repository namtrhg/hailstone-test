import classNames from "classnames";
import React from "react";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  color?: "primary" | "success" | "secondary" | "warning";
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { children, onClick, color = "primary", className, disabled } = props;

  const getButtonColor = () => {
    if (color === "primary") return "bg-primary";
    if (color === "success") return "bg-success";
    if (color === "warning") return "bg-warning";
    return "bg-secondary";
  };

  return (
    <button
      className={classNames(
        className,
        `px-4 py-2 h-16 max-w-[460px]text-white font-semibold rounded-xl relative`,
        getButtonColor()
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="z-10">{children}</div>
    </button>
  );
};

export default Button;
