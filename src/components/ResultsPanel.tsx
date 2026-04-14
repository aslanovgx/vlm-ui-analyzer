import ResultCard from "@/components/ResultCard";
import ErrorMessage from "@/components/ErrorMessage";
import { AnalysisResult } from "@/lib/types";

interface ResultsPanelProps {
  error: string | null;
  result: AnalysisResult | null;
}

export default function ResultsPanel({
  error,
  result,
}: ResultsPanelProps) {
  return (
    <div className="space-y-4">
      {error && <ErrorMessage message={error} />}

      <ResultCard
        title="Summary"
        content={result?.summary}
        emptyMessage="A short summary will appear here after analysis."
      />

      <ResultCard
        title="Key Elements"
        items={result?.keyElements || []}
        emptyMessage="Main visible elements will appear here."
      />

      <ResultCard
        title="Insights"
        items={result?.insights || []}
        emptyMessage="Useful observations and simple analysis will appear here."
      />

      <ResultCard
        title="Limitations"
        items={result?.limitations || []}
        emptyMessage="Model limits and uncertainty will appear here."
      />
    </div>
  );
}