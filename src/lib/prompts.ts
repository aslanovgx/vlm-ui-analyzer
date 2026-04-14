import { AnalysisMode } from "./types";

export const modeLabels: Record<AnalysisMode, string> = {
  general: "Describe",
  "ui-review": "Structure",
  accessibility: "Visibility",
  critical: "Risks",
};

export const modePrompts: Record<AnalysisMode, string> = {
  general: `
Describe what you see in the image.

Focus on:
- main objects
- what is happening
- overall scene

Keep it simple and clear.
`.trim(),

  "ui-review": `
Look at how the image is arranged.

Focus on:
- layout
- structure
- which parts stand out

Say if anything feels unclear or unbalanced.
`.trim(),

  accessibility: `
Check how easy the image is to see and understand.

Focus on:
- visibility
- brightness or darkness
- clarity
- if anything is hard to notice

Mention any problems.
`.trim(),

  critical: `
Be careful and critical.

Focus on:
- things that are unclear
- things that may be wrong
- what you are not sure about

Explain any risks or uncertainty.
`.trim(),
};