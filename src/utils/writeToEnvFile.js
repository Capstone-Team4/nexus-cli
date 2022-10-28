import { cwd } from "process";
import { writeFileSync, readFileSync } from "fs";

export default (data) => {
  const path = `${cwd()}/env.json`;
  let envJSON = JSON.parse(readFileSync(path));
  envJSON = { ...envJSON, ...data };
  console.log(envJSON);
  writeFileSync(path, JSON.stringify(envJSON), "utf8");
};
