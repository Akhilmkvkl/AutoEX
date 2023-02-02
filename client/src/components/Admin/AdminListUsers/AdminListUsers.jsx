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
import { useState } from "react";
import { axiosAdminInstance } from "../../../instance/axios";
import { useSelector } from "react-redux";
import { Modal } from 'antd';
import { clearUserLoginDetails } from "../../../Redux/adminReducer";
import { useDispatch } from "react-redux";
function AdminListUsers() {
  const Dispatch = useDispatch();
  const userdetails = useSelector((state) => state.admin.userDetails);
  const [users, setusers] = useState([]);
  useEffect(() => {
    async function getallusers() {
      try {
        const res = await axiosAdminInstance.get("/users");
        console.log(res);
        setusers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    }

    getallusers();
  }, [users]);

  async function block(id) {
    console.log(id);

    try {
      const res = await axiosAdminInstance.post("/users/blockuser", { id });
      if(res){
       if(userdetails._id ==id){
         Dispatch( clearUserLoginDetails())
       
       }
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  async function unblock(id) {
    console.log(id);
    try {
      const res = await axiosAdminInstance.post("/users/unblockuser", { id });
      console.log(res);
    } catch (error) {}
  }


  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedAction, setSelectedAction] = useState('');

  const handleBlock = (user) => {
    setSelectedUser(user);
    setSelectedAction('block');
    setVisible(true);
  }

  const handleUnblock = (user) => {
    setSelectedUser(user);
    setSelectedAction('unblock');
    setVisible(true);
  }

  const handleOk = async () => {
    setVisible(false);
    if (selectedAction === 'block') {
      await block(selectedUser._id);
    } else {
      await unblock(selectedUser._id);
    }
  }

  const handleCancel = () => {
    setVisible(false);
  }


  return (
    <div>
      <div className="mt-48">
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
            <Modal
        title={`Are you sure you want to ${selectedAction} this user?`}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Name: {selectedUser.name}</p>
        <p>Email: {selectedUser.email}</p>
      </Modal>
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
                      color={user.status == "blocked" ? "secondary" : "primary"}
                      onClick={() => {
                        // Implement block/unblock logic here
                      }}
                    >
                      {user.status == "blocked" ? (
                        <BlockIcon
                          onClick={() => {
                            handleUnblock(user)
                          }}
                        />
                      ) : (
                        <CheckIcon
                          onClick={() => {
                            handleBlock(user);
                          }}
                        />
                      )}
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
