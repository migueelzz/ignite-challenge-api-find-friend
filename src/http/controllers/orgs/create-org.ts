import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'

const createOrgBodySchema = z.object({
  name: z.string().min(1),
  author_name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  whatsapp: z.string(),
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const body = createOrgBodySchema.parse(request.body)

  try {
    const createOrgUseCase = makeCreateOrgUseCase()

    const { org } = await createOrgUseCase.execute(body)

    return reply.status(201).send(org)
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
