/// <reference types="vite/client" />

// Extend JSX namespace to include custom elements
declare namespace JSX {
  interface IntrinsicElements {
    "pixel-canvas": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      "data-gap"?: number | string;
      "data-speed"?: number | string;
      "data-colors"?: string;
      "data-variant"?: "default" | "icon";
      "data-no-focus"?: string;
    };
  }
}
