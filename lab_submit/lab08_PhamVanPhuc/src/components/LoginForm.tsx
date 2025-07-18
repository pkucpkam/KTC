import React from "react";
import { LoginFormSchema } from "../schemas/LoginForm.schema";
import { useForm } from "react-hook-form";
import type { LoginForm } from "../types/LoginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const LoginFormUI = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginForm>({
        resolver: yupResolver(LoginFormSchema),
    });

    const onSubmit: (data: LoginForm) => void = (data) => {
        console.log(data);
        alert("Login successful!");
        reset();
    };

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 m-auto mt-40">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Sign In
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <input
                        id="email"
                        type="email"
                        {...register("email")}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500 text-left">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        id="password"
                        type="password"
                        {...register("password")}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.password
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        placeholder="Enter your password"
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500 text-left">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between space-x-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                        Sign In
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/register", { replace: true })} // Gọi navigate trực tiếp
                        className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginFormUI;
