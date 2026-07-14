import { Component } from "react";
import { HiOutlineFaceFrown } from "react-icons/hi2";
import Button from "./Button";

/**
 * ErrorBoundary — catches render-time crashes in whatever it wraps
 * (see DashboardLayout, which wraps <Outlet />) instead of letting one
 * broken page take down the whole app with a white screen. This is
 * standard React practice and becomes more important once pages are
 * rendering live/streamed data — a malformed payload should degrade one
 * page gracefully, not crash the shell around it.
 *
 * Must be a class component — React doesn't support error boundaries via
 * hooks as of this writing.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Genesis frontend crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-center px-6">
          <div className="h-11 w-11 rounded-xl bg-negative/10 border border-negative/25 flex items-center justify-center">
            <HiOutlineFaceFrown size={20} className="text-negative" />
          </div>
          <p className="text-sm text-text-primary">This page hit an unexpected error.</p>
          <p className="text-xs text-text-tertiary max-w-xs">
            The rest of Genesis is still running — try reloading this page.
          </p>
          <Button variant="secondary" size="sm" onClick={() => this.setState({ hasError: false })}>
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
