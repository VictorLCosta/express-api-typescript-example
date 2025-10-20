import knex, { Knex } from "knex";
import c from "@/config";

const config: Knex.Config = {
  client: "tedious",
  connection: c.connectionString,
  pool: { min: 2, max: 10 },
};

export const db = knex(config);