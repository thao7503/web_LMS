import React, { useEffect, useState } from "react";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";

// Function to calculate the number of days between two dates
const calculateDaysLeft = (returnDate: string): number => {
  const currentDate = new Date();
  const dueDate = new Date(returnDate);
  const timeDiff = dueDate.getTime() - currentDate.getTime();
  const daysLeft = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days
  return Math.ceil(daysLeft); // Round up to the next whole day
};

const DueSoonNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { authState } = useOktaAuth(); // Destructure authState from useOktaAuth()

  useEffect(() => {
    const fetchDueSoonBooks = async () => {
      if (!authState || !authState.isAuthenticated || !authState.accessToken) {
        console.error("User is not authenticated or access token is missing");
        setLoading(false);
        return;
      }

      try {
        // Send token in Authorization header
        const response = await axios.get(
          "http://localhost:8080/api/checkouts/due-soon",
          {
            headers: {
              Authorization: `Bearer ${authState.accessToken.accessToken}`, // Use Okta's access token
              "Content-Type": "application/json",
            },
          }
        );

        setNotifications(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sách sắp đến hạn trả", error);
        setLoading(false);
      }
    };

    if (authState && authState.isAuthenticated) {
      fetchDueSoonBooks();
    } else {
      setLoading(false); // Stop loading if the user is not authenticated
    }
  }, [authState]); // Re-run effect when authState changes

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="container">
      <h2>Thông báo sách sắp đến hạn trả</h2>
      {notifications.length === 0 ? (
        <p>Không có sách nào sắp đến hạn trả.</p>
      ) : (
        <ul>
          {notifications.map((notification, index) => {
            const daysLeft = calculateDaysLeft(notification.returnDate);
            const isDueSoon = daysLeft < 3; // Highlight if due within 3 days

            return (
              <li
                key={index}
                style={{
                  color: isDueSoon ? "red" : "black", // Apply red color if due soon
                }}
              >
                Bạn có hạn trả sách vào ngày {notification.returnDate} (
                {daysLeft} ngày còn lại)
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DueSoonNotifications;
