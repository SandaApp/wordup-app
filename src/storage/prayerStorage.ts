import AsyncStorage from '@react-native-async-storage/async-storage';
import { PrayerRequest } from '../types/prayer';

const REQUESTS_KEY = 'wordup:prayerRequests';

export async function getPrayerRequests(): Promise<PrayerRequest[]> {
  const raw = await AsyncStorage.getItem(REQUESTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function savePrayerRequests(requests: PrayerRequest[]) {
  await AsyncStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
}

export async function addPrayerRequest(title: string, details: string, category = 'Personal') {
  const now = new Date().toISOString();
  const requests = await getPrayerRequests();
  const request: PrayerRequest = {
    id: `${Date.now()}`,
    title,
    details,
    category,
    status: 'active',
    createdAt: now,
    updatedAt: now
  };
  const next = [request, ...requests];
  await savePrayerRequests(next);
  return request;
}

export async function updatePrayerRequestStatus(id: string, status: PrayerRequest['status']) {
  const requests = await getPrayerRequests();
  const next = requests.map((request) =>
    request.id === id ? { ...request, status, updatedAt: new Date().toISOString() } : request
  );
  await savePrayerRequests(next);
  return next;
}
