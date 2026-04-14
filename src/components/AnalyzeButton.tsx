interface AnalyzeButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function AnalyzeButton({
  onClick,
  loading = false,
  disabled = false,
}: AnalyzeButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Analyzing..." : "Analyze Image"}
    </button>
  );
}