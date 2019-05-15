import { getServer } from "./server";

(async () => {
  const appServer = await getServer();

  // await initDb() // @todo

  await appServer
    .start()
    .then(() => console.log(`Working!`))
    .catch(console.error);
})();
