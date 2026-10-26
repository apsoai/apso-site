import Link from "next/link";

type ButtonVariant = "primary" | "outline";
type ButtonSize = "default" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

const baseStyles =
  "inline-flex items-center justify-center font-body font-semibold transition-colors duration-200 cursor-pointer";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  outline: "bg-bg-0 text-fg-1 border border-[#D1D5DB] hover:border-fg-5",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "px-6 py-3 text-[15px] rounded-[10px]",
  lg: "px-6 py-[15px] text-[16px] rounded-[10px]",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "default",
  external,
  className = "",
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
    disabled ? "opacity-50 pointer-events-none" : ""
  } ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
