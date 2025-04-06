import { PrismaClient, Status } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient();

async function main() {
  const NUM_USERS = 5
  const NUM_PROJECTS = 10
  const NUM_TASKS = 30;
  const TAGS = ['frontend', 'backend', 'devops', 'bug', 'refatoração'];

  // Cria tags fixas
  const tagRecords = await Promise.all(
    TAGS.map((name) =>
      prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  // Cria usuários
  const users = await Promise.all(
    Array.from({ length: NUM_USERS }).map(() =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          stack: faker.helpers.arrayElement([
            'Frontend',
            'Backend',
            'Full Stack',
          ]),
        },
      }),
    ),
  );

  // Cria projetos
  const projects = await Promise.all(
    Array.from({ length: NUM_PROJECTS }).map(() => {
      const owner = faker.helpers.arrayElement(users);
      return prisma.project.create({
        data: {
          name: faker.company.name(),
          description: faker.lorem.sentence(),
          status: faker.helpers.arrayElement(Object.values(Status)),
          estimatedTime: faker.number.int({ min: 60, max: 600 }),
          ownerId: owner.id,
          members: {
            connect: [
              { id: owner.id },
              { id: faker.helpers.arrayElement(users).id },
            ],
          },
        },
      });
    }),
  );

  // Cria tarefas
  const tasks = await Promise.all(
    Array.from({ length: NUM_TASKS }).map(() => {
      const user = faker.helpers.arrayElement(users);
      const project = faker.helpers.arrayElement(projects);
      const status = faker.helpers.arrayElement(Object.values(Status));
      return prisma.task.create({
        data: {
          title: faker.hacker.phrase(),
          content: faker.lorem.paragraph(),
          status,
          userId: user.id,
          projectId: project.id,
          estimatedTime: faker.number.int({ min: 30, max: 240 }),
          tags: {
            connect: [{ id: faker.helpers.arrayElement(tagRecords).id }],
          },
        },
      });
    }),
  );

  // Cria sessões de trabalho
  for (let i = 0; i < 50; i++) {
    const user = faker.helpers.arrayElement(users);
    const task = faker.helpers.arrayElement(tasks);
    const project = task.projectId
      ? projects.find((p) => p.id === task.projectId)
      : null;
    const start = faker.date.recent({ days: 10 });
    const duration = faker.number.int({ min: 15, max: 180 });
    const end = new Date(start.getTime() + duration * 60000);

    await prisma.workSession.create({
      data: {
        userId: user.id,
        taskId: task.id,
        projectId: project?.id,
        status: task.status,
        startTime: start,
        endTime: end,
        duration,
        description: faker.lorem.sentence(),
      },
    });
  }

  console.log('Seed com faker concluída!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
