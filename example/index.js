const Fastify = require('fastify')
const fastify = Fastify()

fastify.get('/', function (request, reply) {
  console.log('My signup route')
  
  reply.send("Success")
})

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
      console.error(err)
      process.exit(1)
  }
  console.log(`Server listening on ${address}`)
})