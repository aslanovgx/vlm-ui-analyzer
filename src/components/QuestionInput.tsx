interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QuestionInput({
  value,
  onChange,
}: QuestionInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white">
        Your Question
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Example: What can you say about this image?"
        rows={5}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-white/20"
      />
    </div>
  );
}