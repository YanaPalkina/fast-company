import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ onBookMark, ID, user }) => {
    const handleToggleBookMark = () => {
        onBookMark(ID);
    };
    return (
        <button className="btn" onClick={handleToggleBookMark}>
            <i className={`bi bi-bookmark${user.bookmark ? "-fill" : ""}`}></i>
        </button>
    );
};

BookMark.propTypes = {
    onBookMark: PropTypes.func.isRequired,
    ID: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
};

export default BookMark;
