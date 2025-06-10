/* eslint-disable @typescript-eslint/no-explicit-any */
// Import the function that schedules a recurring task based on cron
import { addRepeatingTaskCron } from "./bullmq";

// Define a unique global key used to control whether the task has already been scheduled
const globalKey = "__hst_task_scheduled__";

// Check if the task has already been scheduled during the current server lifecycle
if (!(globalThis as any)[globalKey]) {
  // Schedule the "getSeatsAvailability" task to run every day at midnight
  addRepeatingTaskCron("getSeatsAvailability", {}, "0 0 * * *")
    .then(() => {
      // Mark as scheduled to prevent duplicate executions
      (globalThis as any)[globalKey] = true;

      // Confirm in the console that the task was successfully scheduled
      console.log("⏰ Daily task successfully scheduled!");
    })
    .catch((err: any) => {
      // Log an error if the task could not be scheduled
      console.error("Error scheduling the task:", err);
    });
}
