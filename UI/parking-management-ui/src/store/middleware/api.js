import * as actions from "../../store/apiActionCreator";
const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    const { method, data, onStart, onSuccess, onError } = action.payload;
    onStart && dispatch({ type: onStart });
    next(action);
    try {
      const response = await method(data);
      setTimeout(() => {
        // General
        dispatch(actions.apiCallSuccess(response.data));
        // Specific
        if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
      }, 250);
    } catch (error) {
      // General
      dispatch(actions.apiCallFailed(error));
      // Specific
      if (onError) dispatch({ type: onError, payload: error });
    }
  };
export default api;
