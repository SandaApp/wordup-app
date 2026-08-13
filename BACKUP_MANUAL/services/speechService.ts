import * as Speech from 'expo-speech';

type SpeakOptions = {
  rate?: number;
  pitch?: number;
  language?: string;
};

let preferredVoiceIdentifier: string | undefined;

async function getPreferredEnglishVoice() {
  if (preferredVoiceIdentifier) return preferredVoiceIdentifier;

  try {
    const voices = await Speech.getAvailableVoicesAsync();
    const englishVoices = voices.filter((voice) => voice.language?.toLowerCase().startsWith('en'));

    // Prefer natural/enhanced Google or high-quality English voices when available.
    const preferred =
      englishVoices.find((voice) => `${voice.name} ${voice.quality}`.toLowerCase().includes('enhanced')) ||
      englishVoices.find((voice) => voice.name?.toLowerCase().includes('google')) ||
      englishVoices.find((voice) => voice.language?.toLowerCase().includes('en-us')) ||
      englishVoices.find((voice) => voice.language?.toLowerCase().includes('en-gb')) ||
      englishVoices[0];

    preferredVoiceIdentifier = preferred?.identifier;
    return preferredVoiceIdentifier;
  } catch {
    return undefined;
  }
}

export async function speak(text: string, rate = 0.82, options: SpeakOptions = {}) {
  Speech.stop();

  const voice = await getPreferredEnglishVoice();

  Speech.speak(text, {
    language: options.language ?? 'en-US',
    rate: options.rate ?? rate,
    pitch: options.pitch ?? 0.98,
    voice
  });
}

export function stopSpeaking() {
  Speech.stop();
}
