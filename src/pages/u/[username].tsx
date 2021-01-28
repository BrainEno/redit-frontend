import dayjs from "dayjs";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Post, Comment } from "../../../types";
import Postcard from "../../components/PostCard";

const user: React.FC = () => {
  const router = useRouter();
  const username = router.query.username;

  const { data, error } = useSWR<any>(username ? `/users/${username}` : null);
  if (error) router.push("/");

  if (data) console.log(data);
  return (
    <>
      <Head>
        <title>{data?.user.username}</title>
      </Head>
      {data && (
        <div className='flex justify-center pt-5'>
          <div className='w-160'>
            {data.submissions.map((submission: any) => {
              if (submission.type === "Post") {
                const post: Post = submission;
                return <Postcard key={post.identifier} post={post} />;
              } else {
                const comment: Comment = submission;
                return (
                  <div
                    key={comment.identifier}
                    className='flex my-4 bg-white rounded'>
                    <div className='flex-shrink-0 w-10 py-4 text-center rounded-1'>
                      <i className='text-gray-500 bg-gray-50 fas fa-comment-alt fa-xs'></i>
                    </div>
                    <div className='w-full p-2'>
                      <p className='mb-2 text-xs text-gray-500'>
                        <span className='text-blue-500 cursor-pointer hover:underline'>
                          {comment.username}
                        </span>
                        <span> commented on </span>
                        <Link href={comment.post.url}>
                          <a className='font-semibold cursor-pointer hover:underline'>
                            {comment.post.title}
                          </a>
                        </Link>
                        <span className='mx-1'>•</span>
                        <Link href={`/r/${comment.post.subName}`}>
                          <a className='text-black cursor-pointer hover:underline'>
                            {comment.post.subName}
                          </a>
                        </Link>
                      </p>
                      <hr />
                      <p>{comment.body}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className='mt-4 ml-6 w-80'>
            <div className='bg-white rounded'>
              <div className='p-3 bg-blue-500 rounded-t'>
                <img
                  src='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                  alt='user'
                  className='w-16 h-16 mx-auto border-2 border-white rounded-full'
                />
              </div>
              <div className='p-3 text-center'>
                <h1 className='mb-3 text-xl '>{data.user.username}</h1>
                <hr />
                <p className='mt-3'>
                  Joined {dayjs(data.user.createdAt).format("MMM YYYY")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default user;
