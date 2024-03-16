import { FastifyInstance } from 'fastify'

import { createPet } from './create-pet'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/orgs/:orgId/pets', createPet)
}
