"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tmrm = require("azure-pipelines-task-lib/mock-run");
const path = require("path");
let taskPath = path.join(__dirname, "..", "index.js");
let tmr = new tmrm.TaskMockRunner(taskPath);
var input = "portal: bla/sdf/, sdfasdf \nschedule: easdf";
tmr.setInput("samplestring", input);
tmr.run();
