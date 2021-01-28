import Axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import useSWR from "swr";
import { Sub, Post } from "../../../../types";
import Sidebar from "../../../components/Sidebar";

interface submitProps {}

const submit: React.FC<submitProps> = ({}) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { sub: subName } = router.query;
  const { data: sub, error } = useSWR<Sub>(subName ? `/subs/${subName}` : null);

  if (error) router.push("/");

  const submitPost = async (event: FormEvent) => {
    event.preventDefault();

    if (title.trim() === "") return;

    try {
      const { data: post } = await Axios.post<Post>("/posts", {
        title: title.trim(),
        body,
        sub: sub.name,
      });

      router.push(`/r/${sub.name}/${post.identifier}/${post.slug}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex justify-center w-full pt-5'>
      <Head>
        <title>Submit to BOT CON</title>
      </Head>
      <div className='w-185'>
        <div className='p-4 bg-white rounded'>
          {sub && (
            <div className='flex items-center mb-3'>
              <img
                src={sub.imageUrl}
                alt='Sub'
                className={"rounded-full w-6 h-6 mr-2"}
              />
              <h1 className='text-lg '>/r/{subName}</h1>
            </div>
          )}

          <form onSubmit={submitPost}>
            <div className='relative mb-2'>
              <input
                type='text'
                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none'
                placeholder='标题'
                maxLength={300}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div
                className='absolute mb-2 text-sm text-gray-500 select-none'
                style={{ top: 11, right: 10 }}>
                {title.trim().length}/300
              </div>
            </div>
            <textarea
              className='w-full p-3 mt-1 border border-gray-300 rounded resize-none focus:outline-none focus:border-gray-600'
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='文字(可选)'
              rows={5}></textarea>
            <div className='flex justify-end'>
              <button
                className='px-3 py-2 mt-2 blue button'
                type='submit'
                disabled={title.trim().length === 0}>
                发布贴文
              </button>
            </div>
          </form>
        </div>
      </div>
      {sub && <Sidebar sub={sub} />}
    </div>
  );
};

export default submit;
