import Hapi from 'hapi';

const port = process.env.PORT || 3001

const server = new Hapi.Server({
  port,
  routes: {
    cors: true
  }
});


server.start().then(() => console.log(`http://localhost:${port}`)).catch(console.error);
