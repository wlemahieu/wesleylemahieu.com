import { initializeApp } from "firebase-admin/app";
import sendInquiryFunction from "./sendInquiry";
import crawlStackProfileFunction from "./crawlStackProfile";

initializeApp();

// scheduled functions
export const crawlStackProfile = crawlStackProfileFunction;

// called functions
export const sendInquiry = sendInquiryFunction;
