import React from "react";
import OnUser from "./users";
import PropTypes from "prop-types";

const UserTable = ({
    users,
    onSort,
    currentSort,
    handelDelete,
    handleToggleBookMark,
}) => {
    const handleSort = (item) => {
        if (currentSort.iter === item) {
            onSort({
                ...currentSort,
                order: currentSort.order === "asc" ? "desc" : "asc",
            });
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };

    return (
        <table className=" table table-striped ">
            <thead>
                <tr>
                    <th onClick={() => handleSort("name")} scope="col">
                        Имя
                    </th>
                    <th scope="col">Качества</th>
                    <th
                        onClick={() => handleSort("profession.name")}
                        scope="col"
                    >
                        Профессия
                    </th>
                    <th
                        onClick={() => handleSort("completedMeetings")}
                        scope="col"
                    >
                        Встретился, раз
                    </th>
                    <th onClick={() => handleSort("rate")} scope="col">
                        Оценка
                    </th>
                    <th onClick={() => handleSort("bookmark")} scope="col">
                        Избранное
                    </th>
                </tr>
            </thead>
            <tbody>
                <OnUser
                    key={users._id}
                    users={users}
                    onDelete={handelDelete}
                    onBookMark={handleToggleBookMark}
                />
            </tbody>
        </table>
    );
};
UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    handelDelete: PropTypes.func.isRequired,
    handleToggleBookMark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    currentSort: PropTypes.object.isRequired,
};

export default UserTable;
