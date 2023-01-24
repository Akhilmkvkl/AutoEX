import React, { useState } from "react";
import MovingComponent from "react-moving-text";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./Experts.css";
import { Button, getCardHeaderUtilityClass } from "@mui/material";
import { Card, Avatar } from "antd";
import { useEffect } from "react";
import { axiosUserInstance } from "../../../instance/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

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
    } catch (error) {}
  }
  console.log(Session, "this is session");
  const navigate = useNavigate();
  const { Meta } = Card;
  const [experts, setexperts] = useState([]);

  async function getexperts() {
    try {
      const expert = await axiosUserInstance.get("/experts");
      console.log(expert);
      setexperts(expert.data.experts);
    } catch (error) {}
  }

  async function getchat(session) {
    try {
      console.log(session);
      navigate("/chat", { state: session });
    } catch (error) {}
  }

  useEffect(() => {
    getexperts();
    session();
  }, []);

  async function appoinment(expert) {
    try {
      console.log(expert);
      const res = await axiosUserInstance.post("/payment/stripe", {
        expert,
        userdetails,
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
          <TabPanel value={value} index={0}>
            {experts.map((expert) => {
              return (
                <div>
                  <Card
                    style={{ width: 300, margin: "16px 0" }}
                    cover={<img alt="example" src={expert.profile[0]} />}
                    actions={[
                      <Button
                        onClick={() => {
                          appoinment(expert);
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
          <TabPanel value={value} index={1}>
            {Session.length == 0 ? (
              "you have no sessions "
            ) : (
              <div>
                {Session.map((session) => {

                  return(
                  <Card
                    style={{ width: 300, margin: "16px 0" }}
                    // cover={<img alt="example" src={expert.profile[0]} />}
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
                    <Meta title={session.bookedTime} />
                    <br></br>
                    {userdetails.isExpert=="no" ? 
                    <Meta title={`with ${session.user}`}  />
                    :
                    <Meta title={`with ${session.expertName}`}  />
                    }
                    
                    <br></br>

                    <Meta title="Active" />
                  </Card>
                  )
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
