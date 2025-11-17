// Assignment Card Component
import type { AssignmentWithCourse } from '@/types/canvas'

interface AssignmentCardProps {
	assignment: AssignmentWithCourse
}

export default function AssignmentCard({ assignment }: AssignmentCardProps) {
	// Format due date
	const formatDueDate = (dueAt: string | null) => {
		if (!dueAt) return 'No due date'

		const date = new Date(dueAt)
		const now = new Date()
		const diffTime = date.getTime() - now.getTime()
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

		const dateStr = date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
		})

		const timeStr = date.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit'
		})

		// Add urgency indicator
		let urgencyClass = ''
		let urgencyText = ''

		if (diffDays < 0) {
			urgencyClass = 'text-red-600 dark:text-red-400'
			urgencyText = 'Overdue'
		} else if (diffDays === 0) {
			urgencyClass = 'text-orange-600 dark:text-orange-400'
			urgencyText = 'Due today'
		} else if (diffDays === 1) {
			urgencyClass = 'text-yellow-600 dark:text-yellow-400'
			urgencyText = 'Due tomorrow'
		} else if (diffDays <= 7) {
			urgencyClass = 'text-blue-600 dark:text-blue-400'
			urgencyText = `Due in ${diffDays} days`
		}

		return { dateStr, timeStr, urgencyClass, urgencyText }
	}

	const dueDateInfo = formatDueDate(assignment.due_at)

	// Check if submitted
	const isSubmitted = assignment.submission?.workflow_state === 'submitted' ||
		assignment.submission?.workflow_state === 'graded'

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
			{/* Course info */}
			<div className="flex items-center gap-2 mb-2">
				<span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
					{assignment.course_code}
				</span>
				{isSubmitted && (
					<span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full">
						Submitted
					</span>
				)}
			</div>

			{/* Assignment name */}
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
				<a
					href={assignment.html_url}
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
				>
					{assignment.name}
				</a>
			</h3>

			{/* Due date and points */}
			<div className="flex flex-wrap items-center gap-4 text-sm">
				{assignment.due_at && typeof dueDateInfo !== 'string' ? (
					<div className="flex flex-col">
						<span className={`font-medium ${dueDateInfo.urgencyClass}`}>
							{dueDateInfo.urgencyText || dueDateInfo.dateStr}
						</span>
						<span className="text-gray-600 dark:text-gray-400">
							{dueDateInfo.dateStr} at {dueDateInfo.timeStr}
						</span>
					</div>
				) : (
					<span className="text-gray-500 dark:text-gray-400">No due date</span>
				)}

				{assignment.points_possible > 0 && (
					<div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>{assignment.points_possible} pts</span>
					</div>
				)}
			</div>

			{/* Submission info if graded */}
			{assignment.submission?.workflow_state === 'graded' && assignment.submission.score !== null && (
				<div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
					<div className="text-sm">
						<span className="text-gray-600 dark:text-gray-400">Score: </span>
						<span className="font-semibold text-gray-900 dark:text-white">
							{assignment.submission.score} / {assignment.points_possible}
						</span>
						{assignment.submission.grade && (
							<span className="ml-2 text-gray-600 dark:text-gray-400">
								({assignment.submission.grade})
							</span>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
