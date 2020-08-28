"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inputString = tl.getInput("samplestring", false);
            console.log(inputString);
            if (inputString === undefined) {
                return;
            }
            var projectWithText = inputString.split("\n");
            projectWithText.forEach((project) => {
                var x = project.split(":");
                var name = x[0];
                var fullPahts = x[1];
                var paths = fullPahts.split(",");
                console.log("Project: " + name);
                paths.forEach((path) => console.log(" - " + path));
            });
            var result = yield execShellCommand("git diff HEAD HEAD~ --name-only");
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
function execShellCommand(cmd) {
    const exec = require("child_process").exec;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            resolve(stdout ? stdout : stderr);
        });
    });
}
run();
