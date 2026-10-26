import type { Metadata } from "next";
import { barlow, poppins, robotoMono } from "@/assets/fonts";
import { TrackingScripts } from "@/components/analytics/tracking-scripts";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import { Providers } from "@/lib/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - Deterministic Backend Generation for AI-Built Software`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/images/favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@apsoai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${poppins.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body text-fg-2 bg-bg-0">
        <TrackingScripts />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
