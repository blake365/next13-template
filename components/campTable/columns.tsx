'use client'

import Link from 'next/link'
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
						<Link href={`admin/campsite/${campsite.slug}`}>
							<DropdownMenuItem>Edit</DropdownMenuItem>
						</Link>
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
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Name
					<ArrowUpDown className='w-4 h-4 ml-2' />
				</Button>
			)
		},
	},
	{
		accessorKey: 'open',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Status
					<ArrowUpDown className='w-4 h-4 ml-2' />
				</Button>
			)
		},
		cell: ({ row }) => {
			// console.log(row.getValue('open'))
			return row.getValue('open') ? (
				<div className='font-medium'>Open</div>
			) : (
				<div className='font-medium'>Closed</div>
			)
		},
	},
	{
		accessorKey: 'price',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Price / Night
					<ArrowUpDown className='w-4 h-4 ml-2' />
				</Button>
			)
		},
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
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Capacity
					<ArrowUpDown className='w-4 h-4 ml-2' />
				</Button>
			)
		},
	},
]
