import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { browser } from "process";
import { FormEvent, useState } from "react";
import InputGroup from "../components/InputGroup";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = await Axios.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      router.push("/");
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className='flex bg-white'>
      <div
        className='w-40 h-screen bg-center bg-cover'
        style={{ backgroundImage: "url('/noise.webp')" }}></div>

      <div className='flex flex-col justify-center pl-6 '>
        <div className='w-70'>
          <h1 className='mb-2 text-lg font-medium'>登录账户</h1>
          <p className='mb-10 text-xs'>同意隐私保护政策并继续登录</p>
          <form onSubmit={submitForm}>
            <InputGroup
              value={username}
              error={errors.username}
              placeholder='用户名'
              className='mb-2'
              type='input'
              setValue={setUsername}
            />
            <InputGroup
              value={password}
              error={errors.password}
              placeholder='密码'
              className='mb-4'
              type='password'
              setValue={setPassword}
            />

            <button
              type='submit'
              className='w-full py-3 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded'>
              登录
            </button>
          </form>
          <small>
            还没有账号？点击
            <Link href='/register'>
              <a className='ml-1 text-blue-500'>这里</a>
            </Link>
            注册
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
