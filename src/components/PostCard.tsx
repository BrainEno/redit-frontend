import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { Post } from "../../types";
import Axios from "axios";
import classNames from "classnames";

dayjs.extend(relativeTime);

const ActionButton: React.FC = ({ children }) => {
  return (
    <div className='px-1 py-1 mr-2 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200'>
      {children}
    </div>
  );
};

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({
  post: {
    identifier,
    voteScore,
    subName,
    body,
    slug,
    createdAt,
    title,
    url,
    userVote,
    username,
    commentCount,
  },
}) => {
  const vote = async (value: number) => {
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
    <div key={identifier} className='flex mb-4 bg-white rounded'>
      {/*Vote section*/}
      <div className='w-10 py-3 text-center bg-gray-200 rounded-l'>
        <div
          onClick={() => vote(1)}
          className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500'>
          <i
            className={classNames("icon-arrow-up", {
              "text-red-500": userVote === 1,
            })}></i>
        </div>
        <p
          className={classNames(
            "text-xs font-bold",
            { "text-red-500": userVote === 1 },
            { "text-blue-500": userVote === -1 }
          )}>
          {voteScore}
        </p>
        <div
          onClick={() => vote(-1)}
          className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500'>
          <i
            className={classNames("icon-arrow-down", {
              "text-blue-500": userVote === -1,
            })}></i>
        </div>
      </div>
      {/*Post data section*/}
      <div className='w-full p-2'>
        <div className='flex items-center'>
          <Link href={`r/${subName}`}>
            <img
              src='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
              alt=''
              className='w-6 h-6 mr-1 rounded-full cursor-pointer'
            />
          </Link>
          <Link href={`r/${subName}`}>
            <a className='text-xs font-bold cursor-pointer hover:underline'>
              r/{subName}
            </a>
          </Link>
          <p className='text-xs text-gray-500'>
            <span className='mx-1'>•</span>
            Posted by
            <Link href={`u/${username}`}>
              <a href='' className='mx-1 hover:underline'>
                {username}
              </a>
            </Link>
            <Link href={url}>
              <a className='mx-1 hover:underline'>
                {dayjs(createdAt).fromNow()}
              </a>
            </Link>
          </p>
        </div>
        <Link href={url}>
          <a className='my-1 text-lg font-medium'>{title}</a>
        </Link>
        {body && <p className='my-1 text-sm'>{body}</p>}
        <div className='flex'>
          <Link href={url}>
            <a>
              <ActionButton>
                <i className='mr-1 fas fa-comment-alt fa-xs'></i>
                <span className='font-bold text-gray-400'>
                  {commentCount} 条评论
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
  );
};

export default PostCard;
