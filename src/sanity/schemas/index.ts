import { type SchemaTypeDefinition } from 'sanity';
import project from './project';
import category from './category';
import author from './author';
import post from './post';
import postCategory from './postCategory';
import award from './award';
import badge from './badge';
import brand from './brand';
import faq from './faq';
import homepage from './homepage';
import service from './service';
import siteSettings from './siteSettings';
import testimonial from './testimonial';
import tool from './tool';
import portableText from './portableText';

// Object schemas for project content sections
import caseStudyEntry from './objects/caseStudyEntry';
import fullWidthImage from './objects/fullWidthImage';
import imageGallery from './objects/imageGallery';
import twoColumnText from './objects/twoColumnText';
import videoBlock from './objects/videoBlock';
import comment from './comment';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Document types
    project,
    post,
    category,
    postCategory,
    author,
    award,
    badge,
    brand,
    faq,
    homepage,
    service,
    siteSettings,
    testimonial,
    tool,
    comment,

    // Reusable object types
    portableText,
    caseStudyEntry,
    fullWidthImage,
    imageGallery,
    twoColumnText,
    videoBlock,
  ],
};
