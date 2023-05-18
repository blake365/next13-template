import Image from 'next/image'

export default function ImageBlock({ images, loading }) {
	return (
		<div className='flex sm:flex-row flex-col w-full sm:h-[500px] min-h-fit gap-2'>
			{/* large image */}
			<div className='relative h-full overflow-hidden min-h-[400px] sm:w-1/2'>
				{loading ? (
					<div className='absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 animate-pulse'>
						{' '}
					</div>
				) : (
					<Image
						src={images.main!}
						alt='main image'
						// width={500}
						// height={500}
						fill={true}
						className='rounded-md shadow-md'
						style={{ objectFit: 'cover' }}
					/>
				)}
			</div>
			{/* small images */}
			<div className='flex flex-col h-full gap-2 sm:w-1/2'>
				<div className='relative sm:min-h-[200px] min-h-[300px] h-full  sm:h-1/2'>
					{loading ? (
						<div className='absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 animate-pulse'>
							{' '}
						</div>
					) : (
						<Image
							src={images.image1!}
							alt='image 1'
							// width={500}
							// height={500}
							fill={true}
							className='rounded-md shadow-md'
							style={{ objectFit: 'cover' }}
						/>
					)}
				</div>
				<div className='relative sm:min-h-[200px] min-h-[300px] h-full sm:h-1/2'>
					{loading ? (
						<div className='absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 animate-pulse'>
							{' '}
						</div>
					) : (
						<Image
							src={images.image2!}
							alt='image 2'
							// width={500}
							// height={500}
							fill={true}
							className='rounded-md shadow-md'
							style={{ objectFit: 'cover' }}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
