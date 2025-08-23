import { AITagger } from '@/components/AITagger';
import { Bot } from 'lucide-react';

export default function AITaggerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full p-3 mb-4">
          <Bot className="h-10 w-10" />
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-4">
          AI-Powered Tag Suggestions
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Upload an image from your project, and our AI will suggest relevant tags to improve its discoverability in your portfolio.
        </p>
      </header>

      <AITagger />
    </div>
  );
}
