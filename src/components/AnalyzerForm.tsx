import UploadBox from "@/components/UploadBox";
import ModeSelector from "@/components/ModeSelector";
import QuestionInput from "@/components/QuestionInput";
import AnalyzeButton from "@/components/AnalyzeButton";
import { AnalysisMode } from "@/lib/types";

interface AnalyzerFormProps {
  previewUrl: string | null;
  selectedFile: File | null;
  mode: AnalysisMode;
  question: string;
  loading: boolean;
  onFileChange: (file: File | null) => void;
  onModeChange: (mode: AnalysisMode) => void;
  onQuestionChange: (value: string) => void;
  onAnalyze: () => void;
}

export default function AnalyzerForm({
  previewUrl,
  selectedFile,
  mode,
  question,
  loading,
  onFileChange,
  onModeChange,
  onQuestionChange,
  onAnalyze,
}: AnalyzerFormProps) {
  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
      <UploadBox previewUrl={previewUrl} onFileChange={onFileChange} />

      <ModeSelector value={mode} onChange={onModeChange} />

      <QuestionInput value={question} onChange={onQuestionChange} />

      <AnalyzeButton
        onClick={onAnalyze}
        loading={loading}
        disabled={!selectedFile}
      />
    </div>
  );
}