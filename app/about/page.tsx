export const dynamic = 'force-static'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'About Us',
	description: 'This is the about page',
}

export default async function About() {
	return (
		<div>
			<h1>About</h1>
			<p>This is the about page</p>
		</div>
	)
}
