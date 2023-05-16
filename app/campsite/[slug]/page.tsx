import { CampsiteForm } from '@/app/admin/components/campsiteForm'
import Carousel from '@/components/carousel'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'

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
	})

	if (!camp) {
		redirect('/')
	}

	// const session = await getServerSession(authOptions)
	// // console.log(session)

	// const currentUserEmail = session?.user?.email!

	// // console.log(currentUserEmail)
	// const admin = await prisma.user.findFirst({
	// 	where: {
	// 		email: currentUserEmail,
	// 		role: 'admin',
	// 	},
	// })

	let allImages: string[] = []
	camp.mainImage && allImages.push(camp.mainImage)

	if (camp.images.length > 0) {
		allImages = allImages.concat(camp.images)
	}

	return (
		<div className='flex flex-col items-center justify-start min-h-screen gap-4 p-4'>
			{/* header */}
			<h1 className='text-5xl'>{camp.name}</h1>

			{/* cover image carousel */}
			<div className=''>
				{/* TODO: make responsive */}
				<Carousel images={allImages} />
			</div>
			<div className='flex flex-col justify-center space-x-5 md:flex-row'>
				{/* description */}

				<div>
					<div>{camp.longDescription}</div>
					<div>Camp amenities </div>
					<div>Reviews</div>
				</div>

				{/* booking calendar */}
				<div>Calendar</div>
			</div>
			{/* {admin && (
				<div>
					<CampsiteForm campsite={camp} />
				</div>
			)} */}
		</div>
	)
}
