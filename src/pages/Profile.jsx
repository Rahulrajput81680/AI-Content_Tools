// src/pages/Profile.js
import React from "react";

const Profile = ({ user }) => {
  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">User Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg text-gray-800">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-lg text-gray-800 mt-2">
          <strong>User ID:</strong> {user.uid}
        </p>
      </div>
    </div>
  );
};

export default Profile;
