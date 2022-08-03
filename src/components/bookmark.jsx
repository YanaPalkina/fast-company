import React from "react";

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

export default BookMark;
