import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Optional: Add an error state to display error messages

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError(null); // Clear previous errors

      try {
        // Make the API request with the token
        const response = await axios.get(
          "http://localhost:5002/api/user/allusers",
          {
            withCredentials: true, // Ensures cookies are sent with the request
          }
        );

        // Set the users data from the response
        setAllUsers(response.data);
      } catch (error) {
        console.log("Error in useGetAllUsers: " + error);
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false); // Turn off the loading state after the request completes
      }
    };

    getUsers();
  }, []); // Empty dependency array to run the effect only once after mount

  return [allUsers, loading, error]; // Optionally return error state for UI handling
}

export default useGetAllUsers;
