'use server';

import { suggestTags } from '@/ai/flows/suggest-tags';
import { streamPortfolioGuide } from '@/ai/flows/portfolio-guide';
import { z } from 'zod';

const suggestTagsSchema = z.object({
  photoDataUri: z.string({
    required_error: 'Image data is required.',
  }).refine(s => s.startsWith('data:image/'), 'Must be a data URI for an image.'),
});

interface SuggestTagsFormState {
  tags?: string[];
  error?: string;
}

export async function handleSuggestTags(prevState: SuggestTagsFormState, formData: FormData): Promise<SuggestTagsFormState> {
  const validatedFields = suggestTagsSchema.safeParse({
    photoDataUri: formData.get('photoDataUri'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.photoDataUri?.join(', ') || 'Invalid input.',
    };
  }

  try {
    const result = await suggestTags({ photoDataUri: validatedFields.data.photoDataUri });
    if (!result.tags || result.tags.length === 0) {
      return { error: 'Could not generate tags for this image. Please try another one.' };
    }
    return { tags: result.tags };
  } catch (error) {
    console.error('Error suggesting tags:', error);
    return { error: 'An unexpected error occurred while suggesting tags. Please try again.' };
  }
}

const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })),
});

export async function handleChat(input: z.infer<typeof chatSchema>) {
    const validatedFields = chatSchema.safeParse(input);
    if (!validatedFields.success) {
        throw new Error('Invalid input for chat handler');
    }
    return streamPortfolioGuide(validatedFields.data);
}
