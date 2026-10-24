import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getContentBySlug, getContentSlugs } from "@/lib/content";

export const ogSize = { width: 1200, height: 630 };

const svgSrc = (file: Buffer) => `data:image/svg+xml;base64,${file.toString("base64")}`;

/** Share image in the site system: logo, Barlow ExtraBold title, a face dog sitting on the rule. */
export async function renderOgImage(title: string, subtitle?: string) {
  const [barlow, poppins, logo, dog] = await Promise.all([
    readFile(path.join(process.cwd(), "src/assets/og/Barlow-ExtraBold.ttf")),
    readFile(path.join(process.cwd(), "src/assets/og/Poppins-Regular.ttf")),
    readFile(path.join(process.cwd(), "public/images/logo.svg")).then(svgSrc),
    readFile(path.join(process.cwd(), "public/images/dog-happy.svg")).then(svgSrc),
  ]);
  const titleSize = title.length > 60 ? 60 : title.length > 36 ? 70 : 84;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: "#FFFFFF",
          padding: "64px 72px 0",
          fontFamily: "Poppins",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={logo} width={170} height={80} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", paddingRight: 260 }}>
          <div
            style={{
              fontFamily: "Barlow",
              fontWeight: 800,
              fontSize: titleSize,
              lineHeight: 1.04,
              color: "#111827",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ marginTop: 24, fontSize: 28, lineHeight: 1.45, color: "#4B5563" }}>{subtitle}</div>
          ) : null}
        </div>
        <div style={{ fontSize: 24, color: "#4B5563", paddingBottom: 44 }}>apso.ai</div>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={dog} width={188} height={279} style={{ position: "absolute", right: 88, bottom: 10 }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 10, background: "#2563EB" }} />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Barlow", data: barlow, weight: 800, style: "normal" },
        { name: "Poppins", data: poppins, weight: 400, style: "normal" },
      ],
    }
  );
}

/** Prerender one image per content page, matching the page's own static params. */
export function contentOgParams(category: string) {
  return () => getContentSlugs(category).map((slug) => ({ slug }));
}

/** Image route for a content collection page: the share image shows the page title. */
export function contentOgImage(category: string) {
  return async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const item = getContentBySlug<{ title: string }>(category, slug);
    return renderOgImage(item?.frontmatter.title ?? "Apso");
  };
}
