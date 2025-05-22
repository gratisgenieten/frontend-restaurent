// Updated Login Page with Zod validation and custom API error handling
"use client";

import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonPrimary from "@/shared/ButtonPrimary";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import { loginAdmin } from "@/hooks/apis/useAuth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const sliderImages = [
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative h-full w-full">
      {sliderImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
        >
          <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center space-x-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${index === currentIndex ? "bg-white w-4" : "bg-white/50 dark:bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
};

const PageLogin: FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const res = await loginAdmin(data);
      Cookies.set("token", res.token, { expires: 365 });
      router.push("/account/deals");
    } catch (error: any) {
      const message = error?.response?.data?.message || "email was not found";
      if (message.toLowerCase().includes("email")) {
        setError("email", { message });
      } else if (message.toLowerCase().includes("password")) {
        setError("password", { message });
      } else {
        setError("email", { message });
      } 
      
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="nc-PageLogin min-h-screen w-full bg-white dark:bg-neutral-900 transition-colors">
      <div className="container flex min-h-screen items-center justify-center px-4 py-16">
        <div className="flex w-full max-w-5xl flex-col md:flex-row overflow-hidden rounded-2xl shadow-xl">
          <div className="relative hidden w-full md:block md:w-1/2">
            <ImageSlider />
            <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
          </div>
          <div className="w-full md:w-1/2 bg-white dark:bg-neutral-800 p-8 md:p-10">
            <div className="max-w-md mx-auto">
              <div className="mb-6 space-y-2">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Hello 👋</p>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Good Morning</h2>
              </div>
              <h3 className="mb-6 text-lg font-medium text-neutral-900 dark:text-neutral-100">
                <span className="text-blue-600 dark:text-blue-400">Login</span> Your Account
              </h3>

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full border-0 border-b-2 border-blue-500 focus:border-blue-500 focus:ring-0 pb-2 outline-none bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Email Address"
                  />
                  <p className="text-xs text-red-500 mt-1">{errors.email?.message}</p>
                </div>

                <div>
                  <input
                    type="password"
                    {...register("password")}
                    className="w-full border-0 border-b-2 border-blue-500 focus:border-blue-500 focus:ring-0 pb-2 outline-none bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Password"
                  />
                  <p className="text-xs text-red-500 mt-1">{errors.password?.message}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:justify-between mt-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 text-blue-500 sm:mb-0 mb-3 border-gray-300"
                    />
                    <label htmlFor="remember" className="ml-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      Remember Me
                    </label>
                  </div>
                  <Link href="/" className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    Forgot Password ?
                  </Link>
                </div>

                <ButtonPrimary className="w-full mt-4" disabled={loading} type="submit">
                  {loading ? "Logging in..." : "SUBMIT"}
                </ButtonPrimary>

                <div className="pt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
                  No Account?{' '}
                  <Link href="/signup" className="text-blue-600 dark:text-blue-400 font-medium">
                    Create an Account
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
