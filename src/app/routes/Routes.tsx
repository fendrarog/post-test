import React from "react";
import { Route, Routes } from "react-router";
import MainPage from "../../pages/main/ui/MainPage";
import PostPage from "../../pages/post-detail/ui/PostPage";
import { Layout } from "../../shared/ui/layout";

const RenderRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="post/:id" element={<PostPage />} />
      </Route>
    </Routes>
  );
};

export default RenderRoutes;
