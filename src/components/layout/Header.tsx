import * as React from 'react';
import { cn } from '@/lib/utils';

const Header = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { title?: string }
>(({ className, title, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex h-16 items-center justify-between border-b bg-background px-6', className)}
      {...props}
    >
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <slot />
      </div>
    </div>
  );
});
Header.displayName = 'Header';

export { Header };
