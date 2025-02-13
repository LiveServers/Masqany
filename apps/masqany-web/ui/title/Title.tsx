import type { ComponentPropsWithoutRef, ElementType } from 'react';
import type { VariantProps } from "class-variance-authority";
import { cva } from 'class-variance-authority';

import { cn } from 'ui/utils';

const titleVariants = cva('font-bold', {
  variants: {
    variant: {
      xs: 'text-xs md:text-sm',
      sm: 'text-sm md:text-base',
      base: 'text-base md:text-lg',
      lg: 'text-lg md:text-xl',
      xl: 'text-xl md:text-2xl',
      '2xl': 'text-2xl md:text-3xl',
      '3xl': 'text-3xl md:text-4xl',
      '4xl': 'text-4xl md:text-5xl',
      '5xl': 'text-5xl md:text-7xl',
      '6xl': 'text-6xl md:text-8xl',
      '7xl': 'text-7xl md:text-9xl',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});

interface Props {
  variant?: VariantProps<typeof titleVariants>['variant'];
  className?: string;
  children: React.ReactNode;
}

export const Title = <TAs extends ElementType>(
  props: Props & { as?: TAs } & DistributiveOmit<
      ComponentPropsWithoutRef<ElementType extends TAs ? 'p' : TAs>,
      'as'
    >,
) => {
  const { variant, className, children, as: Component = 'p' } = props;
  return <Component className={cn(titleVariants({ variant, className }))}>{children}</Component>;
};
