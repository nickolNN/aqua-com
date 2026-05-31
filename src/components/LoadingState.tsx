import { type ReactNode } from 'react';

type StateType = 'loading' | 'error' | 'empty' | 'success';

interface LoadingStateProps {
  state?: StateType;
  error?: unknown;
  emptyMessage?: string;
  loadingMessage?: string;
  children?: ReactNode;
  className?: string;
  showRetry?: boolean;
  onRetry?: () => void;
}

/**
 * LoadingState component provides reusable loading and error states for RTK Query hooks.
 * Handles loading, error, and empty state UI with accessible markup.
 * Usage: <LoadingState state={isLoading ? 'loading' : error ? 'error' : 'empty'} error={error}>
 *   {data ? <ContactsList data={data} /> : undefined}
 * </LoadingState>
 */
export function LoadingState({
  state = 'loading',
  error,
  emptyMessage = 'No data available.',
  loadingMessage = 'Loading...',
  children,
  className = '',
  showRetry = true,
  onRetry,
}: LoadingStateProps) {
  // Loading state
  if (state === 'loading') {
    return (
      <div
        role="status"
        aria-label="Loading content"
        className={`flex items-center justify-center min-h-[200px] ${className}`}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
            role="img"
            aria-label="Loading spinner"
          />
          <p className="text-sm text-gray-500">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (state === 'error') {
    const errorDetails = error
      ? (typeof error === 'string' ? error : typeof error === 'object' && 'message' in error
          ? String(error.message)
          : 'Unknown error')
      : 'Unknown error';

    return (
      <div
        role="alert"
        aria-live="assertive"
        className={`flex flex-col items-center justify-center min-h-[200px] px-4 ${className}`}
      >
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <svg
            className="w-12 h-12 text-red-500 mx-auto mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.538 0 2.713-1.65 1.698-3L12 4.5 4.304 15.5a3 3 0 000 3.372"
            />
          </svg>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
          <p className="text-sm text-red-700 mb-3">{errorDetails}</p>
          {showRetry && onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  // Empty state
  if (state === 'empty') {
    return (
      <div
        role="status"
        aria-label="No content available"
        className={`flex items-center justify-center min-h-[200px] ${className}`}
      >
        <div className="text-center">
          <svg
            className="w-16 h-16 text-gray-300 mx-auto mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0h-2m2 0a2 2 0 01-2 2H6a2 2 0 01-2-2m0 0V20a2 2 0 002 2h12a2 2 0 002-2v-4"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10" />
          </svg>
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  // Success state — render children
  return <>{children}</>;
}

/** Hook wrapper for RTK Query hooks that returns loading state. */
export interface UseQueryState {
  isLoading: boolean;
  isError: boolean;
  isEmpty?: boolean;
}

export function useQueryState(
  isLoading: boolean,
  isError: boolean,
  isEmpty?: boolean
): UseQueryState {
  return { isLoading, isError, isEmpty };
}
