import Page from '@/components/page'
import Section from '@/components/section'
import Link from 'next/link'

const Index = () => (
	<Page>
		<Section>
			<h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
				Welcome to MyACM
			</h2>

			<div className='mt-2'>
				<p className='text-zinc-600 dark:text-zinc-400'>
					MyACM is your student assignments dashboard for Canvas LMS. View all your assignments from all your courses in one convenient place.
				</p>

				<br />

				<Link
					href='/assignments'
					className='inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors'
				>
					View My Assignments
				</Link>

				<br />
				<br />

				<p className='text-sm text-zinc-600 dark:text-zinc-400'>
					Built with Next.js and Canvas LMS API
				</p>
			</div>
		</Section>
	</Page>
)

export default Index
