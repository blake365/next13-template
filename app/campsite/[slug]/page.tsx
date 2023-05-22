import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import ImageBlock from '@/components/imageBlock'
import BookCalendar from '@/components/calendar'
import StatsBlock from '@/components/statsBlock'
import AmenityBlock from '@/components/amenityBlock'

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
		},
	})

	if (!camp) {
		redirect('/')
	}

	// console.log(camp)

	let allImages = { main: '', image1: '', image2: '' }
	allImages.main = camp.mainImage
	allImages.image1 = camp.mainImage
	allImages.image2 = camp.mainImage

	return (
		<div className='flex flex-col justify-start min-h-screen gap-4 mb-6 '>
			{/* header */}
			<div className='sticky top-0 z-10 flex flex-row items-center w-full py-4 mt-4 bg-white/75'>
				<h1 className='flex-grow ml-2 text-5xl font-bold'>{camp.name}</h1>
				{camp.open ? (
					<div className='px-4 py-2 mr-2 text-xl text-green-600 border border-green-600 rounded-full'>
						OPEN
					</div>
				) : (
					<div className='px-4 py-2 mr-2 text-xl text-white bg-red-600 border border-red-600 rounded-full'>
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
					<AmenityBlock camp={camp} />
				</div>

				{/* booking calendar */}
				<div className=''>
					<BookCalendar camp={camp} />
				</div>
			</div>
			{/* Map */}
			<div>Map</div>
			{/* directions */}
			<div>Directions</div>
			{/* Rules */}
			<div>Rules</div>
			{/* Reviews */}
			<div>Reviews</div>
		</div>
	)
}
