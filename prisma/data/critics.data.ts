import { CriticType } from '@prisma/client';

export const CRITICS = [
  {
    name: 'BlissFoster',
    youtube: 'https://www.youtube.com/@BlissFoster',
    description: 'BlissFoster',
    type: CriticType.INFLUENCER,
  },
  {
    name: 'tubaavalon',
    youtube: 'https://www.youtube.com/@tubaavalon',
    description: 'tubaavalon',
    type: CriticType.INFLUENCER,
  },
  {
    name: 'sihablarademoda',
    instagram: 'https://www.instagram.com/sihablarademoda',
    description: 'sihablarademoda',
    type: CriticType.INFLUENCER,
  },
  {
    name: 'sabukaru',
    website: 'https://sabukaru.online',
    description: 'sabukaru',
    type: CriticType.MAGAZINE,
  },
];
