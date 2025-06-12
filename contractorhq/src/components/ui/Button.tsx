import { forwardRef } from "react";
import cx from "classnames";
import { FaSpinner } from "react-icons/fa";

const variantStyles = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-gray-light text-dark hover:bg-gray",
  accent: "bg-accent text-white hover:bg-accent-light",
  danger: "bg-error text-white hover:bg-red-700",
  ghost: "text-primary hover:bg-primary-lighter",
  nav: "text-dark hover:text-primary hover:bg-transparent p-0 h-auto",
  icon: "p-2 text-gray-600 hover:text-primary",
  cartIcon: "p-1 rounded border bg-white border-gray-300 text-indigo-600 hover:bg-indigo-100 hover:border-indigo-400",
  user: "rounded-full transition-colors duration-200 cursor-pointer active:scale-95"
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
  xs: "p-1 text-base",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled = false,
      type = "button",
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cx(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        "focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        { "w-full": fullWidth },
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {loading && (
        <FaSpinner className="h-4 w-4 animate-spin -ml-1 mr-2" />
      )}
      {children}
    </button>
  )
);

Button.displayName = "Button";

export { Button };