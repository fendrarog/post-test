import React, { useCallback, useEffect, useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import LinesEllipsis from "react-lines-ellipsis";
import { Link } from "react-router-dom";
import { useLazyGetPostsQuery } from "../../../shared/api/PostService";
import { Footer } from "../../../shared/ui/footerScroll";
import { IPost } from "../../../entities/post-expanded/model/types";

const MainPage: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);

  const [getPosts] = useLazyGetPostsQuery();

  let timeout = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const loadMore = useCallback(async () => {
    if (page < 10) {
      const result = await getPosts({
        page: page + 1,
        limit: 10,
      }).unwrap();
      timeout.current = setTimeout(() => {
        setPosts((posts) => [...posts, ...result]);
        setPage((page) => page + 1);
      }, 1000);
    }
  }, [setPosts, page]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPosts({ page, limit: 10 }).unwrap();
      setPosts((posts) => [...posts, ...result]);
    };
    fetchData();

    return () => clearTimeout(timeout.current);
  }, []);

  console.log(page, posts);

  return (
    <>
      <Virtuoso
        style={{ height: 300, width: 1200 }}
        data={posts.length <= 0 ? [] : posts}
        endReached={loadMore}
        overscan={2}
        itemContent={(index, { body, id, title }) => (
          <div
            style={{
              backgroundColor: index % 2 === 0 ? "#aaa" : "#eee",
              padding: "1rem 0.5rem",
            }}
          >
            <LinesEllipsis
              text={`${id}. ${title}. ${body}`}
              maxLine="1"
              ellipsis={
                (
                  <>
                    <span>...</span>{" "}
                    <Link to={`/post-test/post/${id}`}>просмотр</Link>
                  </>
                ) as any
              }
              trimRight
              basedOn="letters"
            />
          </div>
        )}
        components={page < 10 ? { Footer } : {}}
      />
    </>
  );
};

export default MainPage;
