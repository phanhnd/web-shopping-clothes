import React, { useState, useEffect } from "react";
import "./listbill.css";

const ListBill = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/orders/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setOrders(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [token]);

  const handleStatusChange = (id, newStatus) => {
    fetch(`http://localhost:5000/orders/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then(() => {
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, status: newStatus } : o))
        );
      });
  };

  const filteredOrders = orders.filter((o) =>
    o.customer?.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
    <div className="list-bill">
      <h1>All Bills List</h1>

      <input
        type="text"
        placeholder="Search by customer name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="listbill-search"
      />

      <div className="listbill-format-main">
        <p>Order ID</p>
        <p>Customer</p>
        <p>Created Date</p>
        <p>Status</p>
        <p>Total</p>
        <p>Actions</p>
      </div>

      {currentOrders.map((order) => (
        <div className="listbill-format" key={order._id}>
          <p>{order._id}</p>
          <p>{order.customer?.name}</p>
          <p>{new Date(order.createdAt).toLocaleDateString()}</p>
          <p>
            <select
              value={order.status || "pending"}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </p>
          <p>${order.total}</p>
          <p>
            <button
              onClick={() => alert(JSON.stringify(order, null, 2))}
              className="btn-detail"
            >
              View
            </button>
          </p>
        </div>
      ))}

      {/* Pagination buttons */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={currentPage === idx + 1 ? "active" : ""}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListBill;
