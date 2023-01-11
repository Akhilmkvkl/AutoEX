import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { axiosAdminInstance } from "../../../instance/axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Select as MatSelect } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
 const platforms = [
    {
      platform: "Whatsapp",
    },
    {
      platform: "Facebook",
    },
    {
      platform: "Telegram",
    },
    {
      platform: "Instagram",
    },
    {
      platform: "Discord",
    },
    {
      platform: "Other",
    },
  ];

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();

 
  return (
    <Modal
      open={open}
      title="Add New Community"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please Enter the Name of Community",
            },
          ]}
        >
          <Input style={{ width: 300 }} placeholder="Community name" />
        </Form.Item>
        <Form.Item
          name="link"
          rules={[
            {
              required: true,
              message: "Please Provide a link of community",
            },
          ]}
        >
          <Input style={{ width: 300 }} placeholder="Link" type="textarea" />
        </Form.Item>
        <Form.Item name="platform">
          <Select
            style={{ width: 300 }}
            options={platforms.map((platform) => ({
              value: platform.platform,
            }))}
            placeholder="Platform"
            type="textarea"
          />
        </Form.Item>
        <Form.Item name="description">
          <TextArea placeholder="Description " cols={100} rows={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

function AdminCommunity() {
  const [open, setOpen] = useState(false);
  const [communities, setcommunity] = useState([]);
  useEffect(() => {
    async function getCommunity() {
      try {
        const comm = await axiosAdminInstance.get("/community");
        // console.log(auto);
        setcommunity(comm.data.community);
      } catch (error) {
        console.log(error);
      }
    }
    getCommunity();
  }, []);

  const onCreate = async (values) => {
    console.log("Received values of form: ", values);
    setOpen(false);

    const add = await axiosAdminInstance.post("/addCommunity", { values });
    console.log(add);
  };

  const classes = useStyles();
  const [filters, setFilters] = useState({
    name: "",
    platform: "",
    // Brand: "",
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredCommunities = communities.filter((community) => {
    const nameMatch = community.name
      .toLowerCase()
      .includes(filters.name.toLowerCase());
    const typeMatch = community.platform
      .toLowerCase()
      .includes(filters.platform.toLowerCase());
    // const brandMatch = car.Brand.toLowerCase().includes(
    //   filters.Brand.toLowerCase()
    // );
    return nameMatch && typeMatch;
  });

  return (
    <div className="mt-32 ml-10">
      <div>
        <Button
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add new Community
        </Button>
        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </div>
      <div>
        <>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="car table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TextField
                      label="Name"
                      name="name"
                      value={filters.name}
                      onChange={handleFilterChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      label="platform"
                      name="platform"
                      value={filters.platform}
                      onChange={handleFilterChange}
                    />

                    {/* <MatSelect
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={filters.platform}
                    onChange={handleFilterChange}
                    label="platform">
                     {platforms.map((platfrom)=>{
                        <MenuItem >{platfrom.platform}</MenuItem>
                     })}

                    </MatSelect> */}

                   
                  </TableCell>
                 
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCommunities.map((community) => (
                  // console.log(car.Images, "this is car"),
                  <TableRow key={community.id}>
                    <TableCell component="th" scope="row">
                      {community.name}
                    </TableCell>
                    <TableCell>{community.platform}</TableCell>
                    {/* <TableCell>{car.Brand}</TableCell> */}
                    {/* <TableCell>
                          <img
                            className="w-14 h-12"
                            src={car.Images[1]}
                            alt={car.name}
                          />
                        </TableCell> */}
                    <TableCell>
                      {/* <EditIcon /> */}
                      <DeleteIcon />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      </div>
    </div>
  );
}

export default AdminCommunity;
