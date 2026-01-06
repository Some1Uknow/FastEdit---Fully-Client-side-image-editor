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

<div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Ambient Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-fuchsia-500/20 blur-[120px]" />
      </div>

      {/* Main Card */}
      <label
        className={`
          group relative z-10 flex w-full max-w-[420px] cursor-pointer flex-col items-center justify-center
          overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-12
          backdrop-blur-2xl transition-all duration-500 ease-out
          ${
            isDragging
              ? "scale-105 border-violet-500/50 shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)]"
              : "hover:border-white/20 hover:bg-black/50 hover:shadow-2xl"
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
              <div className="absolute inset-0 animate-ping rounded-full bg-violet-500/20" />
              <div className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-lg font-medium text-white">Processing...</p>
              <p className="text-sm text-white/40">Preparing your canvas</p>
            </div>
          </div>
        ) : (
          <>
            {/* Icon Container */}
            <div className="relative mb-8">
              <div
                className={`
                  absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 blur-xl opacity-20
                  transition-all duration-500
                  ${isDragging ? "scale-150 opacity-40" : "group-hover:scale-125 group-hover:opacity-30"}
                `}
              />
              <div
                className={`
                  relative flex h-20 w-20 items-center justify-center rounded-2xl
                  bg-gradient-to-br from-white/10 to-white/5 border border-white/10
                  shadow-xl transition-transform duration-500
                  ${isDragging ? "scale-110 rotate-3" : "group-hover:scale-105 group-hover:-rotate-3"}
                `}
              >
                <svg
                  className="h-8 w-8 text-white/90"
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
              <h3 className="text-2xl font-semibold tracking-tight text-white">
                Upload Image
              </h3>
              <p className="max-w-[240px] text-sm leading-relaxed text-white/50">
                Drag and drop your image here, or click to browse files
              </p>
            </div>

            {/* Divider */}
            <div className="my-8 flex w-full items-center gap-4 px-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="text-[10px] font-medium uppercase tracking-widest text-white/20">
                Supports
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* File Types */}
            <div className="flex items-center gap-3 mb-8">
              {["PNG", "JPG", "WEBP"].map((type) => (
                <span
                  key={type}
                  className="rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-[10px] font-medium text-white/40 transition-colors group-hover:border-white/10 group-hover:text-white/60"
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
              className="group/btn relative flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-medium text-white/60 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
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
      <div className="absolute bottom-8 text-xs text-white/20">
        Press <kbd className="font-sans font-semibold text-white/40">⌘ V</kbd> to paste image
      </div>
    </div>
  );
}
