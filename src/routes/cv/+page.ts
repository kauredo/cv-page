import type { PageLoad } from './$types';
import cv from '#lib/data/cv.json';
import { cvMetaTags } from '#lib/cvMeta.js';

export const load: PageLoad = async () => ({ pageMetaTags: cvMetaTags(cv, 'en_IE') });
