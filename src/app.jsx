import React, { useState, useEffect } from "react";
import api from "./api";
import SearchStatus from "./components/searchStatus";
import OnUser from "./components/users";
import Pagination from "./components/pagination";
import { paginate } from "./utils/paginate";
import GroupList from "./components/groupList";

const App = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [profession, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();

    const handelDelete = (id) => {
        const newUsers = users.filter((user) => user._id !== id);

        setUsers(newUsers);
    };
    const handleToggleBookMark = (ID) => {
        const initialValue = [...users];
        const userBookMark = initialValue.find((user) => user._id === ID);
        userBookMark.bookmark = !userBookMark.bookmark;
        setUsers(initialValue);
    };

    const PageSize = 2;

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
    const userCrop = paginate(filteredUsers, currentPage, PageSize);
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
                <table className=" table table-striped ">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                        </tr>
                    </thead>
                    <tbody>
                        <OnUser
                            key={users._id}
                            users={userCrop}
                            onDelete={handelDelete}
                            onBookMark={handleToggleBookMark}
                        />
                    </tbody>
                </table>
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
