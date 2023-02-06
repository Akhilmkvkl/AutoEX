import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card, Avatar, Button } from "antd";
import { useEffect, useState } from "react";
import { axiosAdminInstance } from "../../../instance/axios";
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

function AdminExperts() {
  const [value, setValue] = React.useState(0);
  const { Meta } = Card;
  const [experts, setexperts] = useState([]);

  async function getexperts() {
    try {
      const dataexpert = await axiosAdminInstance.get("/experts");

      const experts = dataexpert.data.experts;
      // console.log(experts)
      setexperts(experts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getexperts();
  }, [acceptexpert,blockexpert]);

  const newExperts = experts.filter((expert) => {
    return expert.status === "applied";
  });

  const autoexExpert = experts.filter((expert) => {
    return expert.status === "approved";
  });

  const blockedExpert = experts.filter((expert) => {
   return  expert.status === "blocked"
  });

  console.log(newExperts, "this is that");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  async function acceptexpert(id) {
    try {
      console.log(id);
      const res = await axiosAdminInstance.post("/acceptExpert", { id });
      console.log(res);
    } catch (error) {}
  }

  async function blockexpert(id) {
    try {
      console.log(id);
      const res = await axiosAdminInstance.post("/blockExpert", { id });
      console.log(res);
    } catch (error) {}
  }

  return (
    <div className="mt-32 ml-8">
      <div>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Experts" {...a11yProps(0)} />
              <Tab label="Applications" {...a11yProps(1)} />
              <Tab label="Blocked Experts" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div style={{display:"flex", flexWrap: "wrap"}}>
            {autoexExpert.map((autoexExperts) => {
              return (
                <div>
                  <Card
                    style={{ width: 300, margin: "16px 0" }}
                    cover={<img alt="example" src={autoexExperts.profile[0]} />}
                    actions={[
                      <Button
                        onClick={() => {
                          blockexpert(autoexExperts._id);
                        }}
                      >
                        Block
                      </Button>,
                    ]}
                  >
                    <Meta
                      title={autoexExperts.Expertname}
                      description={autoexExperts.about}
                    />
                  </Card>
                </div>
              );
            })}
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
          <div style={{display:"flex", flexWrap: "wrap"}}>
            {newExperts.map((newexpert) => {
              return (
                <div>
                  <Card
                    style={{ width: 300, margin: "16px 0" }}
                    cover={<img alt="example" src={newexpert.profile[0]} />}
                    actions={[
                      <Button
                        onClick={() => {
                          acceptexpert(newexpert._id);
                        }}
                      >
                        Accept
                      </Button>,
                      <Button
                        onClick={() => {
                          blockexpert(newexpert._id);
                        }}
                      >
                        Reject
                      </Button>,
                    ]}
                  >
                    <Meta
                      title={newexpert.Expertname}
                      description={newexpert.about}
                    />
                  </Card>
                </div>
              );
            })}
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
          <div style={{display:"flex", flexWrap: "wrap"}}>
            {blockedExpert.map((blockedExperts) => {
              return (
                <div>
                  <Card
                    style={{ width: 300, margin: "16px 0" }}
                    cover={
                      <img alt="example" src={blockedExperts.profile[0]} />
                    }
                    actions={[
                      <Button
                        onClick={() => {
                          acceptexpert(blockedExperts._id);
                        }}
                      >
                        Unblock
                      </Button>,
                    ]}
                  >
                    <Meta
                      title={blockedExperts.Expertname}
                      description={blockedExperts.about}
                    />
                  </Card>
                </div>
              );
            })}
            </div>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}

export default AdminExperts;
