import { appConfig } from "./../appConfig";
import chalk from "chalk";

type Action = {
  readonly type: string;
};

export const withReducerLog = <S, A extends Action>(reducer: (state: S, action: A) => S) => {
  return (state: S, action: A) => {
    const newState = reducer(state, action);
    if (appConfig.logReducerChange) {
      console.log(chalk.bgYellow(action.type));
      console.log(chalk.bgGreen("old"), state);
      console.log(chalk.bgGreen("new"), newState);
    }
    return newState;
  };
};
