import React, { useEffect, useState } from "react";
import Head from "next/head";
import Axios from "axios";
import { Post } from "../../types";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface HomeProps {
  posts: Post[] | undefined;
}

const Home: React.FC<HomeProps> = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    Axios.get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='pt-12'>
      <Head>
        <title>Home | BOT CON</title>
      </Head>
      <div className='container flex pt-4'>
        <div className='w-160'>
          {posts.map((post) => (
            <div key={post.identifier} className='flex mb-4 bg-white rounded'>
              {/*Vote section*/}
              <div className='w-10 text-center bg-gray-200 rounded-l'>
                <p>V</p>
              </div>
              {/*Post data section*/}
              <div className='w-full p-2'>
                <div className='flex items-center'>
                  <Link href={`r/${post.subName}`}>
                    <>
                      <img
                        src='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                        alt=''
                        className='w-6 h-6 mr-1 rounded-full cursor-pointer'
                      />
                      <a className='text-xs font-bold cursor-pointer hover:underline'>
                        /r/{post.subName}
                      </a>
                    </>
                  </Link>
                  <p className='text-xs text-gray-500'>
                    <span className='mx-1'>•</span>
                    Posted by
                    <Link href={`u/${post.username}`}>
                      <a href='' className='mx-1 hover:underline'>
                        {post.username}
                      </a>
                    </Link>
                    <Link href={post.url}>
                      <a className='mx-1 hover:underline'>
                        {dayjs(post.createdAt).fromNow()}
                      </a>
                    </Link>
                  </p>
                </div>
                <Link href={post.url}>
                  <a className='my-1 text-lg font-medium'>{post.title}</a>
                </Link>
                {post.body && <p className='my-1 text-sm'>{post.body}</p>}
                <div className='flex'>
                  <Link href={post.url}>
                    <a>
                      <div className='px-1 py-1 mr-2 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200'>
                        <i className='mr-1 fas fa-comment-alt fa-xs'></i>
                        <span className='font-bold text-gray-400'>
                          20条评论
                        </span>
                      </div>
                    </a>
                  </Link>
                  <div className='px-1 py-1 mr-2 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200'>
                    <i className='mr-1 fas fa-share fa-xs'></i>
                    <span className='font-bold text-gray-400'>分享</span>
                  </div>
                  <div className='px-1 py-1 mr-2 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200'>
                    <i className='mr-1 fas fa-bookmark fa-xs'></i>
                    <span className='font-bold text-gray-400'>收藏</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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
