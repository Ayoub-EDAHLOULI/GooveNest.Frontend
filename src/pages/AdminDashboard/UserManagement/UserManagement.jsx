import "./UserManagement.scss";
import { useState, useEffect, useContext } from "react";
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
import { getPrimaryRole } from "../../../utils/roleUtils";
import AddUserPopup from "./Popups/AddUserPopup/AddUserPopup";
import { updateUser } from "../../../store/Actions/userActions";
import { ToastContext } from "../../../context/ToastContext";

function UserManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);

  // Fetch users (replace with actual API call)
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.paginatedUsers);
  const totalUsers = useSelector((state) => state.user.totalUsers);

  const { notify } = useContext(ToastContext);

  console.log("setSearchQuery", searchQuery);

  useEffect(() => {
    dispatch(fetchPaginatedUsers(currentPage, pageSize, searchQuery));
  }, [dispatch, currentPage, pageSize, searchQuery]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter users based on status
  const filteredUsers = users.filter((user) => {
    if (statusFilter === "all") return true; // No filter
    return user.status === (statusFilter === "active" ? 0 : 1); // Active or inactive
  });

  // Change user status
  const changeStatus = (userId) => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      const updatedStatus = user.status === 0 ? 1 : 0; // Toggle status
      dispatch(updateUser({ id: user.id, status: updatedStatus }))
        .then(() => {
          notify(
            `User ${
              updatedStatus === 0 ? "activated" : "deactivated"
            } successfully`,
            "success"
          );
          // Optionally, refresh the user list
          dispatch(fetchPaginatedUsers(currentPage, pageSize, searchQuery));
        })
        .catch((error) => {
          notify(error.message || "Failed to change user status", "error");
        });
    }
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters">
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            className="add-user-btn"
            onClick={() => setShowAddUserPopup(true)}
          >
            Add User
          </button>
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
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
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
                    user.status === 1 ? "deactivate" : "activate"
                  }`}
                  onClick={() => changeStatus(user.id)}
                >
                  {user.status === 1 ? "Deactivate" : "Activate"}
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

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(totalUsers / pageSize)}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage * pageSize >= totalUsers}
        >
          Next
        </button>
      </div>

      {/* Add User Popup */}
      {showAddUserPopup && (
        <AddUserPopup closeModal={() => setShowAddUserPopup(false)} />
      )}
    </div>
  );
}

export default UserManagement;
