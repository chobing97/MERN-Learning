import React from "react";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "EMpire State Building",
    description: "One of the most famous ",
    imageUrl:
      "https://lh5.googleusercontent.com/p/AF1QipNJJwAmxZD8gIx2J0PZtXTHaCR-23zPvSc8p9s=w408-h544-k-no",
    address: "20 W 34th St, New York, NY 10001 미국",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: 'u1',
  },
  {
    id: "p2",
    title: "EMpire State Building",
    description: "One of the most famous ",
    imageUrl:
      "https://lh5.googleusercontent.com/p/AF1QipNJJwAmxZD8gIx2J0PZtXTHaCR-23zPvSc8p9s=w408-h544-k-no",
    address: "20 W 34th St, New York, NY 10001 미국",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: 'u2',
  },
];
const UserPlaces = () => {
  return <PlaceList items={DUMMY_PLACES} />;
};

export default UserPlaces;
