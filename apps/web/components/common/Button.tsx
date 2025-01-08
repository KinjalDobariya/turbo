import React from "react";
import { Button as MuiButton, ButtonProps } from "@mui/material";

interface ButtonComponentProps extends Omit<ButtonProps, 'variant' | 'size' | 'color'> {
  variant?: 'text' | 'outlined' | 'contained' | 'inherit';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  sx?: object;
}

export const Button: React.FC<ButtonComponentProps> = ({
  variant = "contained",
  size = "medium",
  disabled = false,
  type,
  color,
  label,
  onClick,
  sx
}) => {
  return (
    <MuiButton
      type={type}
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      onClick={onClick}
      sx={sx}
    >
      {label}
    </MuiButton>
  );
};
