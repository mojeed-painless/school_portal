import { z } from 'zod';

export const ScoreRecordSchema = z.object({
  caScore: z
    .number({ invalid_type_error: 'CA score must be a number' })
    .min(0, 'CA score cannot be negative')
    .max(40, 'CA score cannot exceed 40'),
  examScore: z
    .number({ invalid_type_error: 'Exam score must be a number' })
    .min(0, 'Exam score cannot be negative')
    .max(60, 'Exam score cannot exceed 60'),
});

export const UpdateStudentScoresPayloadSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
  subject: z.string().min(1, 'Subject is required'),
  term: z.enum(['First Term', 'Second Term', 'Third Term']),
  session: z.string().regex(/^\d{4}\/\d{4}$/, 'Session must be in YYYY/YYYY format'),
  scores: ScoreRecordSchema,
});

export const SaveResultsPayloadSchema = z.object({
  classId: z.string().min(1, 'Class ID is required'),
  results: z.array(UpdateStudentScoresPayloadSchema).min(1, 'Results list cannot be empty'),
});
