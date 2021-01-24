import React from "react";
import Head from "next/head";
import { Sub } from "types";
import { Post } from "../../types";
import PostCard from "../components/PostCard";
import useSWR from "swr";
import Link from "next/link";

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
  const { data: topSubs } = useSWR("/misc/top-subs");

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
        {/* Silider */}
        <div className='ml-6 w-80'>
          <div className='bg-white rounded'>
            <div className='p-4 border-b-2'>
              <p className='text-lg font-semibold text-center'>最热社区</p>
            </div>
          </div>
          <div>
            {topSubs?.map((sub: Sub) => (
              <div
                key={sub.name}
                className='flex items-center px-4 py-2 text-xs border-b'>
                <Link href={`/r/${sub.name}`}>
                  <img
                    src={sub.imageUrl}
                    alt='Sub'
                    className='w-8 h-8 mr-2 overflow-hidden rounded-full cursor-pointer'
                  />
                </Link>
                <Link href={`/r/${sub.name}`}>
                  <a className='font-bold hover:cursor-pointer'>
                    /r/{sub.name}
                  </a>
                </Link>
                <p className='ml-auto font-med'>{sub.postCount}</p>
              </div>
            ))}
          </div>
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
