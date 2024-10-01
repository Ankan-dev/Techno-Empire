import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../slice/user-slice';

const Layout = () => {

  const dispatch = useDispatch();
  const userExists = useSelector(state => state.user);

  const loggedInUser = async () => {
    if (userExists.user.length === 0) { // Check if user already exists in state
      try {
        const response = await axios.get('/app/student-profile');

        if (response && response.data.success) {
          dispatch(addUser(response.data)); // Add user to the state if successful
        } else {
          console.log("Failed to fetch user profile.");
        }

      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    }
  };

  useEffect(() => {
    loggedInUser();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <React.Fragment>
      <Nav />
      <Outlet />
    </React.Fragment>
  );
}

export default Layout;
