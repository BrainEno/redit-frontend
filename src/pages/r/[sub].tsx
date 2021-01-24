import { ChangeEvent, createRef, useEffect, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";
import { Post, Sub } from "../../../types";
import PostCard from "../../components/PostCard";
import Sidebar from "../../components/Sidebar";
import { useAuthState } from "../../context/auth";
import classNames from "classnames";

interface SubProps {}

const SubPage: React.FC<SubProps> = ({}) => {
  //Local state
  const [ownSub, setOwnSub] = useState<boolean>(false);
  const router = useRouter();
  const subName = router.query.sub;
  const fileInputRef = createRef<HTMLInputElement>();
  const { data: sub, error, revalidate } = useSWR<Sub>(
    subName ? `/subs/${subName}` : null
  );
  //Global state
  const { authenticated, user } = useAuthState();
  //Utils

  useEffect(() => {
    if (!sub) return;
    setOwnSub(authenticated && user?.username === sub.username);
  }, [sub]);

  const openFileInput = (type: string) => {
    if (!ownSub) return;
    fileInputRef.current!.name = type;
    fileInputRef.current?.click();
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", fileInputRef.current!.name);

    try {
      await Axios.post<Sub>(`/subs/${sub!.name}/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  if (error) router.push("/");
  let postsMarkup;
  if (!sub) {
    postsMarkup = <p className='text-lg text-center'>正在加载...</p>;
  } else if (sub.posts.length === 0) {
    postsMarkup = <p className='text-lg text-center'>该话题暂无贴文</p>;
  } else {
    postsMarkup = sub.posts.map((post: Post) => (
      <PostCard key={post.identifier} post={post} />
    ));
  }

  return (
    <div>
      <Head>
        <title>{sub?.title} | BOT CON</title>
      </Head>
      {sub && (
        <>
          <input
            type='file'
            hidden={true}
            ref={fileInputRef}
            onChange={uploadImage}
          />
          <div>
            {/**Banner image */}
            <div
              onClick={() => openFileInput("banner")}
              className={classNames("bg-blue-500", {
                "cursor-pointer": ownSub,
              })}>
              {sub.bannerUrl ? (
                <div
                  className='h-56 bg-blue-500'
                  style={{
                    backgroundImage: `url('${sub.bannerUrl}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}></div>
              ) : (
                <div className='h-20 bg-blue-500'></div>
              )}
            </div>
            {/**Sub meta data */}
            <div className='h-20 bg-white'>
              <div className='container relative flex' style={{ top: -15 }}>
                <div className='absolute'>
                  <img
                    src={sub.imageUrl}
                    alt='Sub'
                    className={classNames("rounded-full w-20 h-20", {
                      "cursor-pointer": ownSub,
                    })}
                    onClick={() => openFileInput("image")}
                  />
                </div>
                <div className='pt-5 pl-24'>
                  <div className='flex items-center'>
                    <h1 className='mb-1 text-3xl font-bold'>{sub.title}</h1>
                  </div>
                  <p className='text-sm font-bold text-gray-500'>
                    /r/{sub.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='container flex pt-5'>
            <div className='w-160'>{postsMarkup}</div>
            <Sidebar sub={sub} />
          </div>
        </>
      )}
    </div>
  );
};

export default SubPage;
