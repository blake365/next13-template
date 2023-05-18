import ImageBlock from '@/components/imageBlock'

export default function LoadingCampsite() {
	const allImages = { main: '', image1: '', image2: '' }

	return (
		<div className='flex flex-col justify-start min-h-screen gap-4'>
			{/* header */}
			<h1 className='w-24 mt-4 text-5xl bg-gray-100 bg-opacity-75 animate-pulse'></h1>
			{/* campsite images */}
			<ImageBlock images={allImages} loading={false} />

			{/* other information */}
			<div className='flex flex-col justify-center space-x-5 bg-gray-100 bg-opacity-75 md:flex-row animate-pulse w-full min-h-[200px]'></div>
		</div>
	)
}
