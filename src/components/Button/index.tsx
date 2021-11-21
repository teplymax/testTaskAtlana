//---------------------Basic imports-----------------------
import React from "react";
import "./Button.scss";

//---------------------Libraries-----------------------
import clsx from "clsx";

interface IButtonProps {
  onClick?: () => void;
  className?: string;
  type?: "button" | "reset" | "reset" | undefined;
  children?: JSX.Element;
}

const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  className,
  type = "button",
}) => {
  //---------------------Layout-----------------------

  return (
    <button
      type={type}
      className={clsx("button", className && className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
