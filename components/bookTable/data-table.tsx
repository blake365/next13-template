'use client'

import * as React from 'react'

import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	filter: string
	button: boolean
}

export function DataTable<TData, TValue>({
	columns,
	data,
	filter,
	button,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([])

	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	)

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	})

	async function createCampsite() {
		console.log('createCampsite')

		const body = {
			name: 'New Campsite',
		}

		const res = await fetch('/api/campsite', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		await res.json().then((data) => {
			console.log('data', data.slug)
			redirect(`/admin/campsite/${data.slug}`)
		})
	}

	return (
		<div className='border rounded-md'>
			<div className='flex items-center justify-between py-4 mx-4'>
				<Input
					placeholder={`Filter ${filter}...`}
					value={(table.getColumn(filter)?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn(filter)?.setFilterValue(event.target.value)
					}
					className='max-w-sm'
				/>
				{button && (
					<Button
						className='bg-green-600 hover:bg-green-700'
						onClick={() => {
							createCampsite()
						}}
					>
						New Campsite
					</Button>
				)}
			</div>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className='h-24 text-center'>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
