"use client";

import { useEffect, useState } from "react";
import { AnalysisMode, AnalysisResult } from "@/lib/types";
import { fileToBase64 } from "@/lib/file";

export function useAnalyzer() {
  const [mode, setMode] = useState<AnalysisMode>("general");
  const [question, setQuestion] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const imageBase64 = await fileToBase64(selectedFile);

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode,
          question: question.trim() || "Analyze this image and provide insights.",
          imageBase64,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed.");
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return {
    mode,
    setMode,
    question,
    setQuestion,
    selectedFile,
    setSelectedFile,
    previewUrl,
    result,
    loading,
    error,
    handleAnalyze,
  };
}