import { initializeApp } from 'firebase-admin/app';
import sendEmailFn from './sendEmail';
import crawlStackProfileFunction from './crawlStackProfile';

initializeApp();

// scheduled functions
export const crawlStackProfile = crawlStackProfileFunction;

// called functions
export const sendEmail = sendEmailFn;
