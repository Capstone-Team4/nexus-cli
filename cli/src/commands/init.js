import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { asciiArt } from "../utils/logger.js";
import installHandler from "../utils/installHandler.js";
import initProject from "../utils/initProject.js";
import createMeshConfig from "../utils/createMeshConfig.js";
import validateConnectionString from "../utils/validateConnectionString.js";

const init = async () => {
  const input = await inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "Enter the name of the data source",
      validate(value) {
        if (value.length) {
          return true;
        }

        return "Enter a name for the data source";
      },
    },
    {
      name: "connectionString",
      type: "input",
      message: "Enter your postgres connection string:",
      validate(value) {
        if (value.length) {
          return true;
        }

        return "Please enter a postgres connection string";
      },
    },
    {
      name: "confirm-postgres-connection",
      type: "confirm",
      message: "Confirm postgres connection information?",
    },
  ]);
  let spinner = createSpinner(
    "Validating your postgres connection string."
  ).start();
  await validateConnectionString(input.connectionString);
  spinner.success({ text: "Database connection string is valid." });

<<<<<<< HEAD
  spinner = createSpinner("Initializing your project folder.\n").start();
=======
  let spinner = createSpinner("Initializing your project folder...\n").start();
>>>>>>> main

  initProject();
  spinner.success({ text: "Project folder has been initialized." });

  spinner = createSpinner("Installing mesh handlers...\n").start();

  installHandler("postgres");
  spinner.success({ text: "Handlers installed." });

<<<<<<< HEAD
  spinner = createSpinner("Generating mesh server.\n").start();
=======
  spinner = createSpinner("Generating mesh server...\n").start();

>>>>>>> main
  createMeshConfig(input.name, input.connectionString);
  spinner.success({
    text: 'Your server is ready to run. Use "$ nexus dev" to run in dev mode',
  });
};

export default async () => {
  asciiArt("GraphQL");
  await init();
};
