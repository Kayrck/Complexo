import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Catches render errors anywhere in the tree so a single failing component
 * shows a readable message instead of a blank black screen.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: unknown) {
    // Surface the error for debugging in the preview console.
    console.error("[COMPLEXO] Render error:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="fixed inset-0 z-[100001] flex flex-col items-center justify-center gap-4 bg-black p-8 text-center text-white">
          <h1 className="font-rajdhani uppercase tracking-widest text-complexo-red">
            Falha ao carregar a experiência
          </h1>
          <pre className="max-w-2xl overflow-auto rounded-lg border border-white/10 bg-white/5 p-4 text-left text-xs text-complexo-muted">
            {this.state.error.message}
          </pre>
          <button
            onClick={() => this.setState({ error: null })}
            className="mt-2 border border-complexo-red px-6 py-3 font-rajdhani uppercase tracking-widest text-white"
          >
            Tentar novamente
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
