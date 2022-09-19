import express from "express";
import config from "config";
import connect from "./utils/connects";
import logger from "./utils/logger";
import routes from "./routes";
import deserializedUser from "./middleware/deserializeUser";

const port = config.get<number>("port");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(deserializedUser);

app.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port}`);

  await connect();
  routes(app);
});
