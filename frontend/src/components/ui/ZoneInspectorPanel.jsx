import DetailRow from "./DetailRow";
import SectionHeader from "./SectionHeader";
import { ZONE_LABELS } from "../../mock/city";

/**
 * ZoneInspectorPanel — the single "here's what you selected on the map"
 * panel, used by both Dashboard's right rail and the City page's
 * inspector aside. These previously had two independently hand-rolled
 * versions of the same concept (one wrapped in an accent card, one
 * plain) with slightly different field sets and empty-state handling.
 * Now there's one implementation with a `fields` prop controlling which
 * DetailRows to show, so each page still controls what's relevant to it.
 *
 * fields: array of { label, value } — the caller decides what's relevant
 * (Dashboard shows population/employment/pollution/happiness; City page
 * additionally shows coordinates and rent, and skips fields that don't
 * apply to roads).
 */
export default function ZoneInspectorPanel({ title = "Selected zone", selectedZone, fields, emptyHint }) {
  if (!selectedZone) {
    return (
      <div>
        <SectionHeader>{title}</SectionHeader>
        <p className="text-xs text-text-tertiary px-1">{emptyHint ?? "Select a zone on the map to inspect it."}</p>
      </div>
    );
  }

  return (
    // Keyed by zone id — switching from one selected zone to another
    // remounts this div instead of just updating its text in place,
    // which replays the fade-in-up animation each time. Without the key,
    // React would reuse the same DOM node across selections and the
    // transition would only ever play once, on the very first selection.
    <div key={selectedZone.id} className="glass rounded-xl border border-accent/30 bg-accent-soft p-3 fade-in-up">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[11px] uppercase tracking-wider text-accent">{title}</p>
        <p className="text-[10px] text-text-tertiary font-mono">{selectedZone.id}</p>
      </div>

      <div className="mt-2">
        <DetailRow label="Type" value={ZONE_LABELS[selectedZone.type] ?? selectedZone.type} />
        {fields.map(({ label, value }) => (
          <DetailRow key={label} label={label} value={value} />
        ))}
      </div>
    </div>
  );
}
