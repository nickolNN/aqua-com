import React, { Component, type ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children?: React.ReactNode;
  fallbackUI?: React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Enhanced ErrorBoundary component with detailed error display,
 * recovery button, and accessible markup.
 * Catches errors in child components and provides recovery UI.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true, error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
    // Log error to monitoring service
    console.error('Uncaught error:', error);
    console.error('Error details:', errorInfo);

    // Call custom onError handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render(): React.ReactNode {
    const { children, fallbackUI } = this.props;

    if (this.state.hasError) {
      if (fallbackUI) {
        return fallbackUI;
      }

      // Detailed error UI
      return (
        <div
          role="alert"
          aria-label="Application error"
          className="flex items-center justify-center min-h-[300px] bg-red-50"
        >
          <div className="max-w-lg mx-auto p-6 text-center">
            <svg
              className="w-16 h-16 text-red-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.538 0 2.713-1.65 1.698-3L12 4.5 4.304 15.5a3 3 0 000 3.372"
              />
            </svg>
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-red-700 mb-4">
              An unexpected error occurred. Please try refreshing the page.
            </p>

            {/* Error details (collapsed by default) */}
            {this.state.error && (
              <details className="mb-4 text-left bg-white p-3 rounded border border-red-200">
                <summary className="cursor-pointer text-sm text-gray-600">
                  Error details
                </summary>
                <pre className="mt-2 text-xs text-red-700 overflow-x-auto p-2 bg-red-50 rounded">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            <button
              type="button"
              onClick={this.handleReset}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              Try Again
            </button>

            <a
              href="/"
              className="block mt-3 text-sm text-blue-600 hover:underline"
            >
              Return to Dashboard
            </a>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
