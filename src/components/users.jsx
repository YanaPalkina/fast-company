import React from "react";
import User from "./user";

const OnUser = ({ users, handelDelete, onBookMark }) => {
    return users.map((user) => {
        return (
            <User
                key={user._id}
                user={user}
                onDelete={handelDelete}
                onBookMark={onBookMark}
            />
        );
    });
};

export default OnUser;
