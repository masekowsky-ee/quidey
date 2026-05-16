import { subArray, sessionArray, renderFunction} from './modules/stateObjectModule.js';

import {state} from './modules/stateObjectModule.js';

import { calcUrgency, addTask, sortTasks, calculateDaysLeft, sortSubs } from "./modules/classModule.js";
import { StudySubject, Task } from './modules/classModule.js';

console.log(state)

renderFunction(state);