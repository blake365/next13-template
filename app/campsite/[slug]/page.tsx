import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import ImageBlock from '@/components/imageBlock'
import BookCalendar from '@/components/calendar'
import StatsBlock from '@/components/statsBlock'
import AmenityBlock from '@/components/amenityBlock'
import MapAndDirections from '@/components/mapAndDirections'
import Rules from '@/components/rules'

interface Props {
	params: {
		slug: string
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const camp = await prisma.campsite.findUnique({
		where: { slug: params.slug },
	})
	return { title: `${camp?.name}` }
}

// page containing detailed information about a campsite

export default async function CampsiteDetail({ params }: Props) {
	// console.log(params.slug)
	const camp = await prisma.campsite.findUnique({
		where: {
			slug: params.slug,
		},
		include: {
			bookings: true,
			reviews: true,
		},
	})

	if (!camp) {
		redirect('/')
	}

	// console.log(camp)

	let allImages = {
		main: camp.mainImage,
		image1: camp.image2,
		image2: camp.image3,
	}

	return (
		<div className='flex flex-col justify-start min-h-screen gap-4 mb-6 '>
			{/* header */}
			<div className='sticky top-0 z-10 flex flex-row items-center w-full py-2 pt-4 bg-white/90'>
				<h1 className='flex-grow ml-2 text-3xl font-bold sm:text-4xl'>
					{camp.name}
				</h1>
				{camp.open ? (
					<a href='#booking'>
						<button className='p-1 px-4 mr-2 text-xl text-white bg-teal-600 rounded-full shadow-md hover:bg-teal-700'>
							Go to Calendar
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
					<div className='px-4 text-lg'>{camp.longDescription}</div>
					{/* TODO: contact with questions or special accommodations */}
					<AmenityBlock camp={camp} />
					<MapAndDirections camp={camp} />
					<Rules rules={camp.rules!} />
				</div>

				{/* booking calendar */}
				<div className='' id='booking'>
					<BookCalendar camp={camp} />
				</div>
			</div>

			<div>Reviews</div>
		</div>
	)
}
