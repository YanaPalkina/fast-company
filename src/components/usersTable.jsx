// import React from "react";
// import OnUser from "./users";
// import PropTypes from "prop-types";

// const UserTable = ({ users, onDelete, onBookMark }) => {
//     return (
//         <table className=" table table-striped ">
//             <thead>
//                 <tr>
//                     <th scope="col">Имя</th>
//                     <th scope="col">Качества</th>
//                     <th scope="col">Профессия</th>
//                     <th scope="col">Встретился, раз</th>
//                     <th scope="col">Оценка</th>
//                     <th scope="col">Избранное</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 <OnUser
//                     key={users._id}
//                     users={users}
//                     onDelete={handelDelete}
//                     onBookMark={handleToggleBookMark}
//                 />
//             </tbody>
//         </table>
//     );
// };
// UserTable.propTypes = {
//     users: PropTypes.array.isRequired,
// };

// export default UserTable;
