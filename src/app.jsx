import React, { useState } from "react";
import api from "./api";
import OnUser from "./components/users";
import SearchStatus from "./components/searchStatus";
import Pagination from "./components/pagination";
import { paginate } from "./utils/paginate";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [currentPage, setCurrentPage] = useState(1);

  const handelDelete = (id) => {
    const newUsers = users.filter((user) => user !== id);

    setUsers(newUsers);
  };
  const handleToggleBookMark = (ID) => {
    const initialValue = [...users];
    const userBookMark = initialValue.find((user) => user._id === ID);
    userBookMark.bookmark = !userBookMark.bookmark;
    setUsers(initialValue);
  };
  if (users.length === 0) {
    return (
      <span className="badge bg-danger m-2 ">
        Никто не тусанет с тобой сегодня
      </span>
    );
  }
  const count = users.length;
  const PageSize = 4;

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  // const paginate = (items, pageNumber, PageSize) => {
  //   const startIndex = (pageNumber - 1) * PageSize;
  //   return [...items].splice(startIndex, PageSize);
  // };

  const userCrop = paginate(users, currentPage, PageSize);

  return (
    <>
      <SearchStatus length={users.length} />
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

      <Pagination
        itemsCount={count}
        PageSize={PageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default App;
