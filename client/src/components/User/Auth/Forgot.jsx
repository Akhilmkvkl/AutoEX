import React from "react";
import Header from "../Header/Header";
import "./Auth.css";
import { Box } from "@mui/material";
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
import { axiosUserInstance } from "../../../instance/axios";

function Forgot() {
    const { TextArea } = Input;
    const [form] = Form.useForm();
    async function submit(){
        try {
            const values = form.getFieldsValue();
            console.log(values);
            const res=await axiosUserInstance.post('/forgotpassword',{values})
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="mt-32">
        <Box className="box">
          <Form
            form={form}
            onFinish={submit}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 54,
            }}
            layout="horizontal"
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Provide registred email",
                },
              ]}
              name="email"
              label=""
            >
              <Input style={{width:300,height:50}} placeholder="email"></Input>
            </Form.Item>
            <Form.Item label="">
              <Button htmlType="submit" className="bg-red-600">
                submit
              </Button>
            </Form.Item>
          </Form>
        </Box>
      </div>
    </div>
  );
}

export default Forgot;
