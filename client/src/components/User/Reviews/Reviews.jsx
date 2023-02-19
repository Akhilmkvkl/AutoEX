import React,{useState} from "react";
import "./Reviews.css";
import { Button, Form, Input, Modal, Radio } from 'antd';
import Rating from '@mui/material/Rating';
import { axiosUserInstance } from "../../../instance/axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Reviews(props) {
  const userdetails = useSelector((state) => state.admin.userDetails);
  console.log(props,"this is props")
  const cardetails=props
  const [reviews,setreviews]=useState([])
  const  name = props.Name
   async function getreview(){
    try {
     const res= await axiosUserInstance.post('/reviews',{name})
     if(res){
      console.log(res,"this is res")
      setreviews( res.data.reviews)
     }
    } catch (error) {
       console.log(error);
    }
   }
     
   useEffect(() => {
     
    getreview()
   
    
   }, [])
   

  const [value, setValue] = React.useState(1);
  const [open, setOpen] = useState(false);
  const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        open={open}
        title="Post Your review"
        okText="Post"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              
             const res= axiosUserInstance.post('/postreview',{values,cardetails,userdetails})
             if(res){
              form.resetFields()
              toast.success("Review posted", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              getreview()
      
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
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            name="rating"
            label=""
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
          </Form.Item>
          <Form.Item name="review" label="" rules={[
              {
                required: true,
                message: "Please write your review",
              },
              
            ]}>
            <Input style={{width:"20em",height:'10em'}} placeholder="Your review"  type="textarea" />
          </Form.Item>
         
        </Form>
      </Modal>
    );
  };
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  }
    return (
      <div className="Review-componan">
        <ToastContainer />
        
        <div className="post" style={{padding:"5vw"}}>
          <Button
            type="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            Post Review
          </Button>
          <CollectionCreateForm
            open={open}
            onCreate={onCreate}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </div>
        {reviews.map((review)=>{
          return(
            <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              
            </div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-4">
                <img src="https://via.placeholder.com/80x80" alt="User Avatar" />
              </div>
              <div className="flex-1">
                <div className="mb-2 text-gray-600">{review.postedby}</div>
                <Rating name="read-only" value={review.rating} readOnly />
                <div className="text-gray-800">
                  {review.review}
                </div>
              </div>
            </div>
          </div>
          )
        })}
        
      </div>
    );

}


export default Reviews;
