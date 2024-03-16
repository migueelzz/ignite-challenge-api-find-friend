import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repositories'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const useCase = new CreatePetUseCase(petsRepository, orgsRepository)

  return useCase
}
