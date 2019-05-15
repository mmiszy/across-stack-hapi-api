import { getServer } from "./server";

(async () => {
  try {
    const appServer = await getServer();

    // await initDb() // @todo

    await appServer.start();
    console.info("Server running at:", appServer.info.uri);
  } catch (err) {
    // handle exceptions, Sentry, etc
    process.exit(1);
  }
})();
