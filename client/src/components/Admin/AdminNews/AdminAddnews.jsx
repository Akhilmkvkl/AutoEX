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
  Upload,
} from "antd";
import { message } from "antd";
import { axiosAdminInstance, axiosUserInstance } from "../../../instance/axios";
import { showSuccessMsg } from "../../Utils/Notifications/Notification";

function AdminAddnews() {
 
  const { TextArea } = Input;

  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const [success,setsuccess]=useState(false)

  const handleChange = ({ fileList }) => setImages(fileList);


  async function submit() {
    const values = form.getFieldsValue();
    console.log(values);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("news", values.news);
    images.forEach((image) => formData.append("image", image.originFileObj));

    const res = await axiosAdminInstance.post("/addnews", { values });
    console.log(res);
    if (res) {
      form.resetFields();
      setsuccess(true)
      setTimeout(() => {
        setsuccess(false)
      }, 5000);
    }
  }

  return (
    <div className="mt-48 ">
      <>
      <div className="w-48">
      {success==true && showSuccessMsg("successfully updated the news")}
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
            <Upload
              name="images"
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
                  Upload
                </div>
              </div>
            </Upload>
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
