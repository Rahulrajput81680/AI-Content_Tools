// src/pages/History.js
import React, { useEffect, useState } from "react";
import { db } from "../components/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const History = ({ user }) => {
  const [historyItems, setHistoryItems] = useState([]);

  const fetchHistory = async () => {
    try {
      const q = query(collection(db, "history"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistoryItems(data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  const deleteHistoryItem = async (id) => {
    try {
      await deleteDoc(doc(db, "history", id));
      setHistoryItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <h2 className="text-2xl font-bold text-yellow-700 mb-4">Your History</h2>
      {historyItems.length === 0 ? (
        <p className="text-gray-700">No history found.</p>
      ) : (
        <ul className="space-y-4">
          {historyItems.map((item) => (
            <li
              key={item.id}
              className="bg-white p-4 rounded-lg shadow border border-yellow-200 flex justify-between items-start"
            >
              <div>
                <p>
                  <strong>Type:</strong> {item.type}
                </p>
                <p>
                  <strong>Content:</strong> {item.content}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Date:</strong>{" "}
                  {item.createdAt?.toDate
                    ? item.createdAt.toDate().toLocaleString()
                    : "N/A"}
                </p>
              </div>
              <button
                onClick={() => deleteHistoryItem(item.id)}
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
