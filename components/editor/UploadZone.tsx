"use client";

import React, { useCallback, useState } from "react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  onUseSample: () => void;
  isLoading: boolean;
}

export function UploadZone({ onFileSelect, onUseSample, isLoading }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith("image/")) {
          onFileSelect(file);
        }
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onFileSelect(files[0]);
      }
    },
    [onFileSelect]
  );

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#fafafa]">
      {/* Main Card */}
      <label
        className={`
          group relative z-10 flex w-full max-w-[420px] cursor-pointer flex-col items-center justify-center
          overflow-hidden rounded-2xl border bg-white p-12
          shadow-sm transition-all duration-300 ease-out
          ${
            isDragging
              ? "scale-[1.02] border-gray-400 shadow-md"
              : "border-gray-200 hover:border-gray-300 hover:shadow-md"
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          disabled={isLoading}
        />

        {isLoading ? (
          <div className="flex flex-col items-center gap-6 py-8">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 animate-ping rounded-full bg-gray-200" />
              <div className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-gray-200 border-t-gray-900 animate-spin" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-lg font-medium text-gray-900">Processing...</p>
              <p className="text-sm text-gray-500">Preparing your canvas</p>
            </div>
          </div>
        ) : (
          <>
            {/* Icon Container */}
            <div className="relative mb-8">
              <div
                className={`
                  relative flex h-20 w-20 items-center justify-center rounded-2xl
                  bg-gray-50 border border-gray-200
                  transition-all duration-300
                  ${isDragging ? "scale-110 bg-gray-100" : "group-hover:scale-105 group-hover:bg-gray-100"}
                `}
              >
                <svg
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-center gap-3 text-center">
              <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
                Upload Image
              </h3>
              <p className="max-w-[240px] text-sm leading-relaxed text-gray-500">
                Drag and drop your image here, or click to browse files
              </p>
            </div>

            {/* Divider */}
            <div className="my-8 flex w-full items-center gap-4 px-8">
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
                Supports
              </span>
              <div className="h-px flex-1 bg-gray-100" />
            </div>

            {/* File Types */}
            <div className="flex items-center gap-3 mb-8">
              {["PNG", "JPG", "WEBP"].map((type) => (
                <span
                  key={type}
                  className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-[10px] font-medium text-gray-500 transition-colors group-hover:border-gray-300 group-hover:text-gray-600"
                >
                  {type}
                </span>
              ))}
            </div>

            {/* Use Sample Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onUseSample();
              }}
              className="group/btn relative flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-xs font-medium text-white transition-all hover:bg-gray-800"
            >
              <span className="relative z-10">Try Sample Image</span>
              <svg
                className="relative z-10 h-3 w-3 transition-transform group-hover/btn:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </>
        )}
      </label>

      {/* Footer Info */}
      <div className="absolute bottom-8 text-xs text-gray-400">
        Press <kbd className="font-sans font-semibold text-gray-600">⌘ V</kbd> to paste image
      </div>
    </div>
  );
}
