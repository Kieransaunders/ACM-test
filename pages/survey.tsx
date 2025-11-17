import Page from '@/components/page'

const Survey = () => (
	<Page title='Survey'>
		<div className='relative -m-6 h-[calc(100vh-10rem)] sm:h-[calc(100vh-5rem)]'>
			<iframe
				src='https://myacm.carrd.co'
				className='h-full w-full border-0'
				title='MyACM Survey'
				loading='lazy'
			/>
		</div>
	</Page>
)

export default Survey
