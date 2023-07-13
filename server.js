const path = require('path')
const fastify = require('fastify')({ logger: true })

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
})

const LIFF_ID = "xxxxxxx";

fastify.register(require("@fastify/view"), {
  engine: {
    ejs: require("ejs"),
  },
  root: path.join(__dirname, "views"),
});

fastify.get('/', function handler(request, reply) {
  const query = request.query;
  const state = query['liff.state'];

  console.log(state);

  if (state_url === '/register') {
    reply.view('register', { LIFF_ID })
  } else if (state_url === '/history') {
    reply.view('history', { LIFF_ID })
  } else {
    reply.view('welcome', { LIFF_ID })
  }
})

fastify.get('/welcome', function handler(request, reply) {
  reply.view('welcome', { LIFF_ID });
})

fastify.get('/register', function handler(request, reply) {
  reply.view('register', { LIFF_ID });
})

fastify.get('/history', async function handler(request, reply) {
  reply.view('history', { LIFF_ID });
})

fastify.listen({ port: 3001, address: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Listening on ${address}`);
})