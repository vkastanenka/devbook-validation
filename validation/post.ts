// types
import {
  CommentBody,
  PostBody,
  PostCreateCommentFormData,
  PostUpdateCommentFormData,
  PostCreatePostFormData,
  PostUpdatePostFormData,
  PostCreateCommentReqBody,
  PostUpdateCommentReqBody,
  PostCreatePostReqBody,
  PostUpdatePostReqBody,
  PostCreatePostLikeReqBody,
} from '@vkastanenka/devbook-types/dist/post'

// validation
import { z } from 'zod'

/**
 * Inputs
 */

// Comment

export const postCommentBodySchema: z.ZodType<CommentBody> = z
  .string()
  .min(10, { message: '10 character(s) min' })
  .max(1000, {
    message: '1000 character(s) max',
  })

// Post

export const postBodySchema: z.ZodType<PostBody> = z
  .string()
  .min(10, { message: '10 character(s) min' })
  .max(1000, {
    message: '1000 character(s) max',
  })

/**
 * Forms
 */

// Comment

export const postCreateCommentFormSchema: z.ZodType<PostCreateCommentFormData> =
  z
    .object({
      body: postCommentBodySchema,
    })
    .strict()

export const postUpdateCommentFormSchema: z.ZodType<PostUpdateCommentFormData> =
  z
    .object({
      body: postCommentBodySchema.or(z.literal('')),
    })
    .strict()

// Post

export const postCreatePostFormSchema: z.ZodType<PostCreatePostFormData> = z
  .object({
    body: postBodySchema,
  })
  .strict()

export const postUpdatePostFormSchema: z.ZodType<PostUpdatePostFormData> = z
  .object({
    body: postBodySchema.or(z.literal('')),
  })
  .strict()

/**
 * Request Bodies
 */

// Comment

export const postCreateCommentReqBodySchema: z.ZodType<PostCreateCommentReqBody> =
  z
    .object({
      body: postCommentBodySchema,
      parentCommentId: z.string().nullable().optional(),
      postId: z.string(),
      userId: z.string(),
    })
    .strict()

export const postUpdateCommentReqBodySchema: z.ZodType<PostUpdateCommentReqBody> =
  z
    .object({
      body: postCommentBodySchema.optional(),
    })
    .strict()

// Post

export const postCreatePostReqBodySchema: z.ZodType<PostCreatePostReqBody> = z
  .object({
    body: postBodySchema,
    userId: z.string(),
  })
  .strict()

export const postUpdatePostReqBodySchema: z.ZodType<PostUpdatePostReqBody> = z
  .object({
    body: postBodySchema.optional(),
  })
  .strict()

// PostLike

export const postCreatePostLikeReqBodySchema: z.ZodType<PostCreatePostLikeReqBody> =
  z
    .object({
      postId: z.string(),
      userId: z.string(),
    })
    .strict()
