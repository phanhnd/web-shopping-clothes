import React, { useState, useEffect } from "react";
import "./ListUser.css";
import axios from "axios";

const ListUser = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Lấy tất cả users hoặc kết quả tìm kiếm
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        let res;

        if (search.trim() === "") {
          res = await axios.get("http://localhost:5000/admin/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          res = await axios.get(
            `http://localhost:5000/admin/search?term=${search}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        setUsers(res.data);
        setCurrentPage(1); // Reset về trang đầu sau khi tìm kiếm
      } catch (err) {
        console.error("Lỗi khi lấy danh sách người dùng: ", err);
      }
    };

    fetchUsers();
  }, [search]);

  // Logic phân trang
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="list-user">
      <h1>All User List</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="listuser-search"
      />

      <div className="listuser-format-main">
        <p>#</p>
        <p>Name</p>
        <p>Address</p>
        <p>Phone</p>
        <p>Sex</p>
        <p>Birthday</p>
        <p>Shopping History</p>
      </div>

      {currentUsers.map((user, index) => (
        <div key={user._id} className="listuser-format">
          <p>{indexOfFirstUser + index + 1}</p>
          <p>{user.name}</p>
          <p>{user.address}</p>
          <p>{user.phone}</p>
          <p>{user.sex}</p>
          <p>{new Date(user.birthday).toLocaleDateString()}</p>
          <p>{user.historyShopping?.length || 0}</p>
        </div>
      ))}

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            className={currentPage === idx + 1 ? "active" : ""}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListUser;
