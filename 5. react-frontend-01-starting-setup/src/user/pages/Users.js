import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'BC Choi',
      image: 'https://lh3.googleusercontent.com/ogw/ADGmqu9qCgrDyJghqs4xIDt_xIsp90pT_J7O3D6h6nC_=s32-c-mo',
      places: 3
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
