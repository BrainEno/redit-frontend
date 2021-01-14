import React from "react";
import Logo from "../../public/logo.svg";
import Link from "next/link";
import Axios from "axios";
import { useAuthDispatch, useAuthState } from "../context/auth";

const Navbar: React.FC = () => {
  const { authenticated, loading } = useAuthState();
  const dispatch = useAuthDispatch();

  const logout = () => {
    Axios.get("/auth/logout")
      .then(() => {
        dispatch("LOGOUT");
        window.location.reload();
      })
      .catch((err) => console.log(err));
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
      <div className='flex items-center mx-auto bg-gray-100 border rounded hover:bg-white hover:border-blue-500'>
        <i className='pl-4 pr-3 text-gray-500 fas fa-search'></i>
        <input
          type='text'
          className='py-1 pr-3 bg-transparent rounded focus:outline-none w-160'
          placeholder='搜索...'
        />
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
