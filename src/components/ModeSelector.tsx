import { AnalysisMode } from "@/lib/types";
import { modeLabels } from "@/lib/prompts";

interface ModeSelectorProps {
  value: AnalysisMode;
  onChange: (mode: AnalysisMode) => void;
}

export default function ModeSelector({
  value,
  onChange,
}: ModeSelectorProps) {
  const modes = Object.keys(modeLabels) as AnalysisMode[];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white">
        Select Mode
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as AnalysisMode)}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/20"
      >
        {modes.map((mode) => (
          <option
            key={mode}
            value={mode}
            className="bg-neutral-900 text-white"
          >
            {modeLabels[mode]}
          </option>
        ))}
      </select>

      <p className="text-sm leading-6 text-white/50">
        Choose how the model should look at the image.
      </p>
    </div>
  );
}