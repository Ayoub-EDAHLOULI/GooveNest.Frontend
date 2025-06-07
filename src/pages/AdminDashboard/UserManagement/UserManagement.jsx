import "./UserManagement.scss";
import { useState, useEffect } from "react";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaUserShield,
  FaUser,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaginatedUsers } from "../../../store/Actions/userActions";
import { getPrimaryRole } from "../../../utils/roleUtils"; // Assuming you have a utility function to get primary role

function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch users (replace with actual API call)
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.paginatedUsers);
  const totalUsers = useSelector((state) => state.user.totalUsers);

  console.log("Total Users:", totalUsers);
  console.log("Users:", users);

  useEffect(() => {
    dispatch(fetchPaginatedUsers(currentPage, usersPerPage, searchTerm));
  }, [dispatch, currentPage, usersPerPage, searchTerm]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle user actions
  const handleEdit = (userId) => {
    console.log("Edit user:", userId);
    // Implement edit functionality
  };

  const handleDelete = (userId) => {
    console.log("Delete user:", userId);
    // Implement delete functionality
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>

      <div className="controls">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="users-table">
        <div className="table-header">
          <div className="col name">
            <span>Name</span>
            <FaSort className="sort-icon" />
          </div>
          <div className="col email">
            <span>Email</span>
            <FaSort className="sort-icon" />
          </div>
          <div className="col role">
            <span>Role</span>
            <FaSort className="sort-icon" />
          </div>
          <div className="col status">
            <span>Status</span>
            <FaSort className="sort-icon" />
          </div>
          <div className="col joined">
            <span>Joined</span>
            <FaSort className="sort-icon" />
          </div>
          <div className="col actions">
            <span>Actions</span>
            <FaSort className="sort-icon" />
          </div>
        </div>
        {users.length > 0 ? (
          users.map((user) => (
            <div className="table-row" key={user.id}>
              <div className="col name">
                <div className="user-avatar">
                  {getPrimaryRole(user.roles) === "ADMIN" ? (
                    <FaUserShield />
                  ) : (
                    <FaUser />
                  )}
                </div>
                <span>{user.userName}</span>
              </div>
              <div className="col email">{user.email}</div>
              <div className="col role">
                <span className={`role-badge ${getPrimaryRole(user.roles)}`}>
                  {getPrimaryRole(user.roles)}
                </span>
              </div>

              <div className="col status">
                <span
                  className={`status-badge ${
                    user.status === 0 ? "active" : "inactive"
                  }`}
                >
                  {user.status === 0 ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="col joined">{formatDate(user.createdAt)}</div>
              <div className="col actions">
                <button
                  className="action-btn edit"
                  onClick={() => handleEdit(user.id)}
                >
                  <FaEdit />
                </button>
                <button
                  className={`action-btn toggle-status ${
                    user.status === "active" ? "deactivate" : "activate"
                  }`}
                  onClick={() =>
                    console.log("Toggle status for user:", user.id)
                  }
                >
                  {user.status === "active" ? "Deactivate" : "Activate"}
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDelete(user.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            No users found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}

export default UserManagement;
