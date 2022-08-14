import React from "react";
import Qualitie from "./quality";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ user, onDelete, onBookMark }) => {
    const handelDelete = () => {
        onDelete(user);
    };
    return (
        <>
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                    {user.qualities.map((qualitie) => {
                        return (
                            <Qualitie key={qualitie.name} qualitie={qualitie} />
                        );
                    })}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate} / 5</td>
                <td>
                    <BookMark
                        onBookMark={onBookMark}
                        ID={user._id}
                        user={user}
                    />
                </td>

                <td>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={handelDelete}
                    >
                        Удалить
                    </button>
                </td>
            </tr>
        </>
    );
};
User.propTypes = {
    user: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookMark: PropTypes.func.isRequired,
};

export default User;
