import React, { useEffect } from "react";
import MovingComponent from "react-moving-text";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Card, Typography, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import "./Communities.css";
import { axiosUserInstance } from "../../../instance/axios";
import { useState } from "react";


function Communities() {
  const { Title } = Typography;
  const [community, setcommunity] = useState([]);

  async function getcommunity() {
    try {
      const res = await axiosUserInstance.get("/communities");
      if (res) {
        console.log(res);
        setcommunity(res.data.community);
      }
    } catch (error) {}
  }

  useEffect(() => {
    getcommunity();
  }, []);

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
            src="https://www.volvocars.com/images/v/-/media/market-assets/us/applications/dotcom/my21images/categorypages/wagons/desktop/hero/category-wagons-hero-desktop-21x9.jpg?h=2160&iar=0&w=5120"
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
            <br />
            Explore
          </h1>
        </MovingComponent>
      </div>

      <div style={{ marginTop: "20em", display: "flex", flexWrap: "wrap" }}>
        {community.map((communities) => {
          return (
            <Card style={{ maxWidth: 300, marginLeft: "26px" }}>
              <Title color="red" level={4}>
               <p className="text-red-600">{communities.name}</p> 
              </Title>
              <div style={{height:120}}>
              <p>{communities.decription}</p>
              </div>
              <p className="text-red-600"> {communities.platform}</p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  href={communities.link}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  style={{ alignSelf: "flex-end" }}
                >
                  View page
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Communities;
