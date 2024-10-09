export interface EmailAttributeI {
  to: string;
  from?: string;
  body?: string;
  subject: string;
  templateName?: string;
  replacements?: Record<string, any>;
  attachments?: {
    filename: string;
    path: string;
  }[];
}


