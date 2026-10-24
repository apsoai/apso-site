import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Apso: the backend foundation for AI-built software";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("Get the foundation right.", "The backend foundation for AI-built software.");
}
