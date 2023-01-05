import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import BlockIcon from "@material-ui/icons/Block";
import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

 function AdminListUsers() {
    const users = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          blocked: false
        },
        {
          id: 2,
          name: "Jane Doe",
          email: "jane@example.com",
          blocked: true
        },
        // Add more users here
      ];

  return (
    <div>
      <div className="mt-56">
        <TableContainer component={Paper} className="container mx-auto px-4">
          <Table className={""} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="px-4 py-2">Name</TableCell>
                <TableCell align="right" className="px-4 py-2">
                  Email
                </TableCell>
                <TableCell align="right" className="px-4 py-2">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="text-gray-700">
                  <TableCell component="th" scope="row" className="px-4 py-2">
                    {user.name}
                  </TableCell>
                  <TableCell align="right" className="px-4 py-2">
                    {user.email}
                  </TableCell>
                  <TableCell align="right" className="px-4 py-2">
                    <IconButton
                      color={user.blocked ? "secondary" : "primary"}
                      onClick={() => {
                        // Implement block/unblock logic here
                      }}
                    >
                      {user.blocked ? <BlockIcon /> : <CheckIcon />}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default AdminListUsers;
