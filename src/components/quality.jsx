import React from "react";

const Qualitie = ({ qualitie }) => {
  return (
    <span key={qualitie.name} className={`badge bg-${qualitie.color} m-1`}>
      {qualitie.name}
    </span>
  );
};

export default Qualitie;
