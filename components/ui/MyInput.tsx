import { Input, InputProps } from "@heroui/react";

// type MyInputProps = InputProps;

function MyInput({ ...props }: InputProps) {
  return (
    <Input
      size={5}
      className="focus:border-brand-500 focus:border"
      {...props}
    />
  );
}

export default MyInput;
