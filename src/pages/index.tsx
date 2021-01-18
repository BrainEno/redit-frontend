import React from "react";
import Head from "next/head";
// import Axios from "axios";
import { Post } from "../../types";
import PostCard from "../components/PostCard";
import useSWR from "swr";

interface HomeProps {
  posts: Post[] | undefined;
}

const Home: React.FC<HomeProps> = () => {
  // const [posts, setPosts] = useState<Post[]>([]);

  // useEffect(() => {
  //   Axios.get("/posts")
  //     .then((res) => setPosts(res.data))
  //     .catch((err) => console.log(err));
  // }, []);
  const { data: posts } = useSWR("/posts");

  return (
    <>
      <Head>
        <title>Home | BOT CON</title>
      </Head>
      <div className='container flex pt-4'>
        <div className='w-160'>
          {posts?.map((post: Post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>
      </div>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const res = await Axios.get("/posts");
//     console.log(res.data);
//     return {
//       props: { posts: res.data },
//     };
//   } catch (err) {
//     return { props: { error: "有什么地方出错了" } };
//   }
// };

export default Home;
