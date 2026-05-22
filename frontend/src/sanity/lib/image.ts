//  The Correct Up-to-Date Way
import { createImageUrlBuilder } from '@sanity/image-url'

// Fallback to empty strings if parameters aren't initialized yet
const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0akh2hu2',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
})

export const urlFor = (source: any) => builder.image(source)