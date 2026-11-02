import type { PageLoad } from './$types';
import cv from '#lib/data/cv_pt.json';
import { cvMetaTags } from '#lib/cvMeta.js';

export const load: PageLoad = async () => ({ pageMetaTags: cvMetaTags(cv, 'pt_PT') });
