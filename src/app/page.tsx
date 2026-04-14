"use client";

import HeroSection from "@/components/HeroSection";
import AnalyzerForm from "@/components/AnalyzerForm";
import ResultsPanel from "@/components/ResultsPanel";
import { useAnalyzer } from "@/hooks/useAnalyzer";

export default function HomePage() {
  const {
    mode,
    setMode,
    question,
    setQuestion,
    selectedFile,
    setSelectedFile,
    result,
    loading,
    error,
    previewUrl,
    handleAnalyze,
  } = useAnalyzer();

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <HeroSection />

        <section className="grid gap-8 lg:grid-cols-2">
          <AnalyzerForm
            previewUrl={previewUrl}
            selectedFile={selectedFile}
            mode={mode}
            question={question}
            loading={loading}
            onFileChange={setSelectedFile}
            onModeChange={setMode}
            onQuestionChange={setQuestion}
            onAnalyze={handleAnalyze}
          />

          <ResultsPanel error={error} result={result} />
        </section>
      </div>
    </main>
  );
}