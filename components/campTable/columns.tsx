'use client'

import Link from 'next/link'

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

export type Camp = {
	id: string
	name: string
	open: boolean
	price: number
	capacity: number
	slug: string
}

export const CampColumns: ColumnDef<Camp>[] = [
	{
		id: 'actions',
		cell: ({ row }) => {
			const campsite = row.original

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
							onClick={() => navigator.clipboard.writeText(campsite.id)}
						>
							Edit
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<Link href={`/campsite/${campsite.slug}`}>
							<DropdownMenuItem>View campsite</DropdownMenuItem>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'open',
		header: 'Status',
		cell: ({ row }) => {
			console.log(row.getValue('open'))
			return row.getValue('open') ? (
				<div className='font-medium'>Open</div>
			) : (
				<div className='font-medium'>Closed</div>
			)
		},
	},
	{
		accessorKey: 'price',
		header: 'Price per night',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('price'))
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amount)

			return <div className=''>{formatted}</div>
		},
	},
	{
		accessorKey: 'capacity',
		header: 'Capacity',
	},
]
