import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let orgRepository: InMemoryOrgRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sut = new AuthenticateUseCase(orgRepository)
  })

  it('should be able to authenticate', async () => {
    await orgRepository.create({
      name: 'Rocket Org',
      author_name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('senha123', 6),
      whatsapp: '1499183-8944',
      cep: '16402-147',
      state: 'SP',
      city: 'Lins',
      street: 'Rua Rosaria Mena Barnet, 560',
      neighborhood: 'Parque Alto da Boa Vista',
      latitude: -21.6758097,
      longitude: -49.7395013,
    })

    const { org } = await sut.execute({
      email: 'johndoe@example.com',
      password: 'senha123',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'senha123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgRepository.create({
      name: 'Rocket Org',
      author_name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('senha123', 6),
      whatsapp: '1499183-8944',
      cep: '16402-147',
      state: 'SP',
      city: 'Lins',
      street: 'Rua Rosaria Mena Barnet, 560',
      neighborhood: 'Parque Alto da Boa Vista',
      latitude: -21.6758097,
      longitude: -49.7395013,
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
