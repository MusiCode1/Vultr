
import "dotenv/config";
import { Command } from "commander";
import * as process from "node:process";


import { start_server } from "./src/start-server";
import { delete_server } from "./src/delete-server";


const program = new Command();

program
    .command("start")
    .action(start_server)


program
    .command("stop")
    .action(delete_server)

program.parse(process.argv);
