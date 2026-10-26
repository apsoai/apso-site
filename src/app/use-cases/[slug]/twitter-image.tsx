import { contentOgImage, contentOgParams, ogSize } from "@/lib/og";

export const alt = "Apso";
export const size = ogSize;
export const contentType = "image/png";

export const generateStaticParams = contentOgParams("use-cases");

export default contentOgImage("use-cases");
