import React, { useEffect, useState } from 'react'
import logo from '../img/logo.png';
import backgroundImg from '..//img/background.jpg';
import { useParams } from 'react-router-dom';
import UserContext from '../Context/userContext';

const ForgetPassword = () => {

    const context = useContext(UserContext);
    const { sendEmail,updatePassword } = context;
    const [showPassword, SetShowPassword] = useState(false);
    //   sendEmail,updatePassword

    const { email, authToken } = useParams(); // extract information from the URL

    const togglePasswordShown = () => {
        SetShowPassword((prevState) => (!prevState));
    }

    useEff
    return (
        <div
            className='d-flex justify-content-center'
            style={{
                width: '100%',
                height: '100vh',
                alignItems: 'center',
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8  lg:px-8">
                {/*                               Header */}
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src={logo}
                        alt="Your Company"
                    />
                    <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Update Password
                    </h2>
                </div>
                {/*                               Fields */}

                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="" method="POST">


                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                {email}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    New Password
                                </label>
                                <div className="text-sm">

                                    <button onClick={togglePasswordShown} className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        {showPassword ? "Hide Password" : "View Password"}
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required className=" px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm Password
                            </label>
                            <div className="mt-2">
                                <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required className=" px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Confirm
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default ForgetPassword

