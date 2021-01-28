import React, { useEffect, useState } from "react";
import Logo from "../../public/logo.svg";
import Link from "next/link";
import Axios from "axios";
import { Sub } from "types";
import { useAuthDispatch, useAuthState } from "../context/auth";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const [name, setName] = useState("");
  const [subs, setSubs] = useState<Sub[]>([]);
  const [timer, setTimer] = useState(null);
  const { authenticated, loading } = useAuthState();
  const dispatch = useAuthDispatch();
  const router = useRouter();

  const logout = () => {
    Axios.get("/auth/logout")
      .then(() => {
        dispatch("LOGOUT");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (name.trim() === "") {
      setSubs([]);
    }
    searchSubs();
  }, [name]);

  const searchSubs = async () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        try {
          const { data } = await Axios.get(`/subs/search/${name}`);
          setSubs(data);
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      }, 250)
    );
  };

  const goToSub = (subName: string) => {
    router.push(`/r/${subName}`);
    setName("");
  };

  return (
    <div className='fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-white'>
      {/*Logo and title */}
      <div className='flex items-center'>
        <Link href='/'>
          <a>
            <Logo className='w-10 h-10 mr-2' />
          </a>
        </Link>
        <span className='text-2xl font-semibold'>
          <Link href='/'>BOT CON</Link>
        </span>
      </div>
      {/*Search Input*/}
      <div className='relative flex items-center mx-auto bg-gray-100 border rounded hover:bg-white hover:border-blue-500'>
        <i className='pl-4 pr-3 text-gray-500 fas fa-search'></i>
        <input
          type='text'
          className='py-1 pr-3 bg-transparent rounded focus:outline-none w-160'
          placeholder='搜索...'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div
          className='absolute left-0 right-0 bg-white '
          style={{ top: "100%" }}>
          {subs?.map((sub) => (
            <div
              className='flex items-center px-4 py-3 cursor-pointer hover:bg-gray-200'
              key={sub.title}
              onClick={() => goToSub(sub.name)}>
              <img
                src={sub.imageUrl}
                alt='sub'
                className='mr-4 rounded-full'
                style={{ height: "32px", width: "32px" }}
              />
              <div className='ml-4 text-sm'>
                <p className='font-medium'>{sub.name}</p>
                <p className='text-gray-600'>{sub.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/*Auth buttons*/}
      <div className='flex'>
        {!loading &&
          (authenticated ? (
            <button
              className='w-32 py-1 mr-4 leading-5 hollow blue button'
              onClick={logout}>
              退出登录
            </button>
          ) : (
            <>
              <Link href='/login'>
                <a
                  href=''
                  className='w-32 py-1 mr-4 leading-5 hollow blue button'>
                  登 录
                </a>
              </Link>
              <Link href='/register'>
                <a href='' className='w-32 py-1 leading-5 blue button'>
                  注 册
                </a>
              </Link>
            </>
          ))}
      </div>
    </div>
  );
};

export default Navbar;
