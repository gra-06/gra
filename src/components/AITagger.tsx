
'use client';

import { useState, useRef, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import { Bot, Image as ImageIcon, Upload, X } from 'lucide-react';
import { handleSuggestTags } from '@/actions/aiActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  tags: undefined,
  error: undefined,
};

function SubmitButton({ imagePreview }: { imagePreview: string | null }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending || !imagePreview}
      className="w-full text-lg py-6"
    >
      {pending ? (
        <>
          <Bot className="mr-2 h-5 w-5 animate-spin" />
          Resim Analiz Ediliyor...
        </>
      ) : (
        'Etiketleri Öner'
      )}
    </Button>
  );
}

export function AITagger() {
  const [state, formAction] = useFormState(handleSuggestTags, initialState);
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: 'destructive',
        title: 'Bir hata oluştu',
        description: state.error,
      });
    }
  }, [state, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        if (formRef.current) {
            formRef.current.reset();
        }
        // Manually reset form state for tags and errors
        if (state) {
            state.tags = undefined;
            state.error = undefined;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    if (state) {
        state.tags = undefined;
        state.error = undefined;
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <form ref={formRef} action={formAction}>
            <input
              type="file"
              name="imageFile"
              ref={inputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            {imagePreview && <input type="hidden" name="photoDataUri" value={imagePreview} />}
            
            <div
              className="aspect-video w-full border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer mb-4 relative group hover:border-primary transition-colors"
              onClick={() => inputRef.current?.click()}
            >
              {imagePreview ? (
                <>
                  <Image src={imagePreview} alt="Resim önizlemesi" fill style={{objectFit: "contain"}} className="rounded-md p-2" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Upload className="mx-auto h-12 w-12 mb-2" />
                  <p>Bir resim yüklemek için tıklayın</p>
                  <p className="text-xs">PNG, JPG, GIF - 10MB'a kadar</p>
                </div>
              )}
            </div>

            <SubmitButton imagePreview={imagePreview} />
          </form>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col">
        <CardContent className="p-6 flex-grow flex items-center justify-center">
            <div className="w-full">
                <h3 className="font-headline text-2xl mb-4 text-center">Önerilen Etiketler</h3>
                <div className="min-h-[200px] bg-secondary/50 rounded-lg p-4 flex items-center justify-center">
                {state.tags && state.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-3 justify-center">
                        {state.tags.map((tag) => (
                            <Badge key={tag} className="text-base px-4 py-2" variant="default">{tag}</Badge>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center">Analizden sonra etiketler burada görünecektir.</p>
                )}
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
