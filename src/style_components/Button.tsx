import { cva } from "class-variance-authority";
import { cn } from "../utils/cn";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
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
  "py-3 pt-4 px-4 rounded-xl font-sans font-semibold text-xl",
  {
    variants: {
      variant: {
        primary:
          "py-4 pt-5 bg-orange-custom border-yellow-custom border-5 hover:border-double hover:border-yellow-custom",
        secondary:
          "bg-yellow-custom text-green-custom border-double border-6 border-orange-custom hover:border-solid hover:border-7 hover:border-yellow-custom",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);
