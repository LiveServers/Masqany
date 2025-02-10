import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "ui/utils"
import { forwardRef } from "react";

const buttonVariants = cva(
  "flex justify-center items-center gap-2 whitespace-nowrap rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default:
          "bg-yellow-5 text-neutral-0 hover:bg-yellow-10",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, leftElement, children, isLoading=false, rightElement, ...props }, ref) => {

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {leftElement ? <span>{leftElement}</span> : null}
        {children}
        {isLoading ? <p>Loading ...</p>: null}
        {rightElement && !isLoading ? <span>{rightElement}</span> : null}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
