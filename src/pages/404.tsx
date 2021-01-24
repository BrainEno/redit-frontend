import Link from "next/link";

export default function NotFound() {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='mt-10 mb-4 text-5xl text-gray-800'>未找到页面</h1>
      <Link href='/'>
        <a className='px-4 py-2 blue button'>返回首页</a>
      </Link>
    </div>
  );
}
