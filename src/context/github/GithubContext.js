import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: []
  };

// get search results

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (text) => {

    const params= new URLSearchParams({
      q: text
    })

    const response = await fetch(` https://api.github.com/search/users?${params}`);

    const {items} = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

//search single user

const getUser = async (login) => {

  const response = await fetch(`https://api.github.com/users/${login}`);

  if(response.status === 404)
  {
    window.location= '/notfound'
  }
  else{
    const data = await response.json();

    dispatch({
      type: "GET_USER",
      payload: data,
    })
  }
  
};

const getUserRepos = async (login) => {

  const params= new URLSearchParams({
    sort: 'created',
    per_page: 10, 
  })

  const response = await fetch(` https://api.github.com/users/${login}/repos?${params}`);

  const data = await response.json();

  dispatch({
    type: "GET_REPOS",
    payload: data,
  });
};

  // clear users
const clearUsers = () => dispatch({type:
  'CLEAR_USERS'})

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user:state.user,
        getUser,
        searchUsers,
        clearUsers,
        repos: state.repos,
        getUserRepos,
      
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
