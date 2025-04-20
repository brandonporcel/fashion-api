import { PrismaClient } from '@prisma/client';
import { BRANDS, CRITICS, DESIGNERS, QUOTES, TAGS } from './data';
import { UNFOUND_RUNWAYS } from './data/unfound.data';

const prisma = new PrismaClient();
async function main() {
  // for (const quote of BRANDS) {
  //   await prisma.brand.upsert({
  //     where: { slug: quote.slug },
  //     update: {},
  //     create: {
  //       name: quote.name,
  //       slug: quote.slug,
  //       description: quote?.description,
  //     },
  //   });
  // }

  // await prisma.critic.deleteMany({});
  // await prisma.critic.createMany({ data: CRITICS });

  // for (const dsg of DESIGNERS) {
  //   await prisma.designer.upsert({
  //     where: { slug: dsg.slug },
  //     update: { thumbnailUrl: dsg.thumbnailUrl },
  //     create: {
  //       name: dsg.name,
  //       thumbnailUrl: dsg.thumbnailUrl,
  //       lastName: dsg.lastName,
  //       slug: dsg.slug,
  //       dateOfBirth: dsg.dateOfBirth,
  //       dateOfDeath: dsg.dateOfDeath,
  //     },
  //   });
  // }

  // await prisma.unfoundRunway.createMany({ data: UNFOUND_RUNWAYS });

  console.log('Seed executed successfully! 🚀');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
