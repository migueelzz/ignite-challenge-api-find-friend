import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string
  about: string
  age: string
  energy_level: string
  size: string
  environment: string
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    energy_level,
    size,
    environment,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      energy_level,
      size,
      environment,
      org_id,
    })

    return { pet }
  }
}
