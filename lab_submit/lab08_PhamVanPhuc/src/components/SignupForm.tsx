import React from "react";
import { SignupFormSchema } from "../schemas/SignupForm.schema";
import { useForm } from "react-hook-form";
import type { SignupForm } from "../types/SignupForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const SignupFormUI = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SignupForm>({
        resolver: yupResolver(SignupFormSchema),
    });

    const onSubmit: (data: SignupForm) => void = (data) => {
        console.log(data);
        alert("Registration successful!");
        navigate("/login", { replace: true });
        reset();
    };

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 m-auto mt-12">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Sign Up
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <input
                        id="name"
                        type="text"
                        {...register("name")}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your name"
                    />

                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500 text-left">
                            {errors.name.message}
                        </p>
                    )}
                </div>

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
                        id="phone"
                        type="text"
                        {...register("phone")}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-500 text-left">
                            {errors.phone.message}
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

                <div>
                    <input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword")}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.confirmPassword
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500 text-left">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between space-x-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                        Sign Up
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignupFormUI;
