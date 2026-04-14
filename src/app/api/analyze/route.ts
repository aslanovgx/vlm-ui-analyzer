import { NextResponse } from "next/server";
import { AnalyzeRequestBody, AnalysisResult } from "@/lib/types";
import { modePrompts } from "@/lib/prompts";

function extractTextContent(content: unknown): string {
  if (typeof content === "string") return content;

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (
          typeof item === "object" &&
          item !== null &&
          "type" in item &&
          item.type === "text" &&
          "text" in item &&
          typeof item.text === "string"
        ) {
          return item.text;
        }
        return "";
      })
      .join("")
      .trim();
  }

  return "";
}

function cleanJsonText(text: string): string {
  return text.replace(/```json|```/g, "").trim();
}

function normalizeResult(parsed: Partial<AnalysisResult>): AnalysisResult {
  return {
    summary: parsed.summary ?? "No summary returned.",
    keyElements: Array.isArray(parsed.keyElements) ? parsed.keyElements : [],
    insights: Array.isArray(parsed.insights) ? parsed.insights : [],
    limitations: Array.isArray(parsed.limitations) ? parsed.limitations : [],
  };
}

export async function POST(req: Request) {
  try {
    const body: AnalyzeRequestBody = await req.json();
    const { mode, question, imageBase64 } = body;

    if (!mode) {
      return NextResponse.json(
        { error: "Analysis mode is required." },
        { status: 400 }
      );
    }

    if (!imageBase64) {
      return NextResponse.json(
        { error: "Image data is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENROUTER_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const systemPrompt = `
You are a vision-language analysis assistant.

Analyze the uploaded image and return ONLY valid JSON.

Required JSON shape:
{
  "summary": "string",
  "keyElements": ["string"],
  "insights": ["string"],
  "limitations": ["string"]
}

Rules:
- Return only JSON
- No markdown
- No code fences
- Keep the language simple and clear
- summary should be short and easy to understand
- keyElements should list the main visible parts of the image
- insights should include useful observations, practical concerns, or simple analysis
- limitations should explain uncertainty, missing context, or possible model mistakes
- If there are no clear insights, return an empty array
- If there are no clear limitations, return an empty array
`.trim();

    const userPrompt = `
Mode:
${modePrompts[mode]}

Question:
${question || "Analyze this image."}
`.trim();

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: userPrompt,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: imageBase64,
                  },
                },
              ],
            },
          ],
          temperature: 0.2,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter API error:", data);

      return NextResponse.json(
        {
          error: data?.error?.message || "OpenRouter request failed.",
        },
        { status: 500 }
      );
    }

    const rawContent = data?.choices?.[0]?.message?.content;
    const extractedContent = extractTextContent(rawContent);

    if (!extractedContent) {
      return NextResponse.json(
        { error: "No content returned from the model." },
        { status: 500 }
      );
    }

    try {
      const cleaned = cleanJsonText(extractedContent);
      const parsed = JSON.parse(cleaned) as Partial<AnalysisResult>;
      const normalized = normalizeResult(parsed);

      return NextResponse.json(normalized);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Raw model content:", extractedContent);

      return NextResponse.json(
        {
          error: "Model returned invalid JSON. Try again or use a simpler image.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Analyze API error:", error);

    return NextResponse.json(
      { error: "Something went wrong while analyzing the image." },
      { status: 500 }
    );
  }
}