'use client';
import React, { FC, useState, useEffect } from 'react';
import facebookSvg from '@/images/Facebook.svg';
import twitterSvg from '@/images/Twitter.svg';
import googleSvg from '@/images/Google.svg';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Image from 'next/image';
import Link from 'next/link';
import { signUp } from '../(hooks)/useAdmin';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone_no: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  kvk_number: z.string().min(8, 'Kvk number must be 8 digits'),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
});

type SignupFormData = z.infer<typeof signupSchema>;

const sliderImages = [
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
  'https://images.unsplash.com/photo-1544148103-0773bf10d330',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945',
  'https://images.unsplash.com/photo-1565299585323-38d6b0865b47',
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full">
      {sliderImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${index === currentIndex ? 'w-4 bg-white' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const PageSignUp: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (data: SignupFormData) => {
    try {
      setApiError(null);
      await signUp(data);
      alert('Account created successfully!');
    } catch (error: any) {
      if (error.response?.data?.field) {
        setError(error.response.data.field, {
          type: 'manual',
          message: error.response.data.message,
        });
      } else {
        setApiError(error.response?.data?.message || 'Failed to create account.');
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="container flex min-h-screen items-center justify-center px-4 py-16">
        <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-lg shadow-2xl md:flex-row">
          <div className="relative w-full overflow-hidden bg-blue-500 md:w-1/2">
            <ImageSlider />
          </div>
          <div className="w-full max-h-screen overflow-auto bg-white dark:bg-gray-800 p-8 md:w-1/2 md:p-10">
            <div className="mx-auto max-w-md">
              <div className="mb-8">
                <p className="text-sm text-gray-600 dark:text-gray-300 sm:text-lg">Welcome!</p>
                <h2 className="text-md font-medium text-blue-500 sm:text-xl">Create Account</h2>
              </div>
              <h3 className="text-md mb-6 font-medium sm:text-xl">
                <span className="text-blue-500">Sign Up</span> For Free
              </h3>
              <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                {['name', 'email', 'phone_no', 'password', 'kvk_number'].map((field) => (
                  <div key={field} className="space-y-1">
                    <input
                      type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                      className={`w-full border-0 border-b-2 pb-2 outline-none bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:ring-0 ${errors[field as keyof SignupFormData] ? 'border-red-500' : 'border-blue-500'}`}
                      placeholder={field.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      {...register(field as keyof SignupFormData)}
                    />
                    <p className="text-xs text-red-500">{errors[field as keyof SignupFormData]?.message}</p>
                  </div>
                ))}
                <div className="mt-3 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className={`h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800`}
                    {...register('terms')}
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                    I agree to the Terms and Privacy Policy
                  </label>
                </div>
                <p className="text-xs text-red-500">{errors.terms?.message}</p>
                {apiError && <p className="text-sm text-red-500 text-center">{apiError}</p>}
                <ButtonPrimary
                  type="submit"
                  className="mt-5 w-full rounded bg-blue-500 py-3 font-medium text-white hover:bg-blue-600"
                >
                  SIGN UP
                </ButtonPrimary>
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link href="/login" className="font-medium text-blue-500 hover:underline">
                    Sign In
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

export default PageSignUp;