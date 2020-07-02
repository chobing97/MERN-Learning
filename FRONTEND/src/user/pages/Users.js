import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState([]);
  // Run only once (empty dependency array)
  // Don't make the function in useEffect 'async' directly.
  // async function always returns Promise object and it might not fit in useEffect
  // Instead, we should make it async in indirect way which means another function in function

  useEffect(
    /* NO!! async */ () => {
      const fetchUsers = async () => {
        try {
          const responseData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + "/users"
          );

          setLoadedUsers(responseData.users);
        } catch (err) {}
      };
      fetchUsers();
    },
    [sendRequest]
  );

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
