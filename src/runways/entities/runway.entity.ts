import { $Enums, Runway as PRunway } from '@prisma/client';

export class Runway implements PRunway {
  id: string;
  link: string;
  slug: string;
  designerId: string;
  description: string;
  collectionType: $Enums.CollectionType;
  year: number;
  brandId: string;
  popularity: number;
  createdAt: Date;
  updatedAt: Date;
  validated: boolean;
}
