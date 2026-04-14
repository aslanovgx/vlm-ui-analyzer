"use client";

import Image from "next/image";
import { ChangeEvent } from "react";

interface UploadBoxProps {
  previewUrl: string | null;
  onFileChange: (file: File | null) => void;
}

export default function UploadBox({
  previewUrl,
  onFileChange,
}: UploadBoxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white">
        Upload Image
      </label>

      <label className="flex min-h-[220px] cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 p-6 text-center transition hover:border-white/30">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />

        {previewUrl ? (
          <div className="relative h-[220px] w-full overflow-hidden rounded-xl">
            <Image
              src={previewUrl}
              alt="Uploaded preview"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-base font-medium text-white">
              Click to upload a image
            </p>
            <p className="text-sm text-white/50">
              PNG, JPG, WEBP supported
            </p>
          </div>
        )}
      </label>
    </div>
  );
}