import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repositories'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new AuthenticateUseCase(orgsRepository)

  return useCase
}
