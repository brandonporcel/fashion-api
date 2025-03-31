import { PrismaClient } from '@prisma/client';
import ck from 'chalk';
import { QUOTES } from './seed/';

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
  console.log(ck.green('Seed executed successfully! 🚀'));
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
