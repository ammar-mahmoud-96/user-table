import React, { useEffect, useState } from "react";
import { ENDPOINTS } from "../utils/constants";

export default function useGetUsersList({ onSuccess, page = 1, perPage = 2 }) {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [total, setTotal] = useState();

  const fakeData = [
    {
      id: 10,
      email: "george.bluth@reqres.in",
      first_name: "Georgeqq",
      last_name: "Bluth",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
    },

    {
      id: 20,
      email: "janet.weaver@reqres.in",
      first_name: "Janetqq",
      last_name: "Weaver",
      avatar: "https://reqres.in/img/faces/2-image.jpg",
    },

    {
      id: 30,
      email: "emma.wong@reqres.in",
      first_name: "Emmaqq",
      last_name: "Wong",
      avatar: "https://reqres.in/img/faces/3-image.jpg",
    },

    {
      id: 40,
      email: "eve.holt@reqres.in",
      first_name: "Eveqq",
      last_name: "Holt",
      avatar: "https://reqres.in/img/faces/4-image.jpg",
    },

    {
      id: 50,
      email: "charles.morris@reqres.in",
      first_name: "Charlesqq",
      last_name: "Morris",
      avatar: "https://reqres.in/img/faces/5-image.jpg",
    },
    {
      id: 1,
      email: "george.bluth@reqres.in",
      first_name: "George",
      last_name: "Bluth",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
    },

    {
      id: 2,
      email: "janet.weaver@reqres.in",
      first_name: "Janet",
      last_name: "Weaver",
      avatar: "https://reqres.in/img/faces/2-image.jpg",
    },

    {
      id: 3,
      email: "emma.wong@reqres.in",
      first_name: "Emma",
      last_name: "Wong",
      avatar: "https://reqres.in/img/faces/3-image.jpg",
    },

    {
      id: 4,
      email: "eve.holt@reqres.in",
      first_name: "Eve",
      last_name: "Holt",
      avatar: "https://reqres.in/img/faces/4-image.jpg",
    },

    {
      id: 5,
      email: "charles.morris@reqres.in",
      first_name: "Charles",
      last_name: "Morris",
      avatar: "https://reqres.in/img/faces/5-image.jpg",
    },
  ];
  useEffect(() => {
    setIsloading(true);
    fetch(`${ENDPOINTS.fetchUsers}?page=${page}&per_page=${perPage}`)
      .then((response) => response.json())
      .then((res) => {
        setUsersList(res.data);
        setTotalPages(res.total_pages);
        setTotal(res.total);
        onSuccess?.(res.data);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  const fetchUsersList = () => {};
  return { usersList, isLoading, total, totalPages };
}
