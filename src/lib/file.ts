export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("Failed to convert file to base64."));
      }
    };

    reader.onerror = () => {
      reject(new Error("File reading failed."));
    };

    reader.readAsDataURL(file);
  });
}