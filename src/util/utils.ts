import { ActionValue } from "mendix";

export const executeAction = (action?: ActionValue): void => {
  if (!action) return;

  if (action.canExecute && !action.isExecuting) {
    action.execute();
  }
};