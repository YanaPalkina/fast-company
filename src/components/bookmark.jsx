import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ onBookMark, userId, user }) => {
    const handleToggleBookMark = () => {
        onBookMark(userId);
    };

    return (
        <button className="btn" onClick={handleToggleBookMark}>
            <i className={`bi bi-bookmark${user.bookmark ? "-fill" : ""}`}></i>
        </button>
    );
};

BookMark.propTypes = {
    onBookMark: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
};

export default BookMark;
