import { GetPetUseCase } from './get-pet'

import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { randomUUID } from 'crypto'

describe('Get Pet Use Case', () => {
  let orgsRepository: InMemoryOrgRepository
  let petsRepository: InMemoryPetsRepository
  let sut: GetPetUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get pet', async () => {
    const createPet = await petsRepository.create({
      id: randomUUID(),
      name: 'Alfredo',
      about: 'About the new pet',
      age: 'Filhote',
      energy_level: '03',
      size: 'Médio',
      environment: 'Ambiente Amplo',
      org_id: 'org-1',
    })

    const { pet } = await sut.execute({
      petId: createPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
