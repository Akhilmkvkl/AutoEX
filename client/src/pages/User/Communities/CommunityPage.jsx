import React from "react";
import Header from "../../../components/User/Header/Header";
import Footer from "../../../components/User/Footer/Footer";
import Communities from "../../../components/User/Communities/Communities";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function CommunityPage() {
  const navigate = useNavigate();

  // const useselector=useSelector()
  const userdetails = useSelector((state) => state.admin.userDetails);

  useEffect(() => {
    if (userdetails == false) navigate("/auth");
  }, [userdetails]);

  return (
    <div>
      <Header />
      <Communities />
      {/* <Footer/> */}
    </div>
  );
}

export default CommunityPage;
