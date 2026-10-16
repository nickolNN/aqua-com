import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  as?: 'a';
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...rest }, ref) => {
    const props = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    const isAnchor = props.href !== undefined;

    const variantStyles: Record<string, string> = {
      default: 'gradient-primary text-primary-foreground shadow-sm hover:shadow-md hover:brightness-110',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border border-input bg-background hover:bg-accent/10 hover:border-accent',
      ghost: 'hover:bg-accent/10',
      link: 'text-primary underline-offset-4 hover:underline',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    };

    const sizeStyles: Record<string, string> = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 px-3',
      lg: 'h-11 px-8',
      icon: 'h-10 w-10',
    };

    const buttonClasses = cn(
      'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (isAnchor) {
      return React.createElement('a', {
                ref: ref as any,
        className: buttonClasses,
        ...props
            });
    }

    return (
      <button
        ref={ref as any}
        className={buttonClasses}
        {...rest}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
