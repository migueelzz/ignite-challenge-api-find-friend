import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string().min(1),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    environment: z.string(),
  })

  const { name, about, age, energy_level, size, environment } =
    createPetBodySchema.parse(request.body)

  const createPetParams = z.object({
    orgId: z.string(),
  })

  const { orgId } = createPetParams.parse(request.params)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    const pet = await createPetUseCase.execute({
      name,
      about,
      age,
      energy_level,
      size,
      environment,
      org_id: orgId,
    })

    return reply.status(201).send(pet)
  } catch (err) {
    console.log(err)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
}
