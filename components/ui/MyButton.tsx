import { Button, ButtonProps } from "@heroui/react";

type MyButtonProps = Omit<ButtonProps, "variant"> & {
  variant: "primary" | "secondary";
};

function MyButton({
  children,
  variant,
  className = "",
  ...props
}: MyButtonProps) {
  const variantStyles =
    variant === "secondary"
      ? "bg-surface border-brand-500 border-2 text-brand-500 hover:border-surface hover:bg-brand-500 hover:text-surface hover:border-2"
      : "bg-brand-500 text-surface  hover:bg-brand-700 ";

  return (
    <Button className={`${variantStyles} ${className} shadow-2xl`} {...props}>
      {children}
    </Button>
  );
}

export default MyButton;
