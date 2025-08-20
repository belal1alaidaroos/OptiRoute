import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null 
    });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 max-w-md mx-auto mt-10 bg-red-50 rounded-lg shadow-md">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="mt-3 text-lg font-medium text-red-800">
              Something went wrong
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p className="font-semibold">{this.state.error?.toString()}</p>
              {process.env.NODE_ENV === 'development' && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm">Error details</summary>
                  <pre className="mt-2 p-2 bg-red-100 rounded overflow-auto text-xs">
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </div>
            <div className="mt-4">
              <button
                onClick={this.handleRetry}
                className="px-4 py-2 bg-red-100 text-red-800 rounded-md text-sm font-medium hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  onRetry: PropTypes.func
};

export default ErrorBoundary;