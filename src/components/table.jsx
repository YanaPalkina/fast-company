import React from "react";
import PropTypes from "prop-types";
import TableHeder from "./TableHeder";
import TableBody from "./TablleBody";

const Table = ({ onSort, selectedSort, columns, data, children }) => {
    return (
        <table className=" table table-striped ">
            {children || (
                <>
                    <TableHeder {...{ onSort, selectedSort, columns }} />
                    <TableBody {...{ columns, data }} />
                </>
            )}
        </table>
    );
};
Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array,
};
export default Table;
