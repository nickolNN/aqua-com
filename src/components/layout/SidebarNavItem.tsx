import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface SidebarNavItemProps {
  to?: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const SidebarNavItem = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, SidebarNavItemProps>(
  ({ to, onClick, label, icon, ...rest }, ref) => {
    if (onClick) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          onClick={onClick}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          {...rest}
        >
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span>{label}</span>
        </button>
      );
    }

    return (
      <NavLink
        ref={ref as React.Ref<HTMLAnchorElement>}
        to={to!}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors',
            isActive
              ? 'gradient-primary text-primary-foreground font-medium'
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
