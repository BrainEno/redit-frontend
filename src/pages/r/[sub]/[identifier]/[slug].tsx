import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Post } from "../../../../../types";
import Sidebar from "../../../../components/Sidebar";
import Axios from "axios";
import classNames from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAuthState } from "../../../../context/auth";
import ActionButton from "../../../../components/ActionButton";

dayjs.extend(relativeTime);

const PostPage: React.FC = () => {
  //Local state

  //Global state
  const { authenticated } = useAuthState();
  //Utils

  const router = useRouter();

  const { identifier, sub, slug } = router.query;
  console.log(router.query);

  const { data: post, error } = useSWR<Post>(
    identifier && slug ? `/posts/${identifier}/${slug}` : null
  );

  console.log(post);

  if (error) router.push("/");

  const vote = async (value: number) => {
    //If not logged in go to login
    if (!authenticated) router.push("/login");
    //If vote is the same reset vote
    if (value === post.userVote) value = 0;

    try {
      const res = await Axios.post("/misc/vote", {
        identifier,
        slug,
        value,
      });

      console.log(res.data);
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
      <div className='container flex pt-5'>
        {/**Post */}
        <div className='w-160'>
          <div className='bg-white rounded'>
            {post && (
              <div className='flex'>
                {/**vote section */}
                <div className='w-10 py-3 text-center rounded-l bg-gray-50'>
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
                <div className='p-2'>
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
            )}
          </div>
        </div>
        {post && <Sidebar sub={post.sub} />}
      </div>
    </>
  );
};

export default PostPage;
