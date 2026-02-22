import 'dotenv/config'
import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  const existingOwner = await prisma.user.findFirst({
    where: { role: UserRole.OWNER }
  })

  if (existingOwner) {
    console.log("✅ Owner already exists")
    return
  }

  const hashedPassword = await bcrypt.hash("owner123", 10)

  await prisma.user.create({
    data: {
      name: "Owner",
      email: "owner@jivora.com",
      password: hashedPassword,
      role: UserRole.OWNER
    }
  })

  console.log("✅ Owner created successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })