import { FormEvent, useState } from "react";
import Link from "next/link";
import Axios from "axios";
import InputGroup from "../components/InputGroup";
import { useRouter } from "next/router";
import { useAuthState } from "../context/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const { authenticated } = useAuthState();
  const router = useRouter();
  if (authenticated) router.push("/");

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await Axios.post("/auth/register", {
        email,
        password,
        username,
      });

      router.push("/login");
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
          <h1 className='mb-2 text-lg font-medium'>新用户注册</h1>
          <p className='mb-10 text-xs'>同意隐私保护政策并继续注册</p>
          <form onSubmit={submitForm}>
            <div className='mb-6'>
              <input
                type='checkbox'
                className='mr-1 cursor-pointer'
                id='agreement'
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
              />
              <label htmlFor='agreement' className='text-xs cursor-pointer'>
                {agreement
                  ? "虽然并不会有什么最新资讯"
                  : "向我发送邮件以便获取关于BOT-TPC的最新资讯"}
              </label>
            </div>
            <InputGroup
              value={username}
              error={errors.username}
              placeholder='用户名'
              className='mb-2'
              type='input'
              setValue={setUsername}
            />
            <InputGroup
              value={email}
              error={errors.email}
              placeholder='Email'
              className='mb-2'
              type='email'
              setValue={setEmail}
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
              注册
            </button>
          </form>
          <small>
            已经有账号了？点击
            <Link href='/login'>
              <a className='ml-1 text-blue-500'>这里 </a>
            </Link>
            登录
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
