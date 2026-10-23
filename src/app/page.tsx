import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { StarterBackends } from "@/components/sections/starter-backends";
import { FullStack } from "@/components/sections/full-stack";
import { BrandIntro } from "@/components/sections/brand-intro";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { HowItWorks } from "@/components/sections/how-it-works";
import { SocialProof } from "@/components/sections/social-proof";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { HomeMotion } from "@/components/home/home-motion";
import "@/components/home/home.css";
import { organizationSchema, softwareApplicationSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema(), softwareApplicationSchema()]} />
      <Header />
      <main className="hm">
        <Hero />
        <StarterBackends />
        <FullStack />
        <BrandIntro />
        <HowItWorks />
        <FeatureGrid />
        <SocialProof />
        <CtaBand />
        <HomeMotion />
      </main>
      <Footer />
    </>
  );
}
