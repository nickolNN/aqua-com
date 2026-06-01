import * as React from 'react';
import { cn } from '@/lib/utils';

type SkeletonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type SkeletonVariant = 'text' | 'avatar' | 'image' | 'default';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  size?: SkeletonSize;
  animation?: boolean;
}

const Skeleton = React.forwardRef<
  HTMLDivElement,
  SkeletonProps
>(({ className, variant = 'default', size = 'md', animation = true, ...props }, ref) => {
  const sizes: Record<string, string> = {
    xs: 'h-3 w-full',
    sm: 'h-4 w-full',
    md: 'h-8 w-full',
    lg: 'h-12 w-full',
    xl: 'h-[32px] w-full',
    full: 'h-full w-full',
  };

  const variantStyles: Record<string, string> = {
    text: 'bg-gray-200',
    avatar: 'bg-gray-200 rounded-full',
    image: 'bg-gray-200 rounded-lg',
    default: 'bg-gray-200',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-md',
        animation && 'animate-pulse',
        variantStyles[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
Skeleton.displayName = 'Skeleton';

export { Skeleton };
