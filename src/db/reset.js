// load .env data into process.env
require('dotenv').config();

// other dependencies
const fs = require('fs');
const chalk = require('chalk');
const Client = require('pg-native');

// PG connection setup
const connectionString =
    process.env.DATABASE_URL ||
`postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable` ;
const client = new Client();

// Loads the schema files from db/schema
const runSchemaFiles = function() {
  console.log(chalk.cyan( `-> Loading Schema Files ...` ));
  const schemaFilenames = fs.readdirSync('./src/db/schema');

  for (const fn of schemaFilenames) {
      const sql = fs.readFileSync( `./src/db/schema/${fn}` , 'utf8');
      console.log( `\t-> Running ${chalk.green(fn)}` );
      client.querySync(sql);
  }
};

const runSeedFiles = function() {
  console.log(chalk.cyan( `-> Loading Seeds ...` ));
  const schemaFilenames = fs.readdirSync('./src/db/seeds');

  for (const fn of schemaFilenames) {
      const sql = fs.readFileSync( `./src/db/seeds/${fn}` , 'utf8');
      console.log( `\t-> Running ${chalk.green(fn)}` );
      client.querySync(sql);
  }
};

const clearMigrationLogging = function() {
  console.log(chalk.cyan( `-> Clearing migration logs ...` ));
  client.querySync(`DROP TABLE IF EXISTS migration_log`);
}

try {
  if (process.env.NODE_ENV !== 'DEVELOPMENT') throw new Error("Don't try to reset the live database, dingus")
  console.log( `-> Connecting to PG using ${connectionString} ...` );
  client.connectSync(connectionString);
  runSchemaFiles();
  runSeedFiles();
  clearMigrationLogging();
  client.end();
} catch (err) {
  console.error(chalk.red( `Failed due to error: ${err}` ));
  client.end();
}