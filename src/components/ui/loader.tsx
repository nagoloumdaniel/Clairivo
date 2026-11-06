import type { CSSProperties } from "react";

/**
 * Indicateur de chargement : trois points (corail, violet, soleil) en orbite qui se resserrent
 * et s'écartent. Sans mouvement si le système le demande (voir globals.css).
 */
export function Loader({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`orbite relative inline-block size-5 ${className}`}>
      <i style={{ "--a": "0deg", background: "#ff6b3d" } as CSSProperties} />
      <i style={{ "--a": "120deg", background: "#7c5cf0" } as CSSProperties} />
      <i style={{ "--a": "240deg", background: "#ffc83d" } as CSSProperties} />
    </span>
  );
}
