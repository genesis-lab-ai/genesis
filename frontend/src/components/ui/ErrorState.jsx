import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import Button from "./Button";

/**
 * ErrorState — shown when a data fetch fails. Previously a failed
 * getCity()/getMetrics() call just logged to console and left the page
 * on LoadingState forever, with no way for the user to know anything
 * went wrong or to retry. This matters more once the backend is polled
 * or streamed live — network hiccups will happen, and the app needs a
 * real recovery path instead of quietly hanging.
 */
export default function ErrorState({ message = "Something went wrong loading this data.", onRetry }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-center px-6">
      <div className="h-11 w-11 rounded-xl bg-negative/10 border border-negative/25 flex items-center justify-center">
        <HiOutlineExclamationTriangle size={20} className="text-negative" />
      </div>
      <p className="text-sm text-text-primary">{message}</p>
      {onRetry ? (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}
