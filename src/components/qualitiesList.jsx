import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./quality";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((qualitie) => {
                return <Qualitie key={qualitie._id} qualitie={qualitie} />;
            })}
        </>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array,
};

export default QualitiesList;
