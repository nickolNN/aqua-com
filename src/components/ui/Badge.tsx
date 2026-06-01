import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'status' | 'priority';

const variantStyles: Record<string, string> = {
  default: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
  outline: 'border border-input bg-transparent',
  status: 'bg-blue-100 text-blue-800',
  priority: 'bg-yellow-100 text-yellow-800',
};

const statusVariantMap: Record<string, string> = {
  'completed': 'secondary',
  'in_progress': 'default',
  'open': 'default',
  'cancelled': 'outline',
  'default': 'default',
};

const priorityVariantMap: Record<string, string> = {
  'urgent': 'destructive',
  'high': 'destructive',
  'medium': 'default',
  'low': 'outline',
  'default': 'default',
};

type StatusVariant = 'completed' | 'in_progress' | 'open' | 'cancelled' | 'default';
type PriorityVariant = 'urgent' | 'high' | 'medium' | 'low' | 'default';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant | StatusVariant | PriorityVariant;
  value?: string;
}

const Badge = React.forwardRef<
  HTMLSpanElement,
  BadgeProps
>(({ className, variant = 'default', value, ...props }, ref) => {
  let resolvedVariant: string = variant;

  if (variant === 'status' && value) {
    resolvedVariant = statusVariantMap[value as StatusVariant] || 'default';
  } else if (variant === 'priority' && value) {
    resolvedVariant = priorityVariantMap[value as PriorityVariant] || 'default';
  } else if (variant === 'default' || variant === 'secondary' || variant === 'destructive' || variant === 'outline') {
    resolvedVariant = variant;
  }

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors',
        variantStyles[resolvedVariant],
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = 'Badge';

export { Badge };