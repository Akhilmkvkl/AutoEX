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
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import {axiosAdminInstance} from '../../../instance/axios'

function ApplyExperts() {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const [images1, setImages1] = useState([]);
  const handleChange = ({ fileList }) => setImages(fileList);
  const handleChange1 = ({ fileList }) => setImages1(fileList);
  const userdetails=useSelector(state=>state.admin.userDetails)
  console.log(userdetails)
  async function submit() {
    const values = form.getFieldsValue();
    console.log(values);
    // const formData = new FormData();
    // formData.append("title", values.title);
    // formData.append("news", values.news);
    // images.forEach((image) => formData.append("image", image.originFileObj));
    // images1.forEach((image) => formData.append("image", image.originFileObj));
     const applyData=[values,userdetails]
     console.log(applyData)

    const res = await axiosAdminInstance.post("/applyexpert", [applyData]);

    console.log(res);
    if (res) {
      form.resetFields();
      setsuccess(true);
      setTimeout(() => {
        setsuccess(false);
      }, 5000);
    }
  }

  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="mt-32 ml-5">
        <div>Note:</div>
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
            // onValuesChange={onFormLayoutChange}
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Provide you number",
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
                min={100}
                max={700}
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
            {/* <div className="content-center ml-52 text-red-600">
              Upload Your neccessory Documents that shows your experience in
              automobile field. And Remember one thing , please try to upload
              valid documents becase your Documents get verify by Admin!
            </div> */}
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
