import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

/**
 * SearchInput — styled text input with a leading search icon. Purely a
 * controlled input; filtering logic lives in whatever page uses it.
 */
export default function SearchInput({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative">
      <HiOutlineMagnifyingGlass
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface border border-border text-xs text-text-primary placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 transition-colors"
      />
    </div>
  );
}
