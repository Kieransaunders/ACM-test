// Assignment List Component - Groups assignments by course
import type { AssignmentWithCourse } from '@/types/canvas'
import AssignmentCard from './assignment-card'

interface AssignmentListProps {
	assignments: AssignmentWithCourse[]
	groupBy?: 'course' | 'none'
}

export default function AssignmentList({ assignments, groupBy = 'none' }: AssignmentListProps) {
	if (assignments.length === 0) {
		return (
			<div className="text-center py-12">
				<svg
					className="mx-auto h-12 w-12 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
					/>
				</svg>
				<h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
					No assignments found
				</h3>
				<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
					You don&apos;t have any assignments in your active courses.
				</p>
			</div>
		)
	}

	// If not grouping, just show all assignments
	if (groupBy === 'none') {
		return (
			<div className="space-y-4">
				{assignments.map(assignment => (
					<AssignmentCard key={assignment.id} assignment={assignment} />
				))}
			</div>
		)
	}

	// Group assignments by course
	const groupedByCourse = assignments.reduce((acc, assignment) => {
		const courseKey = `${assignment.course_id}`
		if (!acc[courseKey]) {
			acc[courseKey] = {
				courseName: assignment.course_name,
				courseCode: assignment.course_code,
				assignments: []
			}
		}
		acc[courseKey].assignments.push(assignment)
		return acc
	}, {} as Record<string, { courseName: string; courseCode: string; assignments: AssignmentWithCourse[] }>)

	return (
		<div className="space-y-8">
			{Object.entries(groupedByCourse).map(([courseId, { courseName, courseCode, assignments }]) => (
				<div key={courseId}>
					{/* Course header */}
					<div className="mb-4">
						<h2 className="text-xl font-bold text-gray-900 dark:text-white">
							{courseName}
						</h2>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							{courseCode} • {assignments.length} assignment{assignments.length !== 1 ? 's' : ''}
						</p>
					</div>

					{/* Assignments for this course */}
					<div className="space-y-4">
						{assignments.map(assignment => (
							<AssignmentCard key={assignment.id} assignment={assignment} />
						))}
					</div>
				</div>
			))}
		</div>
	)
}
