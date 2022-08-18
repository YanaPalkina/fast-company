import React, { useState, useEffect } from "react";
import api from "../api";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import _ from "lodash";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [profession, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const PageSize = 4;

    const handelDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (userId) => {
        const initialValue = [...users];
        const userBookMark = initialValue.find((user) => user._id === userId);
        userBookMark.bookmark = !userBookMark.bookmark;
        setUsers(initialValue);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const hendelProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession.name === selectedProf.name)
            : users;

        const count = filteredUsers.length;
        if (count === 0) {
            return (
                <span className="badge bg-danger m-2 ">
                    Никто не тусанет с тобой сегодня
                </span>
            );
        }
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const userCrop = paginate(sortedUsers, currentPage, PageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {profession && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={profession}
                            onItemSelect={hendelProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt - 2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}

                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <UserTable
                        users={userCrop}
                        onDelete={handelDelete}
                        onBookMark={handleToggleBookMark}
                        onSort={handleSort}
                        selectedSort={sortBy}
                    />

                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            PageSize={PageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading ...";
};

export default Users;
