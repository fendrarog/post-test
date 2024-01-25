import React from "react";
import { IPost } from "../model/types";

const Post: React.FC<IPost> = (data) => {
  console.log(data);
  
  return (
    <>
      <h2>{data?.id}</h2>
      <h4>{data?.title}</h4>
      <p>{data?.body}</p>
    </>
  );
};

export default Post;
