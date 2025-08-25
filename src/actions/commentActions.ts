
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

const commentSchema = z.object({
  author: z.string().min(2, { message: "İsim en az 2 karakter olmalıdır." }),
  content: z.string().min(10, { message: "Yorum en az 10 karakter olmalıdır." }),
  projectId: z.string(),
});

interface FormState {
  message: string;
  error?: boolean;
}

export async function submitComment(prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = commentSchema.safeParse({
        author: formData.get('author'),
        content: formData.get('content'),
        projectId: formData.get('projectId'),
    });

    if (!validatedFields.success) {
        return {
            message: validatedFields.error.flatten().fieldErrors.content?.[0] 
                || validatedFields.error.flatten().fieldErrors.author?.[0]
                || "Geçersiz giriş.",
            error: true,
        };
    }

    try {
        const response = await fetch(`${API_URL}/api/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                author: validatedFields.data.author,
                content: validatedFields.data.content,
                project: validatedFields.data.projectId,
                isApproved: false,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to submit comment:', errorData);
            return { message: 'Yorumunuz gönderilirken bir hata oluştu.', error: true };
        }
        
        // Revalidate the project path to show the new comment after approval
        // This won't show the comment immediately, but ensures cache is cleared for when it is approved.
        const project = await (await fetch(`${API_URL}/api/projects/${validatedFields.data.projectId}`)).json();
        if (project.slug) {
            revalidatePath(`/projects/${project.slug}`);
        }

        return { message: 'Yorumunuz başarıyla gönderildi. Onaylandıktan sonra yayınlanacaktır.', error: false };
    } catch (error) {
        console.error('Error submitting comment:', error);
        return { message: 'Yorumunuz gönderilemedi. Lütfen tekrar deneyin.', error: true };
    }
}
