
'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, CornerDownLeft, Sparkles, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { handleChat } from '@/actions/aiActions';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { readStreamableValue } from 'ai/rsc';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

export function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    const newMessages = [...messages, userMessage];

    try {
        const stream = await handleChat({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) });

        let fullResponse = '';
        const modelMessageId = `model-${Date.now()}`;
        setMessages(prev => [...prev, { id: modelMessageId, role: 'model', content: '...' }]);

        for await (const delta of readStreamableValue(stream)) {
            fullResponse += delta;
            setMessages(prev => prev.map(m =>
                m.id === modelMessageId ? { ...m, content: fullResponse } : m
            ));
        }

    } catch (err) {
        console.error("Error during chat handling:", err);
        const errorMessageId = `model-error-${Date.now()}`;
        setMessages(prev => [...prev, { id: errorMessageId, role: 'model', content: "Üzgünüm, şu anda bağlantı kurmakta zorlanıyorum. Lütfen daha sonra tekrar deneyin." }]);
    } finally {
        setIsLoading(false);
    }
  };

  const quickPrompts = [
    "En son projelerin hakkında bilgi ver",
    "Hangi hizmetleri sunuyorsun?",
    "Tasarım hakkında blog yazıların var mı?",
  ];

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg"
          aria-label="Chatbot'u aç/kapat"
        >
          {isOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8" />}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-48px)] max-w-md h-[70vh] max-h-[600px] bg-card border rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            <header className="p-4 border-b flex items-center gap-3 bg-card/80 backdrop-blur-sm">
                <div className="relative">
                    <Avatar>
                        <AvatarImage src="https://placehold.co/40x40.png" alt="Olyve AI Asistanı" data-ai-hint="bot logo"/>
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
                </div>
                <div>
                    <h3 className="font-bold text-lg">Olyve</h3>
                    <p className="text-sm text-muted-foreground">Yapay Zeka Portfolyo Rehberi</p>
                </div>
            </header>

            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.length === 0 && !isLoading && (
                    <div className="text-center text-muted-foreground py-8">
                        <Sparkles className="mx-auto h-12 w-12 text-primary/50 mb-4"/>
                        <p className="font-semibold">Bana her şeyi sorabilirsin!</p>
                        <p className="text-sm">Başlamak için aşağıdaki komutları deneyebilirsin.</p>
                    </div>
                )}
              {messages.map((message, index) => (
                <div key={message.id || index} className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : '')}>
                  {message.role === 'model' && (
                     <Avatar className="w-8 h-8">
                        <AvatarImage src="https://placehold.co/40x40.png" alt="Olyve AI Asistanı" data-ai-hint="bot logo" />
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn('max-w-[80%] rounded-xl px-4 py-2', message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary')}>
                    {message.content === '...' ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none break-words"
                          components={{
                              a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary underline" />,
                          }}
                      >
                          {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
                   {message.role === 'user' && (
                     <Avatar className="w-8 h-8">
                        <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && messages.length > 0 && messages[messages.length-1].role === 'user' && (
                <div className={cn('flex items-start gap-3')}>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="https://placehold.co/40x40.png" alt="Olyve AI Asistanı" data-ai-hint="bot logo" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className={cn('max-w-[80%] rounded-xl px-4 py-2 bg-secondary')}>
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                </div>
              )}
            </div>
            
            <footer className="p-4 border-t bg-card/80 backdrop-blur-sm">
                {messages.length === 0 && (
                    <div className="grid grid-cols-1 gap-2 mb-2">
                        {quickPrompts.map(prompt => (
                            <button
                                key={prompt}
                                onClick={() => setInput(prompt)}
                                className="text-left text-sm p-2 rounded-md hover:bg-secondary transition-colors"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                )}
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Projeler, yetenekler veya herhangi bir şey hakkında soru sor..."
                  className="flex-1 resize-none bg-background pr-16"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" className="absolute right-6 bottom-6" disabled={!input.trim() || isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </form>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
