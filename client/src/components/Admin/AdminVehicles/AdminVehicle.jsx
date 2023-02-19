import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Radio, Upload, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import BlockIcon from "@material-ui/icons/Block";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Add new Brand"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields() 
          .then(async(values) => {
            form.resetFields();
            console.log(values);
           const res= await axiosAdminInstance.post("/addbrands", { values });
           if(res){
            toast.success(' Brand added successfully', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
           }
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        //   onFinish={addBrand}
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="Brandname"
          label=""
          rules={[
            {
              required: true,
              message: "Please input brand name",
            },
          ]}
        >
          <Input placeholder="Brand name" />
        </Form.Item>
        <Form.Item name="icon" label="">
          <Upload
            name="images"
            valuePropName="fileList"
            //   onChange={}

            listType="picture-card"
          >
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

function AdminVehicle() {
  const [cars, setcar] = useState([]);
  const [brands, setbrands] = useState([]);

  async function getbrand() {
    try {
      const brandsdata = await axiosAdminInstance.get("/brands");
      if (brandsdata) {
        setbrands(brandsdata.data.brands);
      }
    } catch (error) {}
  }

  useEffect(() => {
    async function getvehicle() {
      try {
        const auto = await axiosAdminInstance.get("/vehicle");

        setcar(auto.data.veh);
      } catch (error) {
        console.log(error);
      }
    }
    getvehicle();
    getbrand();
  }, [deletecar]);

  async function deletecar(id) {
    try {
      console.log(id);
      axiosAdminInstance.post("/deletecar", { id });
    } catch (error) {}
  }

  const classes = useStyles();
  const [filters, setFilters] = useState({
    Name: "",
    Type: "",
    Brand: "",
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredCars = cars.filter((car) => {
    const nameMatch = car.Name.toLowerCase().includes(
      filters.Name.toLowerCase()
    );
    const typeMatch = car.Type.toLowerCase().includes(
      filters.Type.toLowerCase()
    );
    const brandMatch = car.Brand.toLowerCase().includes(
      filters.Brand.toLowerCase()
    );
    return nameMatch && typeMatch && brandMatch;
  });

  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };

  const [opend, setOpend] = useState(false);
  const showDrawer = () => {
    setOpend(true);
  };
  const onClose = () => {
    setOpend(false);
  };

  async function block(id) {
    try {
      const res = await axiosAdminInstance.post("/blockbrand", { id });
      console.log(res);
    } catch (error) {}
  }
  async function unblock(id) {
    try {
      const res = await axiosAdminInstance.post("/unblockbrand", { id });
      console.log(res);
    } catch (error) {}
  }

  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedAction, setSelectedAction] = useState("");

  const handleBlock = (brand) => {
    setSelectedUser(brand);
    setSelectedAction("block");
    setVisible(true);
  };

  const handleUnblock = (user) => {
    setSelectedUser(user);
    setSelectedAction("unblock");
    setVisible(true);
  };

  const handleOk = async () => {
    setVisible(false);
    if (selectedAction === "block") {
      await block(selectedUser._id);
    } else {
      await unblock(selectedUser._id);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="mt-32 ml-10">
       <ToastContainer />
      <div>
        <Button
          className="mr-4"
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Brand
        </Button>
        <Button type="primary" onClick={showDrawer}>
          View brands
        </Button>
        <Drawer title="Brands" placement="right" onClose={onClose} open={opend}>
          <TableContainer component={Paper} className="container mx-auto px-4">
            <Table className={""} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="px-4 py-2">Name</TableCell>
                  <TableCell align="right" className="px-4 py-2">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <Modal
                  title={`Are you sure you want to ${selectedAction}  ${selectedUser.Brandname} brand?`}
                  open={visible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                ></Modal>
                {brands.map((brand) => {
                  return (
                    <TableRow className="text-gray-700">
                      <TableCell
                        component="th"
                        scope="row"
                        className="px-4 py-2"
                      >
                        {brand.Brandname}
                      </TableCell>

                      <TableCell align="right" className="px-4 py-2">
                        <IconButton
                          color={
                            brand.blocked === true ? "secondary" : "primary"
                          }
                          onClick={() => {
                           
                          }}
                        >
                          {brand.blocked === true ? (
                            <BlockIcon
                              onClick={() => {
                                handleUnblock(brand);
                              }}
                            />
                          ) : (
                            <CheckIcon
                              onClick={() => {
                                handleBlock(brand);
                              }}
                            />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Drawer>
        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <Link to={"/AddVehicle"}>
          {" "}
          <Button className="ml-4" type="primary">Add vehicle</Button>
        </Link>
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
                      name="Name"
                      value={filters.Name}
                      onChange={handleFilterChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      label="Type"
                      name="Type"
                      value={filters.Type}
                      onChange={handleFilterChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      label="Brand"
                      name="Brand"
                      value={filters.Brand}
                      onChange={handleFilterChange}
                    />
                  </TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCars.map(
                  (car) => (
                    console.log(car.Images, "this is car"),
                    (
                      <TableRow key={car.id}>
                        <TableCell component="th" scope="row">
                          {car.Name}
                        </TableCell>
                        <TableCell>{car.Type}</TableCell>
                        <TableCell>{car.Brand}</TableCell>
                        <TableCell>
                          <img
                            className="w-14 h-12"
                            src={car.Images[1]}
                            alt={car.name}
                          />
                        </TableCell>
                        <TableCell>
                          <EditIcon />
                          <div
                            onClick={() => {
                              deletecar(car._id);
                            }}
                          >
                            {" "}
                            <DeleteIcon />
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      </div>
    </div>
  );
}

export default AdminVehicle;
