import { describe, it, expect } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { compare } from 'bcryptjs'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

describe('Create Org Use Case', () => {
  it('should be able to create a new org', async () => {
    const orgsRepository = new InMemoryOrgRepository()
    const createOrgUseCase = new CreateOrgUseCase(orgsRepository)

    const { org } = await createOrgUseCase.execute({
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

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const orgsRepository = new InMemoryOrgRepository()
    const createOrgUseCase = new CreateOrgUseCase(orgsRepository)

    const { org } = await createOrgUseCase.execute({
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

    const isPasswordCorrectHashed = await compare('senha123', org.password)

    expect(isPasswordCorrectHashed).toBe(true)
  })

  it('should not be able to create org with same email twice', async () => {
    const orgsRepository = new InMemoryOrgRepository()
    const createOrgUseCase = new CreateOrgUseCase(orgsRepository)

    const email = 'johndoe@example.com'

    await createOrgUseCase.execute({
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

    await expect(() =>
      createOrgUseCase.execute({
        name: 'Rocket Org',
        author_name: 'John Doe',
        email,
        password: 'senha123',
        whatsapp: '123456789',
        cep: '12345678',
        state: 'SP',
        city: 'Lins',
        neighborhood: 'Parque ALto da Boa Vista',
        street: 'Rua Rosária Mena Barnet',
        latitude: -21.6758147,
        longitude: -49.7395013,
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
