import { HiOutlineCubeTransparent } from "react-icons/hi2";

/**
 * LoadingState — shared loading placeholder for any view waiting on data
 * from the backend (city, metrics, etc.). Purely presentational; carries
 * no data-fetching logic of its own so it stays safe to reuse anywhere
 * without touching how any page fetches data.
 */
export default function LoadingState({ label = "Loading Genesis..." }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-text-secondary">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/30 to-data/10 border border-white/10 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <HiOutlineCubeTransparent className="text-accent" size={18} />
        </div>
      </div>
      <span className="text-xs font-mono tracking-wide">{label}</span>
    </div>
  );
}
