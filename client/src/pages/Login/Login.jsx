import { useEffect } from "react";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import Input from '../../customComp/Input';
import EmailIcon from '../../icons/EmailIcon';
import PasswordLockIcon from '../../icons/PasswordLockIcon';
import { useLoginMutation } from '../../redux-rtk/features/auth/authApi';
import LoadingIcon from '../../icons/LoadingIcon';
import { cx } from '../../hooks/helpers';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {

  // const { auth, setAuth } = useAuth();
  // console.log(auth)
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from.pathname || "/dashboard";

  const auth = useSelector((state) => state.auth);
  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(loginSchema) });
  // const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
  //   resolver: yupResolver(loginSchema),
  // });



  const onSubmit = (data) => {
    console.log(data);
    login(data)
  };

  // if api call success then redirect to dashboard
  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard')
    }
  }, [isSuccess, navigate])

  // if authenticated then redirect to dashboard
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/dashboard')
    }
  }, [auth.isAuthenticated, navigate])

  return (
    <div className=''>
      <div className=" rounded-sm border h-full border-stroke  py-5 ">
        <div className="flex items-center justify-center h-screen">
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5 bg-white">
              <h2 className="mb-9 text-center text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Login
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="magicorb@gmail.com"
                        value={field.value}
                        onChange={field.onChange}
                        icon={<EmailIcon />}
                      />
                    )}
                  />
                </div>

                <div className="mb-6">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="password"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={field.value}
                        onChange={field.onChange}
                        icon={<PasswordLockIcon />}
                      />
                    )}
                  />
                </div>


                <div className="mb-5">
                  <button
                    type="submit"
                    className={cx(
                      "w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90",
                      isLoading && 'flex items-center justify-center'
                    )}
                  >
                    {isLoading && <LoadingIcon />}
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default Login;
