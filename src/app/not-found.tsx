import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { DOCS_URL } from "@/lib/constants";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center py-20 md:py-28">
        <Container className="flex flex-col items-center text-center">
          <Image src="/images/dog-curious.svg" alt="" width={112} height={158} className="h-[120px] w-auto md:h-[146px]" priority />
          <div className="h-1 w-full max-w-[420px] rounded-full bg-line-1" />
          <h1 className="mt-10 font-display text-[40px] font-extrabold leading-[1.08] text-fg-1 md:text-[56px]">
            Page not found
          </h1>
          <p className="mt-4 max-w-md text-[17px] leading-7 text-fg-4 md:text-[18px]">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/">Back to Home</Button>
            <Button href={DOCS_URL} external variant="outline" className="gap-2">
              Read the docs
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
