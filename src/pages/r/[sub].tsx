import { useRouter } from "next/router";
import useSWR from "swr";
import { Post } from "../../../types";
import PostCard from "../../components/PostCard";

interface SubProps {}

const Sub: React.FC<SubProps> = ({}) => {
  const router = useRouter();
  const subName = router.query.sub;

  const { data: sub, error } = useSWR(subName ? `/subs/${subName}` : null);
  if (error) router.push("/");
  let postsMarkup;
  if (!sub) {
    postsMarkup = <p className='text-lg text-center'>正在加载...</p>;
  } else if (sub.posts.length === 0) {
    postsMarkup = <p className='text-lg text-center'>该话题暂无贴文</p>;
  } else {
    postsMarkup = sub.posts.map((post: Post) => (
      <PostCard key={post.id} post={post} />
    ));
  }

  return (
    <div className='container flex pt-5'>
      {sub && <div className='w-160'>{postsMarkup}</div>}
    </div>
  );
};

export default Sub;
