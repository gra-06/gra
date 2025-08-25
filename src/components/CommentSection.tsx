
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitComment } from '@/actions/commentActions';
import type { Comment } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, UserCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

interface CommentSectionProps {
    projectId: string;
    initialComments: Comment[];
}

const initialState = {
    message: '',
    error: false,
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Gönderiliyor...' : <><Send className="mr-2 h-4 w-4" /> Yorum Yap</>}
        </Button>
    );
}


export function CommentSection({ projectId, initialComments }: CommentSectionProps) {
    const [state, formAction] = useFormState(submitComment, initialState);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.message) {
            toast({
                title: state.error ? 'Hata' : 'Teşekkürler!',
                description: state.message,
                variant: state.error ? 'destructive' : 'default',
            });
            if (!state.error) {
                formRef.current?.reset();
            }
        }
    }, [state, toast]);

    return (
        <div className="space-y-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
                <h3 className="font-headline text-2xl mb-4">Bir Yorum Bırakın</h3>
                <form ref={formRef} action={formAction} className="space-y-4">
                    <input type="hidden" name="projectId" value={projectId} />
                    <div className="space-y-1">
                         <label htmlFor="author" className="font-semibold">İsim</label>
                        <Input id="author" name="author" placeholder="Adınız..." required />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="content" className="font-semibold">Yorumunuz</label>
                        <Textarea id="content" name="content" placeholder="Proje hakkındaki düşünceleriniz..." required rows={4}/>
                    </div>
                    <SubmitButton />
                </form>
            </div>

            <div className="space-y-6">
                <h3 className="font-headline text-2xl">{initialComments.length} Yorum</h3>
                {initialComments.length > 0 ? (
                    initialComments.map(comment => (
                        <div key={comment.id} className="flex items-start gap-4">
                            <UserCircle className="w-10 h-10 text-muted-foreground flex-shrink-0 mt-1" />
                            <div className="flex-grow bg-secondary/50 p-4 rounded-md">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="font-bold text-foreground">{comment.author}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: tr })}
                                    </p>
                                </div>
                                <p className="text-muted-foreground">{comment.content}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted-foreground">Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
                )}
            </div>
        </div>
    );
}
