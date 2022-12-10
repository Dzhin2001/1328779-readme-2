import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


async function fillDb() {
  await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      idOriginal: 1,
      isRepost: false,
      postType: 'text',
      name: 'Тестовый пост',
      author: 'Bear',
      date: new Date('2022-12-09'),
      tags: '#monkey',
      textPreview: 'Просто тест',
      text: 'Это мой тестовый пост',
      quoteText: '',
      quoteAuthor: '',
      videoURL: '',
      photoURL: '',
      linkText: '',
      linkURL: '',
      createdAt: new Date('2022-12-09'),
      reactions: {
        create: [
          {
            userId: '13',
            text: 'Коммент к тестовому посту 1.',
            createdAt: new Date('2022-12-09'),
            isDelete: false,
            type: 'comment',
          },
        ]
      },
    }
  });
  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
