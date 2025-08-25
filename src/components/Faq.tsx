
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PortableText } from '@portabletext/react';
import { PortableTextComponent } from './PortableTextComponent';

interface FaqItem {
  id: string;
  question: string;
  answer: any;
}

interface FaqProps {
  items: FaqItem[];
}

export function Faq({ items }: FaqProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-left font-headline text-xl hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="prose prose-lg max-w-none font-body text-muted-foreground dark:prose-invert">
            <PortableText value={item.answer} components={PortableTextComponent} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
