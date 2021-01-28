import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Post, Comment } from "../../../../../types";
import Sidebar from "../../../../components/Sidebar";
import Axios from "axios";
import classNames from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAuthState } from "../../../../context/auth";
import ActionButton from "../../../../components/ActionButton";
import { FormEvent, useState } from "react";

dayjs.extend(relativeTime);

const PostPage: React.FC = () => {
  //Local state
  const [newComment, setNewComment] = useState("");
  //Global state
  const { authenticated, user } = useAuthState();
  //Utils

  const router = useRouter();

  const { identifier, sub, slug } = router.query;

  const { data: post, error } = useSWR<Post>(
    identifier && slug ? `/posts/${identifier}/${slug}` : null
  );

  const { data: comments, revalidate } = useSWR<Comment[]>(
    identifier && slug ? `/posts/${identifier}/${slug}/comments` : null
  );

  console.log(comments);

  if (error) router.push("/");

  const vote = async (value: number, comment?: Comment) => {
    //If not logged in go to login
    if (!authenticated) router.push("/login");
    //If vote is the same reset vote
    if (
      (!comment && value === post.userVote) ||
      (comment && comment.userVote === value)
    )
      value = 0;

    try {
      await Axios.post("/misc/vote", {
        identifier,
        slug,
        commentIdentifier: comment?.identifier,
        value,
      });

      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  const submitComment = async (event: FormEvent) => {
    event.preventDefault();
    if (newComment.trim() === "") return;
    try {
      await Axios.post(`/posts/${post.identifier}/${post.slug}/comments`, {
        body: newComment,
      });

      setNewComment("");
      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <Link href={`/r/${sub}`}>
        <a>
          <div className='flex items-center w-full h-20 p-8 bg-blue-500'>
            <div className='container flex'>
              {post && (
                <img
                  src={post.sub.imageUrl}
                  alt=''
                  className='w-8 h-8 mr-2 rounded-full'
                />
              )}
              <p className='text-xl font-semibold text-white'>/r/{sub}</p>
            </div>
          </div>
        </a>
      </Link>
      <div className='flex justify-center pt-5'>
        {/**Post */}
        <div className='w-160'>
          <div className='bg-white rounded'>
            {post && (
              <>
                <div className='flex'>
                  {/**vote section */}
                  <div className='flex-shrink-0 w-10 py-3 text-center bg-white rounded-l'>
                    <div
                      onClick={() => vote(1)}
                      className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500'>
                      <i
                        className={classNames("icon-arrow-up", {
                          "text-red-500": post.userVote === 1,
                        })}></i>
                    </div>
                    <p
                      className={classNames(
                        "text-xs font-bold",
                        { "text-red-500": post.userVote === 1 },
                        { "text-blue-500": post.userVote === -1 }
                      )}>
                      {post.voteScore}
                    </p>
                    <div
                      onClick={() => vote(-1)}
                      className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500'>
                      <i
                        className={classNames("icon-arrow-down", {
                          "text-blue-500": post.userVote === -1,
                        })}></i>
                    </div>
                  </div>
                  <div className='py-2 pr-2'>
                    <div className='flex items-center'>
                      <p className='text-xs text-gray-500'>
                        Posted by
                        <Link href={`/u/${post.username}`}>
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
                    {/**Post Title */}
                    <h1 className='my-1 text-xl font-size-medium'>
                      {post.title}
                    </h1>
                    {/**Post Body */}
                    <p className='my-3 text-sm'>{post.body}</p>
                    {/**Actions */}
                    <div className='flex'>
                      <Link href={post.url}>
                        <a>
                          <ActionButton>
                            <i className='mr-1 fas fa-comment-alt fa-xs'></i>
                            <span className='font-bold text-gray-400'>
                              {post.commentCount} 条评论
                            </span>
                          </ActionButton>
                        </a>
                      </Link>
                      <ActionButton>
                        <i className='mr-1 fas fa-share fa-xs'></i>
                        <span className='font-bold text-gray-400'>分享</span>
                      </ActionButton>
                      <ActionButton>
                        <i className='mr-1 fas fa-bookmark fa-xs'></i>
                        <span className='font-bold text-gray-400'>收藏</span>
                      </ActionButton>
                    </div>
                  </div>
                </div>
                {/**Comment input area */}
                <div className='pl-10 pr-6 mb-4'>
                  {authenticated ? (
                    <div>
                      <p className='mb-1 text-xs'>
                        Comment as
                        <Link href={`/u/${user.username}`}>
                          <a href='' className='font-semibold text-blue-500'>
                            {" " + user.username}
                          </a>
                        </Link>
                      </p>
                      <form onSubmit={submitComment}>
                        <textarea
                          className='w-full h-32 px-3 py-1 border border-gray-300 rounded resize-none foucus:outline-none focus:border-gray-600'
                          onChange={(e) => setNewComment(e.target.value)}
                          value={newComment}></textarea>
                        <div className='flex justify-end'>
                          <button
                            className='px-3 py-1 blue button'
                            disabled={newComment.trim() === ""}>
                            发表评论
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className='flex items-center justify-between px-2 py-4 ml-2 border border-gray-200 rounded'>
                      <p className='font-semibold text-gray-500 '>
                        登录或注册账号发表评论
                      </p>
                      <div>
                        <Link href='/login'>
                          <a className='px-4 py-1 mr-4 hollow blue button'>
                            登录
                          </a>
                        </Link>
                        <Link href='/register'>
                          <a className='px-4 py-1 blue button'>注册</a>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <hr />
                {/**Comments feed */}
                {comments?.map((comment) => (
                  <div className='flex' key={comment.identifier}>
                    <div className='flex-shrink-0 w-10 py-3 text-center bg-white rounded-l'>
                      <div
                        onClick={() => vote(1, comment)}
                        className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500'>
                        <i
                          className={classNames("icon-arrow-up", {
                            "text-red-500": comment.userVote === 1,
                          })}></i>
                      </div>
                      <p
                        className={classNames(
                          "text-xs font-bold",
                          { "text-red-500": comment.userVote === 1 },
                          { "text-blue-500": comment.userVote === -1 }
                        )}>
                        {comment.voteScore}
                      </p>
                      <div
                        onClick={() => vote(-1, comment)}
                        className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500'>
                        <i
                          className={classNames("icon-arrow-down", {
                            "text-blue-500": comment.userVote === -1,
                          })}></i>
                      </div>
                    </div>
                    <div className='p-2'>
                      <p className='mb-1 text-xs leading-none'>
                        <Link href={`/u/${comment.username}`}>
                          <a className='font-bold mr hover:underline'>
                            {comment.username}
                          </a>
                        </Link>
                        <span className='text-gray-600'>
                          {`${comment.voteScore}
                          points • ${dayjs(comment.createdAt).fromNow()}
                          `}
                        </span>
                      </p>
                      <p>{comment.body}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {post && <Sidebar sub={post.sub} />}
      </div>
    </>
  );
};

export default PostPage;
