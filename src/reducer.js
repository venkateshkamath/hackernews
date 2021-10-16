import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.payload.isLoading }; // the isLoading is in state

    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };
    case REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter((item) => item.objectID !== action.payload.id),
      };

    case HANDLE_SEARCH:
      // always return

      return { ...state, page: 0, query: action.payload };

    case HANDLE_PAGE:
      if (action.payload === "inc") {
        let nextPage = state.page + 1;
        if (nextPage > state.nbPages)
          // np is equal to 50
          nextPage = 0;
        return { ...state, page: nextPage };
      }
      if (action.payload === "dec") {
        let prevPage = state.page - 1;
        if (prevPage < 0)
          // np is equal to 50
          prevPage = state.nbPages - 1;
        return { ...state, page: prevPage };
      }

    default:
      throw Error(`No matching ${action.type} action type `);
  }
};
export default reducer;
