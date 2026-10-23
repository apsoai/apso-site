import { DOG_SVGS, type DogMood } from "./dog-svgs";

interface DogProps {
  mood: DogMood;
  className?: string;
  id?: string;
}

/** The rigged Apso dog. All five moods are stacked; data-mood picks the visible one so the motion can switch it. */
export function Dog({ mood, className = "", id }: DogProps) {
  return (
    <div className={`dog ${className}`} data-mood={mood} id={id} aria-hidden="true">
      {(Object.keys(DOG_SVGS) as DogMood[]).map((m) => (
        <span key={m} className={`m-${m}`} dangerouslySetInnerHTML={{ __html: DOG_SVGS[m] }} />
      ))}
    </div>
  );
}
