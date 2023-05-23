'use client'

import { ColumnDef } from '@tanstack/react-table'

import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export type Booking = {
	id: string
	totalCost: number
	createdAt: Date
	startDate: Date
	endDate: Date
	numberOfGuests: number
	numberOfNights: number
	status: string
	campsite: {
		name: string
	}
	User: {
		email: string
	}
}

export const BookingColumns: ColumnDef<Booking>[] = [
	{
		id: 'actions',
		cell: ({ row }) => {
			const payment = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='w-8 h-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='w-4 h-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{/* TODO: update actions */}
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(payment.id)}
						>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View customer</DropdownMenuItem>
						<DropdownMenuItem>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: 'createdAt',
		header: 'Created',
		cell: ({ row }) => {
			const amount: Date = row.getValue('createdAt')
			const formatted = new Intl.DateTimeFormat('en-US', {}).format(amount)

			return <div className='font-medium'>{formatted}</div>
		},
	},
	{
		accessorKey: 'startDate',
		header: 'Start Date',
		cell: ({ row }) => {
			const amount: Date = row.getValue('startDate')
			const formatted = new Intl.DateTimeFormat('en-US', {}).format(amount)

			return <div className='font-medium'>{formatted}</div>
		},
	},
	{
		accessorKey: 'endDate',
		header: 'End Date',
		cell: ({ row }) => {
			const amount: Date = row.getValue('endDate')
			const formatted = new Intl.DateTimeFormat('en-US', {}).format(amount)

			return <div className='font-medium'>{formatted}</div>
		},
	},
	{
		accessorKey: 'numberOfNights',
		header: 'Nights',
	},
	{
		accessorKey: 'numberOfGuests',
		header: 'Guests',
	},
	{
		accessorKey: 'totalCost',
		header: () => <div className='text-right'>Total Cost</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('totalCost'))
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amount)

			return <div className='font-medium text-right'>{formatted}</div>
		},
	},
	{
		accessorKey: 'campsite.name',
		header: 'Campsite',
	},
	{
		accessorKey: 'User.email',
		header: 'User',
	},
]
