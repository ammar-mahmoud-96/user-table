import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import UsersTable from "../../components/usersTable";
import useGetUsersList from "../../hooks/useGetUsersList";
import UserItemComponent from "../../components/userItemComponent";
import { ENDPOINTS } from "../../utils/constants";

export default function Home() {
  const [filteredUsersList, setFilteredUsersList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const { usersList, isLoading, total } = useGetUsersList({
    onSuccess: (res) => setFilteredUsersList(res),
  });

  const handleSearchInput = (e) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
    const filteredList = usersList?.filter(
      (item) =>
        item.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.last_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredUsersList(filteredList);
  };
  const handleChangePagination = async (page, perPage) => {
    fetch(`${ENDPOINTS.fetchUsers}?page=${page}&per_page=${perPage}`)
      .then((response) => response.json())
      .then((res) => {
        setFilteredUsersList(res.data);
      });
  };
  return isLoading ? (
    <div>loading....</div>
  ) : (
    <div className={styles.container}>
      <h1>Users Management</h1>
      <input
        placeholder="search"
        value={searchValue}
        onChange={handleSearchInput}
      />
      {filteredUsersList && (
        <UsersTable
          total={total}
          usersList={filteredUsersList}
          onChangePagination={handleChangePagination}
        />
      )}
      ;
    </div>
  );
}
