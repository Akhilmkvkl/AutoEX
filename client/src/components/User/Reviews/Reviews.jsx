import React from "react";
import "./Reviews.css";

import {
  Card,
  CardSubtitle,
  CardText,
  CardTitle,
  CardBody,
  CardImg,
} from "reactstrap";

function Reviews() {
  const reviews = [
    {
      name: "Akhil",
      review:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      stars: [1, 1, 2, 3],
      avatar:"https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60"
    },
    {
      name: "Aswant",
      review:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      stars: [1, 1, 2, 3, 1],
      avatar:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60"
    },
    {
      name: "Devasankar",
      review:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      stars: [1, 1, 2],
      avatar:"https://images.unsplash.com/photo-1628890920690-9e29d0019b9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60"
    },
    {
      name: "Akash",
      review:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      stars: [1, 1, 2, 3],
      avatar:"https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60"
    },
  ];

  return (
    <div className="Review-componant">

       


        {
            reviews.map((review)=>{

                return(
               <div className="review">
                <CardBody>
                
                <div className="reviews-top">
                  <div className="user-details">
                    <CardImg className="avatar" src={review.avatar} alt="user avatar" />
        
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      {review.name}
                    </CardSubtitle>
                    {review.stars.map((star) => {
                      return <CardSubtitle tag="h5">⭐ </CardSubtitle>;
                    })}
                   
                  </div>
                  <div className="reviews-body">
                    <CardText>
                      {
                        review.review
                      }
                    </CardText>
                  </div>
                  <CardText>
                    <small className="text-muted text-bold">{"3 mins ago"}</small>
                  </CardText>
                </div>
              </CardBody>
              </div>

                )
            })
        }
      
    </div>
  );
}

export default Reviews;
