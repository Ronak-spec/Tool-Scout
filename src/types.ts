export interface Tool {
  id: string;
  name: string;
  mark?: string;
  editorPick?: boolean;
  category: string;
  categoryKey: string;
  extraCategories?: string[];
  summary: string;
  bestFor: string;
  features: string[];
  pricingModel: string;
  priceKey: string;
  priceSort: number;
  pricingNote: string;
  url: string;
  pricingUrl: string;
  tags: string[];
  useCases: string[];
  platforms: string[];
  affiliateUrl?: string;
  sponsored?: boolean;
  sponsorshipLabel?: string;
  screenshotUrl?: string;
  screenshotSource?: string;
  screenshotAlt?: string;
  priceBucket?: string;
}

export interface Category {
  id: string;
  label: string;
  headline: string;
  description: string;
}

export interface UseCase {
  id: string;
  label: string;
  headline: string;
  description: string;
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  intro: string;
  points: string[];
  readTime?: string;
  updatedDate?: string;
}

export interface VendorSubmission {
  toolName: string;
  vendorUrl: string;
  pricingUrl: string;
  category: string;
  submissionType: 'standard' | 'sponsor';
  contactEmail: string;
  summary: string;
  pricingModel: string;
  notes?: string;
  savedAt: string;
}
