import React from "react";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";

import { styled } from "@mui/system";
import { Link } from "react-router-dom";

export default function UsersTable({ usersList, onChangePagination, total }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const handleChangePage = (event, newPage) => {
    onChangePagination?.(newPage + 1, rowsPerPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const PerPage = parseInt(event.target.value, 10);
    setRowsPerPage(PerPage);
    if (PerPage < 0) {
      setPage(1);
      onChangePagination?.(1, PerPage);
    } else {
      onChangePagination?.(page + 1, PerPage);
    }
  };

  return (
    <Root sx={{ maxWidth: "100%", width: 800 }}>
      <table aria-label="custom pagination table">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((row) => (
            <tr key={row.id}>
              <td>{row.first_name}</td>
              <td style={{ width: 160 }} align="right">
                {row.last_name}
              </td>
              <td style={{ width: 160 }} align="right">
                {row.email}
              </td>
              <td style={{ width: 160 }} align="right">
                <Link to={`/userDetails/${row.id}`}>view</Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[2, 4, 6, { label: "All", value: -1 }]}
              rowsPerPage={rowsPerPage}
              page={page}
              count={total || 0}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </Root>
  );
}

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};
const Root = styled("div")(
  ({ theme, page }) => `
    table {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      border-collapse: collapse;
      width: 100%;
    }
  
    td,
    th {
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[800] : grey[200]
      };
      text-align: left;
      padding: 8px;
    }
  
    th {
      background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    }
   
    `
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;
