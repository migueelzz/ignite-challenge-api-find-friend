import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

describe('Create Pet Use Case', () => {
  let orgsRepository: InMemoryOrgRepository
  let petsRepository: InMemoryPetsRepository
  let sut: CreatePetUseCase

  beforeEach(async () => {
    orgsRepository = new InMemoryOrgRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create a new pet', async () => {
    const org = await orgsRepository.create({
      id: 'org-1',
      name: 'Rocket Org',
      author_name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'senha123',
      whatsapp: '123456789',
      cep: '12345678',
      state: 'SP',
      city: 'Lins',
      neighborhood: 'Parque Alto da Boa Vista',
      street: 'Rua Rosária Mena Barnet',
      latitude: -21.6758147,
      longitude: -49.7395013,
    })

    const { pet } = await sut.execute({
      name: 'Alfredo',
      about: 'About the new pet',
      age: 'Filhote',
      energy_level: '03',
      size: 'Médio',
      environment: 'Ambiente Amplo',
      org_id: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
