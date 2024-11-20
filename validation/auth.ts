// types
import {
  AuthLoginFormData,
  AuthRegisterFormData,
  AuthSendResetPasswordTokenFormData,
  AuthResetPasswordFormData,
  AuthUpdatePasswordFormData,
} from '@vkastanenka/devbook-types/dist/auth'

// validation
import { z } from 'zod'
import { emailSchema } from '.'
import { userNameSchema, userUsernameSchema, userPasswordSchema } from './user'

/**
 * Request bodies
 */

export const authLoginReqBodySchema: z.ZodType<AuthLoginFormData> = z
  .object({
    email: emailSchema,
    password: userPasswordSchema,
  })
  .strict()

export const authRegisterReqBodySchema: z.ZodType<AuthRegisterFormData> = z
  .object({
    name: userNameSchema,
    email: emailSchema,
    username: userUsernameSchema,
    password: userPasswordSchema,
  })
  .strict()

export const authSendResetPasswordTokenReqBodySchema: z.ZodType<AuthSendResetPasswordTokenFormData> =
  z
    .object({
      email: emailSchema,
    })
    .strict()

export const authResetPasswordReqBodySchema: z.ZodType<AuthResetPasswordFormData> =
  z
    .object({
      password: userPasswordSchema,
    })
    .strict()

export const authUpdatePasswordReqBodySchema: z.ZodType<AuthUpdatePasswordFormData> =
  z
    .object({
      currentPassword: userPasswordSchema,
      newPassword: userPasswordSchema,
    })
    .strict()
