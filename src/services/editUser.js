export const editUser = (userID, data) => {
  const requestOptions = {
    method: "PATCH",
    body: JSON.stringify(data),
  };
  return fetch(`https://reqres.in/api/users/${userID}`, requestOptions);
};
