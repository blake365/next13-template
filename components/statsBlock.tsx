'use client'

import { CheckCircle, XCircle } from '@phosphor-icons/react'

export default function StatsBlock({ camp }) {
	return (
		<div className='flex flex-row flex-wrap py-1 bg-gray-100 border border-teal-600 rounded-md shadow-md justify-evenly'>
			<div className='flex flex-col items-center '>
				<div className=''>Capacity</div>
				<div className=''>{camp.capacity}</div>
			</div>
			<div className='flex flex-col items-center '>
				<div className=''>Primitive</div>
				<div className='text-teal-700'>
					{camp.primitive ? (
						<CheckCircle size={24} />
					) : (
						<XCircle size={24} color='red' />
					)}
				</div>
			</div>
			<div className='flex flex-col items-center '>
				<div className=''>Pets</div>
				<div className='text-teal-700'>
					{camp.pets ? (
						<CheckCircle size={24} />
					) : (
						<XCircle size={24} color='red' />
					)}
				</div>
			</div>
		</div>
	)
}
