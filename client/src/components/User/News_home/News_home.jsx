// import React from "react";
// import "./News_home.css";
// import { Col } from "reactstrap";
// import { Link, useNavigate } from "react-router-dom";

// import { axiosUserInstance } from "../../../instance/axios";
// import { useState } from "react";
// function Newshome() {
//   const navigate = useNavigate();
//   const [newsReports,setnews]=useState([])
//  async function fetchnews(){
//     try {
//       const res= await axiosUserInstance.get('/news')
//       if(res){
//         setnews(res.data.news)
//       }
//     } catch (error) {
      
//     }
//   }

//   function viewNewses(news) {
//     console.log(news);
//     navigate("/ViewNews", { state: news });
//   }

//   return (
//     <div>
//       <div className="newsdata">
//         {newsReports.map((news) => {
//           return (
//             <div>
//               <Col className="mb-5">
//                 <div className="blog__item">
//                   <img src={news.image} alt="" className="w-100" />
//                   <div
//                     className="blog__info p-3"
//                     onClick={() => {
//                       viewNewses(news);
//                     }}
//                   >
//                     {/* <Link to={'/ViewNews'} className="blog__title"> */}
//                     {news.title}
//                     {/* </Link> */}
//                     <p className="section__description mt-3">
//                       {news.content.length > 100
//                         ? news.content.substr(0, 100)
//                         : news.content}
//                     </p>

//                     <p
//                       className="read__more"
//                       onClick={() => {
//                         viewNewses(news);
//                       }}
//                     >
//                       Read More
//                     </p>

//                     <div className="blog__time pt-3 mt-3 d-flex align-items-center justify-content-between">
//                       <span className="blog__author">
//                         {/* <i class="ri-user-line"></i> {author} */}
//                       </span>

//                       <div className=" d-flex align-items-center gap-3">
//                         <span className=" d-flex align-items-center gap-1 section__description">
//                           <i class="ri-calendar-line"></i> {news.posted}
//                         </span>

//                         <span className=" d-flex align-items-center gap-1 section__description">
//                           {/* <i class="ri-time-line"></i> {time} */}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Col>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Newshome;
