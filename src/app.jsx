import React, { useState, useEffect } from "react";
import api from "./api";
import SearchStatus from "./components/searchStatus";
import UserTable from "./components/usersTable";
// import OnUser from "./components/users";
import Pagination from "./components/pagination";
import { paginate } from "./utils/paginate";
import GroupList from "./components/groupList";
import _ from "lodash";

const App = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [profession, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    const handelDelete = (id) => {
        setUsers(users.filter((user) => user._id !== id));
    };
    const handleToggleBookMark = (ID) => {
        const initialValue = [...users];
        const userBookMark = initialValue.find((user) => user._id === ID);
        userBookMark.bookmark = !userBookMark.bookmark;
        setUsers(initialValue);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const PageSize = 8;

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

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);

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
                    currentSort={sortBy}
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
};

export default App;
