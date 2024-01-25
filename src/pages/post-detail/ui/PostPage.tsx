import React from "react";
import { useNavigate, useParams } from "react-router";
import { useGetPostOneQuery } from "../../../shared/api/PostService";
import { PostExpanded } from "../../../entities/post-expanded";

const PostPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useGetPostOneQuery(+id!);

  if (isLoading || isFetching) return <div>Загрузка...</div>;


  return (
    <>
      <PostExpanded {...data} />
      <button onClick={() => navigate(-1)}>Назад</button>
    </>
  );
};

export default PostPage;
