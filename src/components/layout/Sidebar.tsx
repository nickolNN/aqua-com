import * as React from 'react';
import { cn } from '@/lib/utils';

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('h-full flex flex-col bg-transparent', className)}
      {...props}
    />
  );
});
Sidebar.displayName = 'Sidebar';

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { logo?: string }
>(({ className, logo, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex items-center gap-2 p-4', className)}
      {...props}
    >
      {logo && (
        <span className="flex items-center gap-2.5">
          <span className="gradient-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-lg shadow-sm">
            <span className="h-3.5 w-3.5 rounded-full bg-white/90" />
          </span>
          <span className="text-lg font-bold tracking-tight">{logo}</span>
        </span>
      )}
    </div>
  );
});
SidebarHeader.displayName = 'SidebarHeader';

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex-1 overflow-y-auto p-2', className)}
      {...props}
    />
  );
});
SidebarContent.displayName = 'SidebarContent';

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('border-t border-sidebar-border p-4', className)}
      {...props}
    />
  );
});
SidebarFooter.displayName = 'SidebarFooter';

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter };
