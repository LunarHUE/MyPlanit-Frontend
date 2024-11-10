type SuccessResponse<T> = {
  success: true
  data: T
  message?: never
}

type ErrorResponse = {
  success: false
  message: string
  data: null
}

export type APIResponse<T> = SuccessResponse<T> | ErrorResponse

export type Profile = {
  id: string
  userId: string
  firstName: string
  lastName: string
  canvasUrl: string
  canvasToken: string
}

export type CalendarEvent = {
  assignmentID: number
  courseID: number
  dateCreated: string
  dateModified: string
  description: string
  endDateTime: string
  id: number
  profileId: string
  startDateTime: string
  title: string
}

export type Course = {
  id: number
  sis_course_id?: string
  uuid: string
  integration_id?: string
  sis_import_id: number
  name: string
  course_code: string
  original_name: string
  workflow_state: string
  account_id: number
  root_account_id: number
  enrollment_term_id: number
  grading_periods?: any
  grading_standard_id: number
  grade_passback_setting: string
  created_at: string
  start_at?: string
  end_at?: string
  locale: string
  enrollments?: any
  total_students: number
  calendar?: any
  default_view: string
  syllabus_body: string
  needs_grading_count?: number
  term?: any
  course_progress?: any
  apply_assignment_group_weights: boolean
  permissions: { [key: string]: boolean }
  is_public: boolean
  is_public_to_auth_users: boolean
  public_syllabus: boolean
  public_syllabus_to_auth: boolean
  public_description: string
  storage_quota_mb: number
  storage_quota_used_mb: number
  hide_final_grades: boolean
  license: string
  allow_student_assignment_edits: boolean
  allow_wiki_comments: boolean
  allow_student_forum_attachments: boolean
  open_enrollment: boolean
  self_enrollment: boolean
  restrict_enrollments_to_course_dates: boolean
  course_format: string
  access_restricted_by_date: boolean
  time_zone: string
  blueprint: boolean
  blueprint_restrictions: { [key: string]: boolean }
  blueprint_restrictions_by_object_type: {
    [key: string]: { [key: string]: boolean }
  }
  template: boolean
}

export type Assignment = {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
  due_at?: string
  lock_at?: string
  unlock_at?: string
  has_overrides: boolean
  all_dates: any
  course_id: number
  html_url: string
  submissions_download_url: string
  assignment_group_id: number
  due_date_required: boolean
  allowed_extensions: string[]
  max_name_length: number
  turnitin_enabled: boolean
  vericite_enabled: boolean
  turnitin_settings: any
  grade_group_students_individually: boolean
  external_tool_tag_attributes: any
  peer_reviews: boolean
  automatic_peer_reviews: boolean
  peer_review_count: number
  peer_reviews_assign_at: string
  intra_group_peer_reviews: boolean
  group_category_id: number
  needs_grading_count: number
  position: number
  post_to_sis: boolean
  integration_id: string
  integration_data: { [key: string]: string }
  points_possible: number
  submission_types: string[]
  has_submitted_submissions: boolean
  grading_type: string
  grading_standard_id?: number
  published: boolean
  unpublishable: boolean
  only_visible_to_overrides: boolean
  locked_for_user: boolean
  lock_info?: string
  lock_explanation?: string
  quiz_id?: number
  anonymous_submissions?: boolean
  discussion_topic?: any
  freeze_on_copy: boolean
  frozen: boolean
  frozen_attributes: string[]
  submission: any
  use_rubric_for_grading: boolean
  rubric_settings: { [key: string]: string }
  rubric?: any
  assignment_visibility: number[]
  overrides?: any
  omit_from_final_grade: boolean
  hide_in_gradebook: boolean
  moderated_grading: boolean
  grader_count: number
  final_grader_id: number
  grader_comments_visible_to_graders: boolean
  graders_anonymous_to_graders: boolean
  grader_names_visible_to_final_grader: boolean
  anonymous_grading: boolean
  allowed_attempts: number
  post_manually: boolean
  score_statistics?: any
  can_submit: boolean
  ab_guid: string[]
  annotatable_attachment_id?: number
  anonymize_students: boolean
  require_lockdown_browser: boolean
}
