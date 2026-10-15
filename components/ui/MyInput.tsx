import { Input, InputProps } from "@heroui/react";

// type MyInputProps = InputProps;

function MyInput({ ...props }: InputProps) {
  return (
    <Input
      className="focus:border-brand-500 focus:border aria-invalid:border-red-500 aria-invalid:bg-red-50/40 aria-invalid:focus:ring-red-500"
      {...props}
    />
  );
}

export default MyInput;
