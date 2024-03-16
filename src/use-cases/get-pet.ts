import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetNotFoundError } from './errors/pet-not-found-error'

interface GetPetsUseCaseRequest {
  petId: string
}

interface GetPetsUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetsUseCaseRequest): Promise<GetPetsUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return {
      pet,
    }
  }
}
