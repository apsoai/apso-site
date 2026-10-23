/** The two sitting dogs, cropped at the bottom edge of their frame as in the Figma bands. */
export function SittingDogs({ width, className = "" }: { width: number; className?: string }) {
  const height = Math.round(width * (211 / 168));
  return (
    <div className={`overflow-hidden ${className}`} style={{ height: Math.round(height * 0.68) }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/dogs-sitting.svg" alt="" width={width} height={height} className="block" />
    </div>
  );
}
