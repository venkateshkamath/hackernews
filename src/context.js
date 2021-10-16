import React, { useContext, useEffect, useReducer } from "react";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";
import reducer from "./reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true, // true by default
  hits: [],
  query: "react",
  page: 0,
  nbPages: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //fetching the stories
  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING, payload: { isLoading: true } });
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // handleSearch

  const handleSearch = (query) => {
    // query changes at every instance

    dispatch({ type: HANDLE_SEARCH, payload: query });
  };

  //handlePage
  const handlePage = (pageValue) => {
    dispatch({type:HANDLE_PAGE, payload:pageValue})
  };

  // remove the story
  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: { id } }); // the id given
  };

  //useEffect
  useEffect(() => {
    //calling the function
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);
  return (
    <AppContext.Provider value={{ ...state, removeStory, handleSearch, handlePage }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
