'use client'

import { CheckCircle, XCircle } from '@phosphor-icons/react'

export default function AmenityBlock({ camp }) {
	return (
		<div className='flex flex-col p-4 space-y-2 rounded-md'>
			<div className='text-lg font-bold'>Amenities</div>
			{camp.primitive && (
				<div className='text-sm'>
					Please note that this is primitive camping so amenities are very
					limited.
				</div>
			)}
			<div className='flex flex-row items-start'>
				{camp.firePit ? (
					<CheckCircle size={24} color='teal' className='mr-2' />
				) : (
					<XCircle size={24} color='red' className='mr-2' />
				)}
				<div>Fire Ring</div>
			</div>
			<div className='flex flex-row items-start'>
				{camp.picnicTable ? (
					<CheckCircle size={24} color='teal' className='mr-2' />
				) : (
					<XCircle size={24} color='red' className='mr-2' />
				)}
				<div>Picnic Table</div>
			</div>
			<div className='flex flex-row items-start'>
				{camp.potableWater ? (
					<CheckCircle size={24} color='teal' className='mr-2' />
				) : (
					<XCircle size={24} color='red' className='mr-2' />
				)}
				<div>Potable Water</div>
			</div>
			<div className='flex flex-row items-start'>
				{camp.toilets ? (
					<CheckCircle size={24} color='teal' className='mr-2' />
				) : (
					<XCircle size={24} color='red' className='mr-2' />
				)}
				<div>Toilets</div>
			</div>
			<div className='flex flex-row items-start'>
				{camp.electricity ? (
					<CheckCircle size={24} color='teal' className='mr-2' />
				) : (
					<XCircle size={24} color='red' className='mr-2' />
				)}
				<div>Electricity</div>
			</div>
		</div>
	)
}
