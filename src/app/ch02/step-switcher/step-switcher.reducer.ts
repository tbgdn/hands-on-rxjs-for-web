import {Action} from '@ngrx/store';


enum StepSwitcherActions{
  SWITCH = 'SWITCH'
}

export class StepSwitcherAction implements Action{
  type = StepSwitcherActions.SWITCH;
  constructor(public payload: number) {}
}

const initialState = 1;

export const StepSwitcherReducer = (state: number = initialState, action: StepSwitcherAction) => {
  switch (action.type) {
    case StepSwitcherActions.SWITCH:
      return action.payload;
    default:
      return state;
  }
};
