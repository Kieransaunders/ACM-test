# Canvas LMS API - Reference Guide

## Base URL
```
https://k12.instructure.com/api/v1/
```

## Authentication

All API requests require authentication using a Bearer token in the Authorization header:

```bash
Authorization: Bearer <ACCESS-TOKEN>
```

**Example:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://k12.instructure.com/api/v1/courses"
```

## Rate Limiting

Canvas uses dynamic throttling:
- Each request has a cost (check `X-Request-Cost` header)
- Throttled requests return `403 Forbidden (Rate Limit Exceeded)`
- Check `X-Rate-Limit-Remaining` header to monitor quota
- Make sequential requests when possible to avoid throttling

## Pagination

API returns paginated results with navigation links in the `Link` header:
```
Link: <https://k12.instructure.com/api/v1/courses?page=2>; rel="next"
```

Look for: `rel="next"`, `rel="prev"`, `rel="first"`, `rel="last"`

---

## Endpoints

### 1. List Courses

Get all courses the current user is enrolled in.

**Endpoint:**
```
GET /api/v1/courses
```

**Full URL:**
```
https://k12.instructure.com/api/v1/courses
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `enrollment_state` | string | Filter by enrollment state: `active`, `invited_or_pending`, `completed` |
| `include[]` | array | Include additional data: `term`, `teachers`, `total_scores`, `syllabus_body` |
| `per_page` | integer | Number of results per page (default: 10, max: 100) |

**Example Request:**
```bash
GET https://k12.instructure.com/api/v1/courses?enrollment_state=active&per_page=50
```

**Response (Array of Course objects):**
```json
[
  {
    "id": 123,
    "name": "Introduction to Computer Science",
    "course_code": "CS101",
    "enrollment_term_id": 1,
    "start_at": "2025-01-15T00:00:00Z",
    "end_at": "2025-05-15T23:59:59Z",
    "workflow_state": "available"
  }
]
```

**Key Fields:**
- `id` (number) - Course ID (use this for fetching assignments)
- `name` (string) - Full course name
- `course_code` (string) - Short course identifier
- `workflow_state` (string) - Course status: `available`, `completed`, `deleted`

---

### 2. List Assignments

Get all assignments for a specific course.

**Endpoint:**
```
GET /api/v1/courses/:course_id/assignments
```

**Full URL:**
```
https://k12.instructure.com/api/v1/courses/123/assignments
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `include[]` | array | Additional data: `submission`, `score_statistics`, `all_dates`, `overrides` |
| `search_term` | string | Filter assignments by partial title match |
| `bucket` | string | Filter by status: `past`, `overdue`, `undated`, `ungraded`, `upcoming`, `future` |
| `order_by` | string | Sort order: `position` (default), `name`, `due_at` |
| `per_page` | integer | Results per page (default: 10, max: 100) |

**Example Request:**
```bash
GET https://k12.instructure.com/api/v1/courses/123/assignments?include[]=submission&order_by=due_at&per_page=50
```

**Response (Array of Assignment objects):**
```json
[
  {
    "id": 456,
    "name": "Homework 1: Variables and Data Types",
    "description": "<p>Complete exercises 1-10 from the textbook</p>",
    "due_at": "2025-01-20T23:59:00Z",
    "unlock_at": "2025-01-13T00:00:00Z",
    "lock_at": null,
    "points_possible": 100,
    "grading_type": "points",
    "submission_types": ["online_text_entry", "online_upload"],
    "published": true,
    "course_id": 123,
    "html_url": "https://k12.instructure.com/courses/123/assignments/456",
    "has_submitted_submissions": false,
    "locked_for_user": false
  }
]
```

**Key Fields:**

**Identification:**
- `id` (number) - Assignment ID
- `name` (string) - Assignment title
- `course_id` (number) - Parent course ID

**Description:**
- `description` (string) - HTML description of assignment
- `html_url` (string) - Link to assignment page in Canvas

**Dates:**
- `due_at` (string|null) - Due date in ISO 8601 format
- `unlock_at` (string|null) - When assignment becomes available
- `lock_at` (string|null) - When assignment locks

**Grading:**
- `points_possible` (number) - Maximum points
- `grading_type` (string) - Type: `points`, `percent`, `letter_grade`, `pass_fail`, `gpa_scale`
- `submission_types` (array) - Allowed submission types

**Status:**
- `published` (boolean) - Whether visible to students
- `locked_for_user` (boolean) - Whether locked for current user
- `has_submitted_submissions` (boolean) - If any student submitted

**Submission (if `include[]=submission`):**
- `submission` (object|null) - Current user's submission data
  - `submitted_at` (string|null) - Submission timestamp
  - `score` (number|null) - Score received
  - `grade` (string|null) - Grade received
  - `workflow_state` (string) - Status: `submitted`, `unsubmitted`, `graded`

---

## Common Use Cases

### Get All Active Courses
```bash
GET https://k12.instructure.com/api/v1/courses?enrollment_state=active&per_page=100
Authorization: Bearer YOUR_TOKEN
```

### Get Upcoming Assignments for a Course
```bash
GET https://k12.instructure.com/api/v1/courses/123/assignments?bucket=upcoming&order_by=due_at
Authorization: Bearer YOUR_TOKEN
```

### Get All Assignments with Submission Status
```bash
GET https://k12.instructure.com/api/v1/courses/123/assignments?include[]=submission&order_by=due_at&per_page=100
Authorization: Bearer YOUR_TOKEN
```

---

## Error Responses

**401 Unauthorized - Invalid Token:**
```json
{
  "errors": [{"message": "Invalid access token."}]
}
```

**403 Forbidden - Rate Limit:**
```json
{
  "errors": [{"message": "Rate Limit Exceeded"}]
}
```

**404 Not Found - Invalid Course ID:**
```json
{
  "errors": [{"message": "The specified resource does not exist."}]
}
```

---

## TypeScript Type Definitions

```typescript
interface Course {
  id: number
  name: string
  course_code: string
  workflow_state: 'available' | 'completed' | 'deleted'
  start_at?: string
  end_at?: string
  enrollment_term_id?: number
}

interface Assignment {
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
  submission?: {
    submitted_at: string | null
    score: number | null
    grade: string | null
    workflow_state: 'submitted' | 'unsubmitted' | 'graded'
  }
}
```

---

## Implementation Notes

1. **Token Security**: Store API token in `.env.local`, never commit to git
2. **Pagination**: For courses/assignments with 100+ items, handle pagination via `Link` header
3. **Error Handling**: Always check for 401 (invalid token), 403 (rate limit), 404 (not found)
4. **Date Formatting**: Canvas returns ISO 8601 dates, use `new Date()` in JavaScript
5. **Null Values**: Many fields can be `null` (especially `due_at`), always check before using
