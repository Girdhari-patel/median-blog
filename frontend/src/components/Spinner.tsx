import React from "react";

type SpinnerProps = {
  /** show as centered full-screen overlay */
  fullScreen?: boolean;
  /** tailwind size: "sm" | "md" | "lg" or numeric pixel size for the spinner */
  size?: "sm" | "md" | "lg" | number;
  /** optional message below spinner */
  message?: string;
  /** extra classes for the overlay container (only used when fullScreen) */
  overlayClassName?: string;
  /** extra classes for the spinner element */
  spinnerClassName?: string;
  /** don't dim background when fullScreen */
  transparent?: boolean;
};

const sizeToClass = (size: SpinnerProps["size"]) => {
  if (typeof size === "number") return `w-[${size}px] h-[${size}px]`;
  switch (size) {
    case "sm":
      return "w-6 h-6 border-2 border-t-2";
    case "lg":
      return "w-14 h-14 border-4 border-t-4";
    case "md":
    default:
      return "w-10 h-10 border-4 border-t-4";
  }
};

export default function Spinner({
  fullScreen = false,
  size = "md",
  message,
  overlayClassName = "",
  spinnerClassName = "",
  transparent = false,
}: SpinnerProps) {
  const spinnerSizeClass = sizeToClass(size);

  const spinner = (
    <div
      className={`${spinnerSizeClass} ${spinnerClassName} rounded-full animate-spin border-gray-200 border-t-blue-600`}
      aria-hidden="true"
    />
  );

  if (fullScreen) {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          transparent ? "" : "bg-black/40"
        } ${overlayClassName}`}
        role="status"
        aria-live="polite"
      >
        <div className="bg-white/95 p-4 rounded-xl shadow-lg flex flex-col items-center">
          {spinner}
          {message ? <div className="mt-2 text-sm text-gray-700">{message}</div> : null}
        </div>
      </div>
    );
  }

  // inline small spinner
  return (
    <div className="inline-flex items-center">
      {spinner}
      {message ? <span className="ml-2 text-sm text-gray-600">{message}</span> : null}
    </div>
  );
}
