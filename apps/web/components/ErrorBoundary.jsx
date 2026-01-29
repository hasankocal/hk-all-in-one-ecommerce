"use client";
import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error to console in development
        console.error('Error Boundary caught an error:', error, errorInfo);

        this.setState({
            error,
            errorInfo
        });

        // TODO: Log to error reporting service (e.g., Sentry)
        // logErrorToService(error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            // Custom error UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-warm-beige/30 px-4">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="mb-6">
                            <span className="material-symbols-outlined text-6xl text-red-500">
                                error
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold text-deep-olive mb-4">
                            Bir Hata Oluştu
                        </h1>

                        <p className="text-deep-olive/70 mb-6">
                            Üzgünüz, bir şeyler ters gitti. Lütfen sayfayı yenilemeyi deneyin.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mb-6 text-left">
                                <summary className="cursor-pointer text-sm font-semibold text-deep-olive/50 mb-2">
                                    Hata Detayları (Geliştirici Modu)
                                </summary>
                                <div className="bg-gray-100 rounded-lg p-4 text-xs overflow-auto max-h-48">
                                    <p className="font-mono text-red-600 mb-2">
                                        {this.state.error.toString()}
                                    </p>
                                    <pre className="text-gray-600 whitespace-pre-wrap">
                                        {this.state.errorInfo?.componentStack}
                                    </pre>
                                </div>
                            </details>
                        )}

                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={this.handleReset}
                                className="bg-deep-olive hover:bg-primary text-white hover:text-deep-olive px-6 py-3 rounded-lg font-semibold transition-all"
                            >
                                Tekrar Dene
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="bg-white hover:bg-warm-beige text-deep-olive border border-deep-olive/20 px-6 py-3 rounded-lg font-semibold transition-all"
                            >
                                Ana Sayfaya Dön
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
