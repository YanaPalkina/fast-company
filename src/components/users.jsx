import React from "react";
import User from "./user";

const OnUser = ({ users, onDelete, onBookMark }) => {
  return users.map((user) => {
    return (
      <User
        key={user._id}
        user={user}
        onDelete={onDelete}
        onBookMark={onBookMark}
      />
    );
  });
};

export default OnUser;
