/**
 * EmptyState — reusable "nothing here yet" placeholder. Used wherever a
 * list/panel has no data to show, whether that's because a filter
 * matched nothing or because a backend feature (agents, live events)
 * hasn't landed yet. Keeping this in one place means every empty state
 * across the app looks and behaves consistently.
 */
export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      {Icon ? (
        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10 flex items-center justify-center mb-4">
          <Icon size={20} className="text-text-tertiary" />
        </div>
      ) : null}
      <p className="text-sm text-text-primary mb-1">{title}</p>
      {description ? (
        <p className="text-xs text-text-tertiary max-w-xs leading-relaxed">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
