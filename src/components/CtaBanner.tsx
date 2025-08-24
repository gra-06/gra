
'use client';

import Link from 'next/link';
import { Button } from './ui/button';

export function CtaBanner() {
  return (
    <section className="bg-secondary py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="relative isolate overflow-hidden bg-background px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
          <h2 className="font-headline mx-auto max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Let’s build something great together
          </h2>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Link href="/contact">
              <Button size="lg" className="text-lg px-8 py-6">Contact Me</Button>
            </Link>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#8d958450-c69f-4251-94bc-4e091a323369)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
                <stop stopColor="hsl(var(--primary))" />
                <stop offset={1} stopColor="hsl(var(--primary) / 0.5)" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
