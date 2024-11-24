import { cva } from "class-variance-authority";
import { cn } from "../utils/cn";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  disabled: boolean;
};

export const Button = ({ className, variant, ...props }: ButtonProps) => {
  return (
    <>
      <button
        className={cn(buttonVariants({ variant }), className)}
        {...props}
      ></button>
    </>
  );
};

const buttonVariants = cva(
  "py-3 pt-4 px-4 rounded-xl font-sans font-bold text-xl transition disabled:opacity-40",
  {
    variants: {
      variant: {
        primary:
          "py-4 pt-5 text-yellow-custom bg-orange-custom border-yellow-custom border-5 hover:border-double hover:border-yellow-custom hover:ease-in-out duration-1000 disabled:hover:border-solid",
        secondary:
          "bg-yellow-custom text-green-custom border-double border-7 border-orange-custom hover:border-solid hover:border-7 hover:border-yellow-custom hover:ease-out duration-1000 disabled:hover:border-double disabled:hover:border-orange-custom",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);
