'use server';

import { suggestTags } from '@/ai/flows/suggest-tags';
import { z } from 'zod';

const schema = z.object({
  photoDataUri: z.string({
    required_error: 'Image data is required.',
  }).refine(s => s.startsWith('data:image/'), 'Must be a data URI for an image.'),
});

interface FormState {
  tags?: string[];
  error?: string;
}

export async function handleSuggestTags(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = schema.safeParse({
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
