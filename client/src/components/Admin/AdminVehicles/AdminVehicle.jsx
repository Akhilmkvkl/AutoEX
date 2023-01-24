import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Radio, Upload } from "antd";
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
          .then((values) => {
            form.resetFields();
            console.log(values);
            axiosAdminInstance.post("/addbrands", { values });
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

  useEffect(() => {
    async function getvehicle() {
      try {
        const auto = await axiosAdminInstance.get("/vehicle");
        console.log(auto);
        setcar(auto.data.veh);
      } catch (error) {
        console.log(error);
      }
    }
    getvehicle();
  }, [deletecar]);

  async  function deletecar(id){
     try {
       console.log(id)
       axiosAdminInstance.post('/deletecar',{id})
     } catch (error) {
      
     }
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

  return (
    <div className="mt-32 ml-10">
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
        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <Link to={"/AddVehicle"}>
          {" "}
          <Button>Add vehicle</Button>
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
                        <div onClick={()=>{deletecar(car._id)}}>  <DeleteIcon  /></div>
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
