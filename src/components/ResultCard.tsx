interface ResultCardProps {
  title: string;
  items?: string[];
  content?: string;
  emptyMessage?: string;
}

export default function ResultCard({
  title,
  items,
  content,
  emptyMessage = "No data available yet.",
}: ResultCardProps) {
  const hasItems = items && items.length > 0;
  const hasContent = typeof content === "string" && content.trim().length > 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>

      {hasContent && <p className="text-sm leading-7 text-white/80">{content}</p>}

      {hasItems && (
        <ul className="space-y-2 text-sm text-white/80">
          {items.map((item, index) => (
            <li key={`${title}-${index}`} className="leading-7">
              • {item}
            </li>
          ))}
        </ul>
      )}

      {!hasContent && !hasItems && (
        <p className="text-sm leading-7 text-white/45">{emptyMessage}</p>
      )}
    </div>
  );
}