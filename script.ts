import { prisma } from './lib/prisma'

async function main() {
  console.log('🚀 Testing Taskmaster database...\n')

  // Create a new user with tasks
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@taskmaster.io',
      password: 'securepassword123',
      tasks: {
        create: [
          {
            title: 'Complete Prisma setup',
            description: 'Set up Prisma ORM with PostgreSQL in Docker',
            completed: true,
            priority: 'HIGH',
          },
          {
            title: 'Build task manager API',
            description: 'Create REST API endpoints for task management',
            completed: false,
            priority: 'URGENT',
            dueDate: new Date('2024-12-31'),
          },
          {
            title: 'Add authentication',
            description: 'Implement user authentication with JWT',
            completed: false,
            priority: 'MEDIUM',
            dueDate: new Date('2025-01-15'),
          },
        ],
      },
    },
    include: {
      tasks: true,
    },
  })
  console.log('✅ Created user:', JSON.stringify(user, null, 2))

  // Create another user with a task
  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@taskmaster.io',
      password: 'anotherpassword456',
      tasks: {
        create: {
          title: 'Test the taskmaster app',
          description: 'Run through all features and test edge cases',
          completed: false,
          priority: 'LOW',
        },
      },
    },
    include: {
      tasks: true,
    },
  })
  console.log('\n✅ Created second user:', JSON.stringify(user2, null, 2))

  // Fetch all users with their tasks
  const allUsers = await prisma.user.findMany({
    include: {
      tasks: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })
  console.log('\n📋 All users with tasks:', JSON.stringify(allUsers, null, 2))

  // Get task statistics
  const totalTasks = await prisma.task.count()
  const completedTasks = await prisma.task.count({
    where: { completed: true },
  })
  const incompleteTasks = await prisma.task.count({
    where: { completed: false },
  })
  const urgentTasks = await prisma.task.count({
    where: { priority: 'URGENT' },
  })

  console.log('\n📊 Task Statistics:')
  console.log(`   Total tasks: ${totalTasks}`)
  console.log(`   Completed: ${completedTasks}`)
  console.log(`   Incomplete: ${incompleteTasks}`)
  console.log(`   Urgent: ${urgentTasks}`)

  // Get tasks by priority
  const tasksByPriority = await prisma.task.groupBy({
    by: ['priority'],
    _count: {
      priority: true,
    },
  })
  console.log('\n🎯 Tasks by Priority:', JSON.stringify(tasksByPriority, null, 2))
}

main()
  .then(async () => {
    console.log('\n✨ Test completed successfully!')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })