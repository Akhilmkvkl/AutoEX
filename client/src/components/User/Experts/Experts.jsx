import React, { useState } from "react";
import MovingComponent from "react-moving-text";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./Experts.css";
import { Button } from "@mui/material";
import { Card, Avatar } from "antd";
import { useEffect } from "react";
import { axiosUserInstance } from "../../../instance/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Experts() {
  const navigate = useNavigate();
  const { Meta } = Card;
  const [experts, setexperts] = useState([]);
   
  const userdetails = useSelector((state) => state.admin.userDetails);

  async function getexperts() {
    try {
      const expert = await axiosUserInstance.get("/experts");
      console.log(expert);
      setexperts(expert.data.experts);
    } catch (error) {}
  }

  useEffect(() => {
    getexperts();
  }, []);

  async function appoinment(expert) {
    try {
      console.log(expert);
      const res = await axiosUserInstance.post("/payment/stripe",{expert,userdetails});
      console.log(res);
      if (res) {
        window.location.href=res.data.url
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
                <Meta title={expert.Expertname} description={expert.about} />
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Experts;
