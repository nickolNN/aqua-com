import React, { Component, type ErrorInfo } from 'react';
import { Button } from './ui/Button';

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
    console.error('Uncaught error:', error);
    console.error('Error details:', errorInfo);

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

      return (
        <div
          role="alert"
          aria-label="Application error"
          className="flex items-center justify-center min-h-[300px] bg-background"
        >
          <div className="max-w-lg mx-auto p-6 text-center">
            <svg
              className="w-16 h-16 text-destructive mx-auto mb-4"
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
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              An unexpected error occurred. Please try refreshing the page.
            </p>

            {this.state.error && (
              <details className="mb-4 text-left bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                <summary className="cursor-pointer text-sm text-muted-foreground">
                  Error details
                </summary>
                <pre className="mt-2 text-xs text-muted-foreground overflow-x-auto p-2 bg-background rounded">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            <Button
              type="button"
              variant="destructive"
              onClick={this.handleReset}
              className="mt-4"
            >
              Try Again
            </Button>

            <Button
              as="a"
              href="/"
              variant="link"
              className="mt-3"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
