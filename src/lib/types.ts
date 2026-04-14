export type AnalysisMode =
  | "general"
  | "ui-review"
  | "accessibility"
  | "critical";

export interface AnalysisResult {
  summary: string;
  keyElements: string[];
  insights: string[];
  limitations: string[];
}

export interface AnalyzeRequestBody {
  mode: AnalysisMode;
  question: string;
  imageBase64?: string;
}