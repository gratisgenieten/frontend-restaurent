"use client"
import React, { FC, useState, useEffect } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import T from "@/utils/getT";

export interface PageSignUpProps {}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const sliderImages = [
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d", 
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe", 
  "https://images.unsplash.com/photo-1544148103-0773bf10d330",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945", 
  "https://images.unsplash.com/photo-1565299585323-38d6b0865b47", 
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="h-full w-full relative">
      {/* Images */}
      {sliderImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
      ))}

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-4" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const PageSignUp: FC<PageSignUpProps> = ({}) => {
  return (
    <div className={`nc-PageSignUp min-h-screen w-full`}>
      <div className="container relative flex min-h-screen items-center justify-center px-4 py-16">
        <div className="flex w-full max-w-5xl flex-col md:flex-row rounded-lg overflow-hidden shadow-2xl">
          <div className="relative w-full md:w-1/2 bg-blue-500 overflow-hidden">
            <ImageSlider />
            <div className="absolute inset-0 flex flex-col justify-between p-10 text-white">
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-white p-8 md:p-10 overflow-auto max-h-screen">
            <div className="max-w-md mx-auto">
              <div className="mb-8 space-y-2">
                <p className="text-gray-600 text-sm sm:text-lg">Welcome !</p>
                <h2 className="text-md sm:text-xl font-medium text-blue-500">
                  Create Account
                </h2>
              </div>

              <h3 className="mb-6 text-md sm:text-xl font-medium">
                <span className="text-blue-500">Sign Up</span> For Free
              </h3>

              <form className="space-y-5">
                <div className="space-y-">
                  <input
                    type="text"
                    className="w-full border-0 border-b-2 border-blue-500 focus:border-blue-500 focus:ring-0 pb-2 outline-none"
                    placeholder="Title (Mr./Mrs./Ms.)"
                  />
                </div>

                <div className="space-y-">
                  <input
                    type="text"
                    className="w-full border-0 border-b-2 border-blue-500 focus:border-blue-500 focus:ring-0 pb-2 outline-none"
                    placeholder="Full Name"
                  />
                </div>

                <div className="space-y-">
                  <input
                    type="email"
                    className="w-full border-0 border-b-2 border-blue-500 focus:border-blue-500 focus:ring-0 pb-2 outline-none"
                    placeholder="Email Address"
                  />
                </div>
                
                <div className="space-y-">
                  <input
                    type="tel"
                    className="w-full border-0 border-b-2 border-blue-500 focus:border-blue-500 focus:ring-0 pb-2 outline-none"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="space-y-">
                  <input
                    type="text"
                    className="w-full border-0 border-b-2 border-blue-500 focus:border-blue-500 focus:ring-0 pb-2 outline-none"
                    placeholder="City"
                  />
                </div>
                
                <div className="space-y-">
                  <select
                    className="w-full border-0 border-b-2 border-blue-500 focus:border-blue-500 focus:ring-0 pb-2 outline-none text-gray-500"
                  >
                    <option value="" disabled selected>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer">Prefer not to say</option>
                  </select>
                </div>

                <div className="space-y-">
                  <input
                    type="password"
                    className="w-full border-0 border-b-2 border-blue-500 focus:border-blue-500 focus:ring-0 pb-2 outline-none"
                    placeholder="Password"
                  />
                </div>

                <div className="space-y-">
                  <input
                    type="password"
                    className="w-full border-0 border-b-2 border-blue-500 focus:border-blue-500 focus:ring-0 pb-2 outline-none"
                    placeholder="Confirm Password"
                  />
                </div>

                <div className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 text-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-xs sm:text-sm text-gray-600"
                  >
                    I agree to the Terms and Privacy Policy
                  </label>
                </div>

                <ButtonPrimary
                  type="submit"
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded mt-5"
                >
                  SIGN UP
                </ButtonPrimary>

                <div className="text-center text-sm text-gray-600">
                  <span>
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 font-medium">
                      Sign In
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;