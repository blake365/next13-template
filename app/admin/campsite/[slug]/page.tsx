'use client'

import ImageBlock from '@/components/imageBlock'
import BookCalendar from '@/components/calendar'
import StatsBlock from '@/components/statsBlock'
import AmenityBlock from '@/components/amenityBlock'
import MapAndDirections from '@/components/mapAndDirections'
import Rules from '@/components/rules'
import { useEffect, useState } from 'react'

interface Props {
	params: {
		slug: string
	}
}

// page containing detailed information about a campsite

export default function CampsiteDetail({ params }: Props) {
	console.log(params.slug)
	const [camp, setCamp] = useState<any>({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const url = new URL('/api/campsite', window.location.origin)
		url.search = new URLSearchParams({ slug: params.slug }).toString()

		const fetchCamp = async () => {
			const response = await fetch(url)
			const data = await response.json()
			return data
		}

		fetchCamp().then((res) => {
			console.log(res)
			setCamp(res)
			setLoading(false)
		})
	}, [])

	// console.log(camp)

	let allImages = { main: '', image1: '', image2: '' }
	allImages.main = camp.mainImage
	allImages.image1 = camp.mainImage
	allImages.image2 = camp.mainImage

	const updateCamp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('updating camp')
	}

	return (
		<form onSubmit={updateCamp}>
			<div className='flex flex-col justify-start min-h-screen gap-4 mb-6 '>
				{/* header */}
				<div className='sticky top-0 z-10 flex flex-row items-center w-full py-2 pt-4 bg-white/90'>
					<h1 className='flex-grow ml-2 text-3xl sm:text-4xl'>
						<input
							type='text'
							className='w-full text-gray-600'
							defaultValue={camp.name}
						/>
					</h1>
					{camp.open ? (
						<a href='#booking'>
							<button className='p-1 px-4 mr-2 text-xl text-white bg-teal-600 rounded-full shadow-md hover:bg-teal-700'>
								Book
							</button>
						</a>
					) : (
						<div className='p-1 px-4 mr-2 text-xl text-white bg-red-600 border border-red-600 rounded-full'>
							CLOSED
						</div>
					)}
				</div>
				{/* campsite images */}
				<ImageBlock images={allImages} loading={false} />

				{/* other information */}
				<div className='flex flex-col sm:space-x-5 md:flex-row'>
					{/* description */}

					<div className='flex-grow space-y-4'>
						<StatsBlock camp={camp} />
						<div className='px-4 text-lg'>
							<textarea
								name='longDescription'
								className='w-full text-gray-600'
								placeholder={camp.longDescription}
								rows={10}
							></textarea>
						</div>
						{/* TODO: contact with questions or special accommodations */}
						<AmenityBlock camp={camp} />
						{/* <MapAndDirections camp={camp} /> */}
						{/* <Rules rules={camp.rules!} /> */}
					</div>

					{/* booking calendar */}
					<div className='' id='booking'>
						{/* <BookCalendar camp={camp} /> */}
					</div>
				</div>
				{/* Map */}
				{/* directions */}
				{/* Rules */}
				{/* Reviews */}
				<div>Reviews</div>
			</div>
		</form>
	)
}
