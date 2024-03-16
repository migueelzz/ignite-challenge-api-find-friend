import { Pet, Prisma } from '@prisma/client'
import { FindAllParams, PetsRepository } from '../pets-repository'
import { InMemoryOrgRepository } from './in-memory-orgs-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  constructor(private orgsRepository: InMemoryOrgRepository) {}

  public items: Pet[] = []

  async findAll(params: FindAllParams) {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city,
    )

    const pets = this.items
      .filter((item) => orgsByCity.some((org) => org.city === item.org_id))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energy_level ? item.energy_level === params.energy_level : true,
      )
      .filter((item) =>
        params.environment ? item.environment === params.environment : true,
      )

    return pets
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id) ?? null

    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      ...data,
    }

    this.items.push(pet)

    return pet
  }
}
