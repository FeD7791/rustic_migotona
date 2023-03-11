import { Action, Reducer, Store, createStore } from "redux";

interface StepAction extends Action {
  step: number;
}

let reducer: Reducer<number> = (state: number = 0, action: Action) => {
  switch (action.type) {
    case "UP":
      return state + (<StepAction>action).step;

    case "DOWN":
      return state - (<StepAction>action).step;
    default:
      return state;
  }
};

class CounterActions {
  static UpAction(step: number): StepAction {
    return { type: "UP", step: step };
  }
  static DownAction(step: number): StepAction {
    return { type: "DOWN", step: step };
  }
}
let store: Store<number> = createStore<number>(reducer);
