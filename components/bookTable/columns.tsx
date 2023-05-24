'use client'

import { ColumnDef } from '@tanstack/react-table'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

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
		id: string
		slug: string
	}
	User: {
		email: string
		id: string
	}
}

export const BookingColumns: ColumnDef<Booking>[] = [
	{
		id: 'actions',
		cell: ({ row }) => {
			const booking = row.original

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
							onClick={() => navigator.clipboard.writeText(booking.id)}
						>
							Edit
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View customer</DropdownMenuItem>
						<DropdownMenuItem>View booking</DropdownMenuItem>

						<Link href={`/campsite/${booking.campsite.slug}`}>
							<DropdownMenuItem>View campsite</DropdownMenuItem>
						</Link>
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
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Created
					<ArrowUpDown className='w-4 h-4 ml-2' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const amount: Date = row.getValue('createdAt')
			const formatted = new Intl.DateTimeFormat('en-US', {}).format(amount)

			return <div className='font-medium'>{formatted}</div>
		},
	},
	{
		accessorKey: 'startDate',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Start Date
					<ArrowUpDown className='w-4 h-4 ml-2' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const amount: Date = row.getValue('startDate')
			const formatted = new Intl.DateTimeFormat('en-US', {}).format(amount)

			return <div className='font-medium'>{formatted}</div>
		},
	},
	{
		accessorKey: 'endDate',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					End Date
					<ArrowUpDown className='w-4 h-4 ml-2' />
				</Button>
			)
		},
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
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Total Cost
					<ArrowUpDown className='w-4 h-4 ml-2' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('totalCost'))
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amount)

			return <div className=''>{formatted}</div>
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
