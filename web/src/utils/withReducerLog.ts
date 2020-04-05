type Action = {
  readonly type: string;
};

export const withReducerLog = <S, A extends Action>(
  reducer: (state: S, action: A) => S
) => {
  return (state: S, action: A) => {
    const newState = reducer(state, action);
    console.log(action.type);
    console.log("old", state);
    console.log("new", newState);
    return newState;
  };
};
