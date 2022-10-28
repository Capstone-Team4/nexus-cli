import inquirer from "inquirer";
import { log, logSuccess } from "../utils/logger.js";
import createDockerfile from "../utils/createDockerfile.js";
import createDockerImage from "../utils/createDockerImage.js";
import createECR from "../utils/createECR.js";
import pushToERC from "../utils/pushToERC.js";
import writeToEnvFile from "../utils/writeToEnvFile.js";

const build = async () => {
  const inputs = await inquirer.prompt([
    {
      name: "port",
      default: 4000,
      type: "input",
      message:
        "Which port would you like to expose for your server in production? Press 'Enter' for default:",
    },
    {
      name: "imageName",
      type: "input",
      default: "nexus-image",
      message: "What would you like to name your docker image?",
    },
    {
      name: "deploymentType",
      type: "list",
      message: "Would you like to deploy on AWS or Google Cloud?",
      choices: ["AWS", "Google Cloud"],
      default: 0,
    },
    {
      name: "awsRegion",
      type: "list",
      message: "What region would you like to deploy to?",
      when: (input) => input.deploymentType === "AWS",
      choices: ["us-east-1", "us-west-1"],
      default: 0,
    },
  ]);

  writeToEnvFile(inputs);
  log("Getting your server ready for deployment...");
  createDockerfile(inputs.port);
  createDockerImage(inputs.imageName);
  logSuccess("Your server is ready for deployment!");

  createECR();
  pushToERC();
};

export default async () => {
  await build();
};
