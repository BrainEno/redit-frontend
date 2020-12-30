import Head from "next/head";
import Link from "next/link";

const Register = () => {
  return (
    <div className='flex'>
      <Head>
        <title>注册</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div
        className='w-40 h-screen bg-center bg-cover'
        style={{ backgroundImage: "url('/noise.webp')" }}></div>

      <div className='flex flex-col justify-center pl-6 '>
        <div className='w-70'>
          <h1 className='mb-2 text-lg font-medium'>新用户注册</h1>
          <p className='mb-10 text-xs'>点击同意隐私保护政策，以继续注册</p>
          <form action=''>
            <div className='mb-6'>
              <input
                type='checkbox'
                className='mr-1 cursor-pointer'
                id='agreement'
              />
              <label htmlFor='agreement' className='text-xs cursor-pointer'>
                向我发送邮件以便获取关于BOT-TPC的最新资讯
              </label>
            </div>
            <div className='mb-2'>
              <input
                type='email'
                className='w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded'
                placeholder='Email'
              />
            </div>
            <div className='mb-2'>
              <input
                type='text'
                className='w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded'
                placeholder='用户名'
              />
            </div>
            <div className='mb-2'>
              <input
                type='password'
                className='w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded'
                placeholder='密码'
              />
            </div>
            <button className='w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded'>
              注册
            </button>
          </form>
          <small>
            已经有账号了？点击
            <Link href='/'>
              <a className='ml-1 text-blue-500'>这里</a>
            </Link>
            登录
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
