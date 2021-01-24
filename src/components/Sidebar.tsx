import dayjs from "dayjs";
import Link from "next/link";
import { Sub } from "types";
import { useAuthState } from "../context/auth";

interface SidebarProps {
  sub: Sub;
}

const Sidebar: React.FC<SidebarProps> = ({ sub }) => {
  const { authenticated } = useAuthState();
  return (
    <div className='ml-6 w-80'>
      <div className='bg-white rounded'>
        <div className='p-3 bg-blue-500 rounded-t'>
          <p className='font-semibold text-white'>关于社区</p>
        </div>
        <div className='p-3'>
          <p className='mb-3 text-md'>{sub.description}</p>
          <div className='flex mb-3 text-sm font-medium'>
            <div className='w-1/2'>
              <p>5.2k</p>
              <p>成员</p>
            </div>
            <div className='w-1/2'>
              <p>150</p>
              <p>在线</p>
            </div>
          </div>
          <p className='my-3'>
            <i className='mr-2 fas fa-birthday-cake'></i>
            创建于 {dayjs(sub.createdAt).format("DD MMM YYYY")}
          </p>
          {authenticated && (
            <Link href={`/r/${sub.name}/submit`}>
              <a className='w-full py-1 text-sm rounded blue button'>
                发表贴文
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
