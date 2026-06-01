import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface SidebarNavItemProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

export const SidebarNavItem = React.forwardRef<HTMLAnchorElement, SidebarNavItemProps>(
  ({ to, label, icon, ...rest }, ref) => {
    return (
      <NavLink
        ref={ref}
        to={to}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors',
            isActive
              ? 'bg-sidebar-accent text-sidebar-accent-foreground'
              : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
          )
        }
        {...(rest as any)}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{label}</span>
      </NavLink>
    );
  }
);

SidebarNavItem.displayName = 'SidebarNavItem';

export default SidebarNavItem;
