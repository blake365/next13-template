import Link from 'next/link'
import { SignInButton } from '@/components/buttons'

export default function NavMenu() {
	return (
		<nav className='flex items-center justify-between bg-teal-600 h-14'>
			<Link href='/'>
				<h1 className='ml-4 text-2xl font-bold'>Lazy M Camping</h1>
			</Link>
			<ul className='flex items-center mr-4 space-x-4 list-none'>
				<li>
					<Link href='/about'>About</Link>
				</li>
				<li>
					<Link href='/blog'>Blog</Link>
				</li>
				<li>
					<SignInButton />
				</li>
			</ul>
		</nav>
	)
}
