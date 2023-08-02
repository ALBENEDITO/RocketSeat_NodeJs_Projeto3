import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findbyEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
