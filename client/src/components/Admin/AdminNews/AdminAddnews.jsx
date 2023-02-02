import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
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
  // Upload,
} from "antd";
import { message } from "antd";
import { axiosAdminInstance, axiosUserInstance } from "../../../instance/axios";
import { showSuccessMsg } from "../../Utils/Notifications/Notification";
import axios from "axios";

function AdminAddnews() {
  const { TextArea } = Input;

  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const [success, setsuccess] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleChange = ({ fileList }) => setImages(fileList);
  console.log(images);

  async function submit() {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "cbepzz3d");

      console.log(formData);

      const up = await await axios.post(
        "https://api.cloudinary.com/v1_1/doelennei/image/upload/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(up);
      const imagedata = up.data.url;

      const values = form.getFieldsValue();
      console.log(values);
      const res = await axiosAdminInstance.post("/addnews", {
        values,
        imagedata,
      });
      console.log(res);
      if (res) {
        form.resetFields();
        setsuccess(true);
        setTimeout(() => {
          setsuccess(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error.error);
    }
  }

  return (
    <div className="mt-48 ">
      <>
        <div className="w-48">
          {success == true && showSuccessMsg("successfully updated the news")}
        </div>
        <Form
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
          <Form.Item name="title" label="">
            <TextArea placeholder="Title" cols={100} />
          </Form.Item>
          <Form.Item name="news" label="">
            <TextArea placeholder="News " cols={100} rows={5} />
          </Form.Item>

          <Form.Item name="image" label="">
            <input type="file" onChange={onFileChange} />
            <button></button>
          </Form.Item>
          <Form.Item label="">
            <Button htmlType="submit" className="bg-red-600">
              Add News
            </Button>
          </Form.Item>
        </Form>
      </>
    </div>
  );
}

export default AdminAddnews;
