'use client'
import React, { FC, useState, useEffect } from 'react'
import facebookSvg from '@/images/Facebook.svg'
import twitterSvg from '@/images/Twitter.svg'
import googleSvg from '@/images/Google.svg'
import Input from '@/shared/Input'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Image from 'next/image'
import Link from 'next/link'
import T from '@/utils/getT'
import { signUp } from '../(hooks)/useAdmin'
import { set } from 'lodash'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const signupSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z
		.string()
		.email('Invalid email address'),
	phone_no: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
	kvk_number: z.string().min(8, 'Kvk number must be 8 digits'),
	terms: z.literal(true, {
		errorMap: () => ({ message: 'You must accept the terms and conditions' }),
	}),
})

type SignupFormData = z.infer<typeof signupSchema>

export interface PageSignUpProps {}

const loginSocials = [
	{
		name: 'Continue with Facebook',
		href: '#',
		icon: facebookSvg,
	},
	{
		name: 'Continue with Twitter',
		href: '#',
		icon: twitterSvg,
	},
	{
		name: 'Continue with Google',
		href: '#',
		icon: googleSvg,
	},
]

const sliderImages = [
	'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
	'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
	'https://images.unsplash.com/photo-1544148103-0773bf10d330',
	'https://images.unsplash.com/photo-1566073771259-6a8506099945',
	'https://images.unsplash.com/photo-1565299585323-38d6b0865b47',
]

const ImageSlider = () => {
	const [currentIndex, setCurrentIndex] = useState(0)

	// Auto-slide effect
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1,
			)
		}, 5000)

		return () => clearInterval(interval)
	}, [])

	// Manual navigation
	const goToSlide = (index: number) => {
		setCurrentIndex(index)
	}

	return (
		<div className="relative h-full w-full">
			{/* Images */}
			{sliderImages.map((image, index) => (
				<div
					key={index}
					className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
						index === currentIndex ? 'opacity-100' : 'opacity-0'
					}`}
				>
					<div
						className="h-full w-full bg-cover bg-center"
						style={{ backgroundImage: `url(${image})` }}
					/>
				</div>
			))}

			{/* Navigation dots */}
			<div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
				{sliderImages.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`h-2 w-2 rounded-full transition-all ${
							index === currentIndex ? 'w-4 bg-white' : 'bg-white/50'
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	)
}

const PageSignUp: FC<PageSignUpProps> = ({}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
	})

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone_no, setPhoneNo] = useState('')
	const [password, setPassword] = useState('')
	const [kvk_number, setKvk_number] = useState('')

	const [apiError, setApiError] = useState<string | null>(null)

	const onSubmit = async (data: SignupFormData) => {
		try {
			console.log("it's here")
			setApiError(null) // Reset any previous API error
			await signUp(data)
			alert('Account created successfully!')
		} catch (error: any) {
			if (error.response?.data?.field) {
				setError(error.response.data.field, {
					type: 'manual',
					message: error.response.data.message,
				})
			} else {
				console.log('else part')
				console.log(error.response?.data?.message)
				setApiError(
					error.response?.data?.message || 'Failed to create account.',
				)
			}
		}
	}

	return (
		<div className={`nc-PageSignUp min-h-screen w-full`}>
			<div className="container relative flex min-h-screen items-center justify-center px-4 py-16">
				<div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-lg shadow-2xl md:flex-row">
					<div className="relative w-full overflow-hidden bg-blue-500 md:w-1/2">
						<ImageSlider />
						<div className="absolute inset-0 flex flex-col justify-between p-10 text-white"></div>
					</div>
					<div className="max-h-screen w-full overflow-auto bg-white p-8 md:w-1/2 md:p-10">
						<div className="mx-auto max-w-md">
							<div className="mb-8 space-y-2">
								<p className="text-sm text-gray-600 sm:text-lg">Welcome !</p>
								<h2 className="text-md font-medium text-blue-500 sm:text-xl">
									Create Account
								</h2>
							</div>

							<h3 className="text-md mb-6 font-medium sm:text-xl dark:text-black">
								<span className="text-blue-500">Sign Up</span> For Free
							</h3>

							<form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
								<div className="space-y-0">
									<input
										type="text"
										className={`w-full border-0 border-b-2 border-blue-500 pb-2 outline-none focus:border-blue-500 focus:ring-0 ${errors.name ? 'border-red-500' : 'border-blue-500'} dark:text-black`}
										placeholder="Full Name"
										value={name}
										{...register('name')}
										onChange={(e) => setName(e.target.value)}
									/>

									<p className="mt-0 text-xs text-red-500">
										{errors.name?.message}
									</p>
								</div>

								<div className="space-y-0">
									<input
										type="email"
										className={`w-full border-0 border-b-2 border-blue-500 pb-2 outline-none focus:border-blue-500 focus:ring-0 ${errors.email ? 'border-red-500' : 'border-blue-500'} dark:text-black`}
										placeholder="Email Address"
										{...register('email')}
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
									<p className="mt-0 text-xs text-red-500">
										{errors.email?.message}
									</p>
								</div>

								<div className="space-y-0">
									<input
										type="tel"
										className={`w-full border-0 border-b-2 border-blue-500 pb-2 outline-none focus:border-blue-500 focus:ring-0 ${errors.phone_no ? 'border-red-500' : 'border-blue-500'} dark:text-black`}
										placeholder="Phone Number"
										value={phone_no}
										{...register('phone_no')}
										onChange={(e) => setPhoneNo(e.target.value)}
									/>
									<p className="mt-0 text-xs text-red-500">
										{errors.phone_no?.message}
									</p>
								</div>

								<div className="space-y-0">
									<input
										type="password"
										className={`w-full border-0 border-b-2 border-blue-500 pb-2 outline-none focus:border-blue-500 focus:ring-0 ${errors.password ? 'border-red-500' : 'border-blue-500'} dark:text-black`}
										placeholder="Password"
										{...register('password')}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<p className="mt-0 text-xs text-red-500">
										{errors.password?.message}
									</p>
								</div>

								<div className="space-y-0">
									<input
										type="number"
										className={`w-full border-0 border-b-2 border-blue-500 pb-2 outline-none focus:border-blue-500 focus:ring-0 ${errors.password ? 'border-red-500' : 'border-blue-500'} dark:text-black`}
										placeholder="Kvk Number"
										{...register('kvk_number')}
										value={kvk_number}
										onChange={(e) => setKvk_number(e.target.value)}
									/>
									<p className="mt-0 text-xs text-red-500">
										{errors.kvk_number?.message}
									</p>
								</div>

								<div className="mt-3 flex flex-col">
									<div className="flex items-center">
										<input
											type="checkbox"
											id="terms"
											className={`h-4 w-4 border-gray-300 text-blue-500 ${
												errors.terms ? 'border-red-500' : 'border-blue-500'
											} dark:text-black`}
											{...register('terms')}
										/>
										<label
											htmlFor="terms"
											className="ml-2 text-xs text-gray-600 sm:text-sm"
										>
											I agree to the Terms and Privacy Policy
										</label>
									</div>
									<p className="mt-1 text-xs text-red-500">
										{errors.terms?.message}
									</p>
								</div>

								{apiError && <p className="text-sm text-red-500 text-center">{apiError}</p>}

								<ButtonPrimary
									type="submit"
									className="mt-5 w-full rounded bg-blue-500 py-3 font-medium text-white hover:bg-blue-600"
								>
									SIGN UP
								</ButtonPrimary>

								<div className="text-center text-sm text-gray-600">
									<span>
										Already have an account?{' '}
										<Link href="/login" className="font-medium text-blue-500">
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
	)
}

export default PageSignUp
