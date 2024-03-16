import { describe, it, expect, beforeEach } from 'vitest'
import { SearchPetsUseCase } from './search-pets'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

describe('Search Pets Use Case', () => {
  let orgsRepository: InMemoryOrgRepository
  let petsRepository: InMemoryPetsRepository
  let sut: SearchPetsUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search pets', async () => {
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

    await petsRepository.create({
      name: 'Theo',
      about: 'About the new pet',
      age: 'Filhote',
      energy_level: '04',
      size: 'Pequeno',
      environment: 'Ambiente Amplo',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Alfredo',
      about: 'About the new pet',
      age: 'Filhote',
      energy_level: '03',
      size: 'Médio',
      environment: 'Ambiente Amplo',
      org_id: org.id,
    })

    const { pets } = await sut.execute({
      city: 'Lins',
    })

    console.log(pets)

    expect(pets).toHaveLength(2)
  })
})
