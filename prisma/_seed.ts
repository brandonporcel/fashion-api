import { PrismaClient } from '@prisma/client';
import { BRANDS, CRITICS, DESIGNERS, QUOTES, TAGS } from './data';
import { UNFOUND_RUNWAYS } from './data/unfound.data';

const prisma = new PrismaClient();
async function main() {
  QUOTES.forEach(async (quote) => {
    await prisma.quote.upsert({
      where: { id: quote.id },
      update: {},
      create: {
        text: quote.text,
        author: quote.author,
        source: quote.source,
        sourceLink: quote.sourceLink,
      },
    });
  });
  BRANDS.forEach(async (quote) => {
    await prisma.brand.upsert({
      where: { slug: quote.slug },
      update: {},
      create: {
        name: quote.name,
        slug: quote.slug,
        description: quote.description,
      },
    });
  });
  TAGS.forEach(async (tag) => {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: {
        name: tag.name,
        slug: tag.slug,
      },
    });
  });

  await prisma.critic.deleteMany({});
  await prisma.critic.createMany({ data: CRITICS });

  DESIGNERS.forEach(async (dsg) => {
    await prisma.designer.upsert({
      where: { slug: dsg.slug },
      update: {},
      create: {
        name: dsg.name,
        thumbnailUrl: dsg.thumbnailUrl,
        lastName: dsg.lastName,
        slug: dsg.slug,
        dateOfBirth: dsg.dateOfBirth,
        dateOfDeath: dsg.dateOfDeath,
      },
    });
  });

  await prisma.unfoundRunway.createMany({ data: UNFOUND_RUNWAYS });

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
