export type GuidedPrayer = {
  id: string;
  title: string;
  category: string;
  reference?: string;
  scripture?: string;
  text: string;
};

export type PrayerRequestStatus = 'active' | 'answered' | 'archived';

export type PrayerRequest = {
  id: string;
  title: string;
  details: string;
  category: string;
  status: PrayerRequestStatus;
  createdAt: string;
  updatedAt: string;
};
