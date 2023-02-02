import React, { useState, useEffect } from "react";
import { Button, Space } from "antd";
import { Await, Link } from "react-router-dom";
import { axiosAdminInstance } from "../../../instance/axios";
import { Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from '@material-ui/core/Button';
import { truncate } from "lodash";
import { Form, Input, Modal, Radio, Upload, Drawer } from "antd";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

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

function AdminNews() {
  const [news, setnews] = useState([]);
  async function getnews() {
    const res = await axiosAdminInstance.get("/news");
    if (res) {
      console.log(res);
      setnews(res.data.news);
    }
  }

  useEffect(() => {
    getnews();
  }, [deletenews]);

  const classes = useStyles();

  const onList = async (id) => {
     console.log(id)
     const res= await axiosAdminInstance.post('/listnews',{id})
  };

  const onUnlist =async (id) => {
    console.log(id)
    const res= await axiosAdminInstance.post('/unlistnews',{id})
  };
  
   
  const onDelete = () => {};
  const [isTruncated, setIsTruncated] = React.useState(true);
  const truncatedText = truncate(news.news, { length: 30, separator: /,? +/ });
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function deletenews(id) {
    try {
      console.log(id);
      const dnews = await axiosAdminInstance.post("/deletenews", { id });
      console.log(dnews);
    } catch (error) {
      console.log(error);
    }
  }
  
  const listednews= news.filter((newses)=>{
    return newses.list===true
  })

  const unlistednews=news.filter((newses)=>{
    return newses.list===false

  })



  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedAction, setSelectedAction] = useState('');

  const handlelist= (newses) => {
    setSelectedUser(newses);
    setSelectedAction('list');
    setVisible(true);
  }

  const handleUnlist = (newses) => {
    setSelectedUser(newses);
    setSelectedAction('Unlist');
    setVisible(true);
  }

  const handleDelete=(newses)=>{
    setSelectedUser(newses);
    setSelectedAction('Delete');
    setVisible(true);
  }

  const handleOk = async () => {
    setVisible(false);
    if (selectedAction === 'Unlist') {
      await onUnlist(selectedUser._id);
    } else if(selectedAction==='list') {
      await  onList(selectedUser._id);
    }else if(selectedAction==='Delete'){
      await deletenews(selectedUser._id);
    }
  }

  const handleCancel = () => {
    setVisible(false);
  }


  return (
    <div className="mt-32 ml-5">
      <div>
        <Link to={"/Admin-Addnews"}>
          <Button type="primary">Add News</Button>
        </Link>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Listed news" {...a11yProps(0)} />
              <Tab label="Unlisted news" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
          <Modal
        title={`Are you sure you want to ${selectedAction}  this news`}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        
      </Modal>
            {listednews.map((news) => {
              return (
                <Card className={`${classes.root} m-4 p-4 bg-white rounded-lg`}>
                  <CardContent>
                    <Typography
                      className={`${classes.title} text-lg font-medium`}
                      color="textSecondary"
                      gutterBottom
                    >
                      {news.title}
                    </Typography>
                    <Typography
                      className={`${classes.title} text-lg font-medium`}
                      color="textSecondary"
                      gutterBottom
                    >
                      {news.date}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      className={`text-gray-700`}
                    >
                      {isTruncated ? truncatedText : news.news}
                      {news.news.length > 30 && (
                        <a onClick={() => setIsTruncated(!isTruncated)}>
                          {" "}
                          {isTruncated ? <p className="text-green-500" >Read More</p> :  <p className="text-red-500">Read Less</p>}
                        </a>
                      )}
                    </Typography>
                  </CardContent>
                  <CardActions>
                   
                    <Button
                      size="middle"
                      className={`bg-green-500 text-white rounded-lg px-4 py-2`}
                      onClick={() => handleUnlist(news)}
                    >
                      Unlist
                    </Button>
                    
                  </CardActions>
                </Card>
              );
            })}
          </TabPanel>
          <TabPanel value={value} index={1}>
          <Modal
        title={`Are you sure you want to ${selectedAction}  this news`}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        
      </Modal>
          {unlistednews.map((news) => {
              return (
                <Card className={`${classes.root} m-4 p-4 bg-white rounded-lg`}>
                  <CardContent>
                    <Typography
                      className={`${classes.title} text-lg font-medium`}
                      color="textSecondary"
                      gutterBottom
                    >
                      {news.title}
                    </Typography>
                    <Typography
                      className={`${classes.title} text-lg font-medium`}
                      color="textSecondary"
                      gutterBottom
                    >
                      {news.date}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      className={`text-gray-700`}
                    >
                      {isTruncated ? truncatedText : news.news}
                      {news.news.length > 30 && (
                        <a onClick={() => setIsTruncated(!isTruncated)}>
                          {" "}
                          {isTruncated ? <p className="text-green-500" >Read More</p> :  <p className="text-red-500">Read Less</p>}
                        </a>
                      )}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="middle"
                      className={`bg-blue-500 text-white rounded-lg px-4 py-2`}
                      onClick={() => handlelist(news)}
                    >
                      List
                    </Button>
                    {/* <Button
                      size="middle"
                      className={`bg-green-500 text-white rounded-lg px-4 py-2`}
                      onClick={() => onUnlist(news.id)}
                    >
                      Unlist
                    </Button> */}
                    <Button
                      size="middle"
                      className={`bg-red-500 text-white rounded-lg px-4 py-2`}
                      onClick={() => handleDelete(news)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </TabPanel>
          
        </Box>

       
      </div>
    </div>
  );
}

export default AdminNews;
