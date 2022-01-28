type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "primary" | "secondary" | "danger";
  iconType?: "prefix" | "suffix" | "both";
};

const classes: { [key: string]: string } = {
  primary: "bg-primary text-white hover:bg-primaryHover transition",
  secondary:
    "bg-secondaryBackground text-textColor hover:bg-secondaryBackgroundHover",
  danger: "bg-kazoRed text-white  hover:bg-kazoRedHover",
  prefix: "grid-cols-prefix",
  suffix: "grid-cols-suffix",
  both: "grid-cols-3 justify-between justify-items-center",
};

const Button: React.FC<Props> = ({ variant, className, iconType, ...rest }) => {
  const prefix = iconType !== undefined ? classes[iconType] : "";
  return (
    <button
      {...rest}
      className={`grid gap-0 items-center rounded-lg px-6 py-3 font-medium transition ${classes[variant]} ${prefix} ${className}`}
    >
      {rest.children}
    </button>
  );
};

export default Button;
