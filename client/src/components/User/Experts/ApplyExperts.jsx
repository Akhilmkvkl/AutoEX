import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import Header from "../Header/Header";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  TimePicker,
} from "antd";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { axiosAdminInstance } from "../../../instance/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ApplyExperts() {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const [images1, setImages1] = useState([]);
  const handleChange = ({ fileList }) => setImages(fileList);
  const handleChange1 = ({ fileList }) => setImages1(fileList);
  const userdetails = useSelector((state) => state.admin.userDetails);
  const token=useSelector((state)=>state.admin.userToken)
  console.log(userdetails);
  async function submit() {

    try {
      console.log(token,"this is token")
      const values = form.getFieldsValue();
      console.log(values);
  
      const applyData = [values, userdetails];
      console.log(applyData);
  
      const res = await axiosAdminInstance.post("/applyexpert", [applyData],{
        headers: {
            'authorization': token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
        });
  
      console.log(res);
      if (res) {
        form.resetFields();
        toast.success('  Your Application successfully submited', {
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
    } catch (error) {
      console.log(error)
    }
    
  }
  const [fromTime, setFromTime] = useState({});
  const [toTime, setToTime] = useState({});

  const handleFromTimeChange = (time) => {
    setFromTime(time);
  };

  const handleToTimeChange = (time) => {
    setToTime(time);
  };
  const [days, setDays] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });

  const onChange = (e) => {
    setDays({ ...days, [e.target.value]: e.target.checked });
  };

  return (
    <div>
      <ToastContainer />
      <div>
        <Header />
      </div>

      <div className="mt-32 ml-5">
       
        <Box className="" style={{ width: 1000, height: 600 }}>
          <Form
            className="mt-10"
            form={form}
            onFinish={submit}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Provide your number",
                },
              ]}
              name="Phone"
              label="phone"
            >
              <InputNumber style={{ width: 400 }} placeholder="Phone" />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Enter your Rate per session",
                },
              ]}
              name="Rate"
              label="Rate"
            >
              <InputNumber
                min={400}
                max={1200}
                style={{ width: 400 }}
                placeholder="rate per session"
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Enter about Your Experience",
                },
              ]}
              name="about"
              label="About"
            >
              <TextArea
                placeholder="about Your field experiences"
                cols={57}
                rows={5}
              />
            </Form.Item>
              
            <Form.Item name="Avatar" label="Photo">
              <Upload
                name="avatar"
                valuePropName="profile"
                onChange={handleChange1}
                listType="picture-card"
              >
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Profile
                  </div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item name="Documents" label="Documents">
              <Upload
                name="Documents"
                valuePropName="fileList"
                onChange={handleChange}
                multiple
                listType="picture-card"
              >
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Documents
                  </div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item label="">
              <Button htmlType="submit" className="bg-red-600">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Box>
      </div>
    </div>
  );
}

export default ApplyExperts;
