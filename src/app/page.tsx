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
    <main className="relative min-h-screen overflow-hidden bg-[#0b0b12] px-6 py-10 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-16 top-8 h-40 w-40 rounded-full bg-sky-300/15 blur-3xl" />
        <div className="absolute right-6 top-56 h-24 w-24 rounded-full bg-fuchsia-500/20 blur-2xl" />
        <div className="absolute bottom-6 left-1/3 h-28 w-28 rounded-full bg-amber-300/15 blur-3xl" />
        <div className="absolute left-[-40px] top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-fuchsia-500/15 blur-2xl" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.08),_transparent_22%),radial-gradient(circle_at_bottom,_rgba(217,70,239,0.06),_transparent_18%)]" />

      <div className="relative mx-auto max-w-6xl">
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