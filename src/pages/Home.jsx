import React from "react";
import UserSearch from "../components/users/UserSearch";
import UserResults from "../components/users/UserResults";

function home() {
  return (
    <div className="h-auto items-center"> 
      <UserSearch />
      <UserResults />
      </div>
  );
}

export default home;
