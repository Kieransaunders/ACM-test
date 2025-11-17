// Canvas LMS API Type Definitions

export interface Course {
	id: number
	name: string
	course_code: string
	workflow_state: 'available' | 'completed' | 'deleted'
	start_at?: string
	end_at?: string
	enrollment_term_id?: number
}

export interface AssignmentSubmission {
	submitted_at: string | null
	score: number | null
	grade: string | null
	workflow_state: 'submitted' | 'unsubmitted' | 'graded'
}

export interface Assignment {
	id: number
	name: string
	description: string
	due_at: string | null
	unlock_at?: string | null
	lock_at?: string | null
	points_possible: number
	grading_type: 'points' | 'percent' | 'letter_grade' | 'pass_fail' | 'gpa_scale'
	submission_types: string[]
	published: boolean
	course_id: number
	html_url: string
	locked_for_user: boolean
	has_submitted_submissions?: boolean
	submission?: AssignmentSubmission
}

export interface AssignmentWithCourse extends Assignment {
	course_name: string
	course_code: string
}

export interface CanvasError {
	errors: Array<{
		message: string
	}>
}
