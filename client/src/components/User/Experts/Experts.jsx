import React, { useState } from "react";
import MovingComponent from "react-moving-text";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./Experts.css";
import { Button, getCardHeaderUtilityClass } from "@mui/material";
import { Card, Avatar, Modal, Form, Select } from "antd";

import { useEffect } from "react";
import { axiosUserInstance } from "../../../instance/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function TabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Experts() {
  const [value, setValue] = React.useState(0);
  const userdetails = useSelector((state) => state.admin.userDetails);
  const token=useSelector((state)=>state.admin.userToken)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [Session, setsession] = useState([]);
  const [expertname, setexpertname] = useState("");
  async function session() {
    try {
      const userid = userdetails._id;
      const res = await axiosUserInstance.post("/sessions", { userid });
      if (res) {
        setsession(res.data.session);
        setexpertname(res.data.expertname);
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(Session, "this is session");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { Meta } = Card;
  const [experts, setexperts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedexp, setselectedexp] = useState([]);
  const [expert, setexpert] = useState([]);
  
  async function getexperts() {
  

    try {
      const expert = await axiosUserInstance.get("/experts");
      console.log(expert);
      setexperts(expert.data.experts);
    } catch (error) {}
  }
  const currentDate = new Date();
function isAvailable(sessiondate,currentDate){
    const availableDate = new Date(sessiondate);

    return (
      availableDate.getFullYear() === currentDate.getFullYear() &&
      availableDate.getMonth() === currentDate.getMonth() &&
      availableDate.getDate() === currentDate.getDate()
    );
  };

  async function getchat(session) {
    try {
      console.log("hi da")
      const check =  isAvailable(session.bookedTime,currentDate)
      console.log(check);
      if(check===true){
      navigate("/chat", { state: session });
      }else{
        toast.error('! Your session date is not matching', {
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

    } catch (error) {}
  }

  useEffect(() => {
    getexperts();
    session();
  }, []);

  const handleok = (expert) => {
    setVisible(true);
    setexpert(expert);
    setselectedexp(expert.availableDays);
  };
  const handleCancel = () => {
    setVisible(false);
  };
 
  async function appoinment(expert) {
    try {
      console.log(expert);
      const res = await axiosUserInstance.post("/payment/stripe", {
        expert,
        userdetails,
      },{
        headers: {
            'authorization': token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
        });
      console.log(res);
      if (res) {
        window.location.href = res.data.url;
        const { paymentIntent, error } = await stripe.confirmCardPayment(
          process.env.stripe_client_secret
        );
        if (error) {
          // Handle error here
          console.log(error);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
          // Handle successful payment here
          console.log("payment has been successfully compleated");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
       <ToastContainer />
      {userdetails.isExpert === "yes" ? (
        <div className="image">
          <MovingComponent
            type="fadeIn"
            duration="900ms"
            delay="0"
            direction="normal"
            timing="ease"
            iteration="1"
            fillMode="none"
          >
            <img
              className="ImgNews"
              src="https://wallpaper.dog/large/10948266.jpg"
              alt=""
            />
          </MovingComponent>
          <MovingComponent
            type="fadeInFromBottom"
            duration="900ms"
            delay="0"
            direction="normal"
            timing="ease"
            iteration="1"
            fillMode="none"
          >
            <h1 className="textNews">
              Welcome Expert
              <br />
              <Link to={"/Expertsession"}>
                {" "}
                <Button variant="contained">Add availability</Button>
              </Link>
            </h1>
          </MovingComponent>
        </div>
      ) : (
        <div className="image">
          <MovingComponent
            type="fadeIn"
            duration="900ms"
            delay="0"
            direction="normal"
            timing="ease"
            iteration="1"
            fillMode="none"
          >
            <img
              className="ImgNews"
              src="https://wallpaper.dog/large/10948266.jpg"
              alt=""
            />
          </MovingComponent>
          <MovingComponent
            type="fadeInFromBottom"
            duration="900ms"
            delay="0"
            direction="normal"
            timing="ease"
            iteration="1"
            fillMode="none"
          >
            <h1 className="textNews">
              Talk to Experts
              <br />
              <Link to={"/applyexpert"}>
                {" "}
                <Button variant="contained">Become An Expert</Button>
              </Link>
            </h1>
          </MovingComponent>
        </div>
      )}

      <div className="expert">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              
                <Tab label="Experts" {...a11yProps(0)} />
                  <Tab label="My sessions" {...a11yProps(1)} />
            </Tabs>
          </Box>
          {userdetails.isExpert === "yes" ? (
            ""
          ) : (
            <TabPanel value={value} index={0}>
              <Modal
                title={`Please pick a date `}
                open={visible}
                onOk={async () => {
                  form
                    .validateFields()
                    .then(async (values) => {
                      form.resetFields();
                      console.log(values);
                      console.log(expert);
                      console.log(userdetails);
                      try {
                        console.log(expert);
                        const res = await axiosUserInstance.post(
                          "/payment/stripe",
                          {
                            expert,
                            userdetails,
                            values,
                          },{
                            headers: {
                                'authorization': token,
                                'Accept' : 'application/json',
                                'Content-Type': 'application/json'
                            }
                            }
                        );
                        console.log(res);
                        if (res) {
                          window.location.href = res.data.url;
                          const { paymentIntent, error } =
                            await stripe.confirmCardPayment(
                              process.env.stripe_client_secret
                            );
                          if (error) {
                            // Handle error here
                            console.log(error);
                          } else if (
                            paymentIntent &&
                            paymentIntent.status === "succeeded"
                          ) {
                            // Handle successful payment here
                            console.log(
                              "payment has been successfully compleated"
                            );
                          }
                        }
                      } catch (error) {
                        console.log(error);
                      }
                    })
                    .catch((info) => {
                      console.log("Validate Failed:", info);
                    });
                }}
                onCancel={handleCancel}
              >
                <Form form={form}>
                  <Form.Item name="BookedDate">
                    <Select style={{ width: "20em" }} defaultValue="">
                      {selectedexp.map((option) => {
                        const date = new Date(option);
                        const formattedDate = date.toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                          timeZone: "UTC",
                        });
                        return <Option value={option}>{formattedDate}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </Form>
              </Modal>
              {experts.map((expert) => {
                return (
                  <div>
                    <Card
                      style={{ width: 300, margin: "16px 0" }}
                      cover={<img alt="example" src={expert.profile[0]} />}
                      actions={[
                        <Button
                          onClick={() => {
                            // appoinment(expert);
                            handleok(expert);
                          }}
                        >
                          Book appoinment
                        </Button>,
                      ]}
                    >
                      <Meta title={expert.Rate} />
                      <Meta
                        title={expert.Expertname}
                        description={expert.about}
                      />
                    </Card>
                  </div>
                );
              })}
            </TabPanel>
          )}

          <TabPanel value={value} index={1}>
            {Session.length == 0 ? (
              "you have no sessions "
            ) : (
              <div>
                {Session.map((session) => {
                   {const date = new Date(session.bookedTime);
                    var formattedDate = date.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                      timeZone: "UTC",
                    });}
                  return (
                    <Card
                      style={{ width: 300, margin: "16px 0" }}
                      actions={[
                        <Button
                          onClick={() => {
                            getchat(session);
                          }}
                        >
                          Chat
                        </Button>,
                      ]}
                    >
                     
                      <Meta title={`Booked for ${formattedDate}`} />
                      <br></br>
                      {userdetails.isExpert == "yes" ? (
                        <Meta title={`with ${session.user}`} />
                      ) : ( 
                        <Meta title={`with ${session.expertName}`} />
                      )}

                      <br></br>

                      <Meta title="Active" />
                    </Card>
                    
                
                  );
                })}
              </div>
            )}
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}

export default Experts;
