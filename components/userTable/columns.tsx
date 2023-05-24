'use client'

import { ColumnDef } from '@tanstack/react-table'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export type User = {
	id: string
	firstName: string
	lastName: string
	email: string
	dateOfBirth: Date
	role: string
	createdAt: Date
	updatedAt: Date
}

export const UserColumns: ColumnDef<User>[] = [
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
							Edit
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View user</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
	{
		accessorKey: 'firstName',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					First
					<ArrowUpDown className='w-4 h-4 ml-2' />
				</Button>
			)
		},
	},
	{
		accessorKey: 'lastName',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Last
					<ArrowUpDown className='w-4 h-4 ml-2' />
				</Button>
			)
		},
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Email
					<ArrowUpDown className='w-4 h-4 ml-2' />
				</Button>
			)
		},
	},
	{
		accessorKey: 'dateOfBirth',
		header: 'DOB',
	},
	{
		accessorKey: 'role',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Role
					<ArrowUpDown className='w-4 h-4 ml-2' />
				</Button>
			)
		},
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
		accessorKey: 'updatedAt',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Updated
					<ArrowUpDown className='w-4 h-4 ml-2' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const amount: Date = row.getValue('updatedAt')
			const formatted = new Intl.DateTimeFormat('en-US', {}).format(amount)
			return <div className='font-medium'>{formatted}</div>
		},
	},
]
