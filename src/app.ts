import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { error } from 'console'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }
  if (env.NODE_ENV !== 'prodution') {
    console.error(error)
  } else {
    // validar em dtadog newrelic etc
  }
  return reply.status(500).send({ message: 'Internal server error.' })
})
