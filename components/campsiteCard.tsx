'use client'
// card for displaying campsite information

import Image from 'next/image'
import Link from 'next/link'

import { Users } from '@phosphor-icons/react'

export default function CampsiteCard({ camp, admin }: any) {
	// console.log(camp.open)
	return (
		<div className='flex flex-col items-center justify-between w-full p-4 m-4 sm:w-2/3 max-w-[400px] space-y-2'>
			<Link href={`/campsite/${camp.slug}`}>
				<Image
					src={camp.mainImage}
					alt={camp.slug}
					width={400}
					height={300}
					className='rounded-md shadow-md'
				/>
			</Link>
			<div className='flex flex-row items-center w-full'>
				<h2 className='flex-grow text-xl font-bold'>{camp.name}</h2>
				{camp.open ? (
					<div className='px-2 text-sm text-green-600 border border-green-600 rounded-full'>
						open
					</div>
				) : (
					<div className='px-2 text-sm text-red-600 border border-red-600 rounded-full'>
						closed
					</div>
				)}
			</div>
			<div className='flex flex-row items-center w-full space-x-2'>
				<div className='flex items-center px-1 text-lg text-teal-800 dark:text-teal-300'>
					${camp.price}/night
				</div>
				<div className='flex items-center px-1 text-lg text-teal-800 dark:text-teal-300'>
					<Users size={20} weight='fill' className='mr-1' />
					{camp.capacity}
				</div>
			</div>
			<div>{camp.shortDescription}</div>
			<div className='flex flex-row justify-start w-full space-x-4'>
				{camp.open ? (
					<Link href={`/campsite/${camp.slug}/book`}>
						<button
							className='px-2 py-1 text-white bg-teal-500 rounded-md shadow-md hover:bg-teal-700'
							disabled={camp.open}
						>
							Book Now
						</button>
					</Link>
				) : (
					<button
						className='px-2 py-1 text-black bg-gray-300 rounded-md shadow-md'
						disabled={true}
					>
						Closed
					</button>
				)}

				<Link href={`/campsite/${camp.slug}`}>
					<button className='px-2 py-1 text-teal-800 underline hover:text-teal-600 dark:text-teal-300'>
						More Info
					</button>
				</Link>
			</div>
		</div>
	)
}
