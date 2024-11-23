import {
  UserName,
  UserUsername,
  UserPassword,
  UserPhone,
  UserPronouns,
  UserImage,
  UserHeadline,
  UserBio,
  UserWebsite,
  UserGithubRepos,
  UserSkills,
  UserEducationSchool,
  UserEducationDegree,
  UserExperienceCompany,
  UserExperienceType,
  UserExperienceSchedule,
  UserExperienceTitle,
  UserExperienceDescription,
  UserUpdateBioFormData,
  UserUpdateDetailsFormData,
  UserUpdateGithubReposFormData,
  UserUpdateSkillsFormData,
  UserEducationFormItem,
  UserCreateUpdateEducationsFormData,
  UserExperienceFormItem,
  UserCreateUpdateExperiencesFormData,
  UserUpdateUserReqBody,
  UserCreateEducationReqBody,
  UserUpdateEducationReqBody,
  UserCreateExperienceReqBody,
  UserUpdateExperienceReqBody,
} from '@vkastanenka/devbook-types/dist/user'

// validation
import { z } from 'zod'
import {
  emailSchema,
  phoneSchema,
  urlSchema,
  startYearSchema,
  endYearSchema,
} from '.'

/**
 * Inputs
 */

// User

export const userNameSchema: z.ZodType<UserName> = z
  .string()
  .min(3, { message: '3 character(s) min' })
  .max(100, { message: '100 character(s) max' })
  .refine((s) => {
    const names = s.split(' ')
    if (names.length === 2) return true
  }, 'First and last names are required.')

export const userUsernameSchema: z.ZodType<UserUsername> = z
  .string()
  .min(4, { message: '4 character(s) min' })
  .max(15, { message: '15 character(s) max' })
  .refine((s) => {
    const spaces = s.split(' ')
    if (spaces.length === 1) return true
  }, 'No spaces allowed.')

export const userPasswordSchema: z.ZodType<UserPassword> = z
  .string()
  .min(8, { message: '8 character(s) min' })
  .max(100, { message: '100 character(s) max' })

const userPhoneSchema: z.ZodType<UserPhone> = phoneSchema.nullable()

const userPronounsSchema: z.ZodType<UserPronouns> = z.string().nullable()

const userImageSchema: z.ZodType<UserImage> = urlSchema.nullable()

const userHeadlineSchema: z.ZodType<UserHeadline> = z
  .string()
  .min(2, { message: '2 character(s) min' })
  .max(50, {
    message: '50 character(s) max',
  })
  .nullable()

const userBioSchema: z.ZodType<UserBio> = z
  .string()
  .min(10, { message: '10 character(s) min' })
  .max(5000, {
    message: '5000 character(s) max',
  })
  .nullable()

const userWebsiteSchema: z.ZodType<UserWebsite> = urlSchema.nullable()

const userGithubReposSchema: z.ZodType<UserGithubRepos> = z.array(urlSchema)

const userSkillSchema: z.ZodType<string> = z
  .string()
  .min(1, { message: '1 character(s) min' })
  .max(30, {
    message: '30 character(s) max',
  })

const userSkillsSchema: z.ZodType<UserSkills> = z.array(userSkillSchema)

// UserEducation

const userEducationSchoolSchema: z.ZodType<UserEducationSchool> = z
  .string()
  .min(1, { message: '1 character(s) min' })
  .max(100, {
    message: '100 character(s) max',
  })

const userEducationDegreeSchema: z.ZodType<UserEducationDegree> = z
  .string()
  .min(1, { message: '1 character(s) min' })
  .max(100, {
    message: '100 character(s) max',
  })

// UserExperience

const userExperienceCompanySchema: z.ZodType<UserExperienceCompany> = z
  .string()
  .min(1, { message: '1 character(s) min' })
  .max(100, {
    message: '100 character(s) max',
  })

const userExperienceTypeSchema: z.ZodType<UserExperienceType> = z.union([
  z.literal('Contract'),
  z.literal('Permanent'),
])

const userExperienceScheduleSchema: z.ZodType<UserExperienceSchedule> = z.union(
  [z.literal('Full-time'), z.literal('Part-time')]
)

const userExperienceTitleSchema: z.ZodType<UserExperienceTitle> = z
  .string()
  .min(1, { message: '1 character(s) min' })
  .max(100, {
    message: '100 character(s) max',
  })

const userExperienceDescriptionSchema: z.ZodType<UserExperienceDescription> = z
  .string()
  .min(10, { message: '10 character(s) min' })
  .max(5000, {
    message: '5000 character(s) max',
  })

/**
 * Forms
 */

// User

export const userUpdateBioFormSchema: z.ZodType<UserUpdateBioFormData> = z
  .object({
    bio: userBioSchema.or(z.literal('')),
  })
  .strict()

export const userUpdateDetailsFormSchema: z.ZodType<UserUpdateDetailsFormData> =
  z
    .object({
      name: userNameSchema.or(z.literal('')),
      email: emailSchema.or(z.literal('')),
      pronouns: userPronounsSchema.nullable().or(z.literal('')),
      headline: userHeadlineSchema.nullable().or(z.literal('')),
      phone: userPhoneSchema.nullable().or(z.literal('')),
      website: userWebsiteSchema.nullable().or(z.literal('')),
    })
    .strict()

export const userUpdateGithubReposFormSchema: z.ZodType<UserUpdateGithubReposFormData> =
  z
    .object({
      githubRepos: userGithubReposSchema,
    })
    .strict()

export const userUpdateSkillsFormSchema: z.ZodType<UserUpdateSkillsFormData> = z
  .object({
    skills: userSkillsSchema,
  })
  .strict()

// UserEducation

export const userEducationFormItemSchema: z.ZodType<UserEducationFormItem> = z
  .object({
    school: userEducationSchoolSchema,
    degree: userEducationDegreeSchema,
    startYear: startYearSchema,
    endYear: endYearSchema.or(z.literal('')),
  })
  .strict()
  .refine((s) => {
    if (s.endYear) {
      if (Number(s.startYear) > Number(s.endYear)) return false
    }
    return true
  }, 'Start year cannot be greater than end year')

export const userCreateUpdateEducationsFormSchema: z.ZodType<UserCreateUpdateEducationsFormData> =
  z.object({
    create: z.array(userEducationFormItemSchema),
    update: z
      .array(
        z.object({ recordId: z.string(), reqBody: userEducationFormItemSchema })
      )
      .optional(),
  })

// UserEducation

export const userExperienceFormItemSchema: z.ZodType<UserExperienceFormItem> = z
  .object({
    company: userExperienceCompanySchema,
    type: userExperienceTypeSchema,
    schedule: userExperienceScheduleSchema,
    title: userExperienceTitleSchema,
    description: userExperienceDescriptionSchema,
    startYear: startYearSchema,
    endYear: endYearSchema.or(z.literal('')),
  })
  .strict()
  .refine((s) => {
    if (s.endYear) {
      if (Number(s.startYear) > Number(s.endYear)) return false
    }
    return true
  }, 'Start year cannot be greater than end year')

export const userCreateUpdateExperiencesFormSchema: z.ZodType<UserCreateUpdateExperiencesFormData> =
  z.object({
    create: z.array(userExperienceFormItemSchema),
    update: z
      .array(
        z.object({
          recordId: z.string(),
          reqBody: userExperienceFormItemSchema,
        })
      )
      .optional(),
  })

/**
 * Request Bodies
 */

export const userUpdateUserReqBodySchema: z.ZodType<UserUpdateUserReqBody> = z
  .object({
    name: userNameSchema.optional(),
    email: emailSchema.optional(),
    pronouns: userPronounsSchema.optional(),
    image: userImageSchema.optional(),
    headline: userHeadlineSchema.optional(),
    phone: userPhoneSchema.optional(),
    website: userWebsiteSchema.optional(),
    bio: userBioSchema.optional(),
    githubRepos: userGithubReposSchema.optional(),
    skills: userSkillsSchema.optional(),
  })
  .strict()

export const userCreateEducationReqBodySchema: z.ZodType<UserCreateEducationReqBody> =
  z
    .object({
      school: userEducationSchoolSchema,
      degree: userEducationDegreeSchema,
      startYear: startYearSchema,
      endYear: endYearSchema.nullable(),
      userId: z.string(),
    })
    .strict()
    .refine((s) => {
      if (s.endYear) {
        if (Number(s.startYear) > Number(s.endYear)) return false
      }
      return true
    }, 'Start year cannot be greater than end year')

export const userUpdateEducationReqBodySchema: z.ZodType<UserUpdateEducationReqBody> =
  z
    .object({
      school: userEducationSchoolSchema.optional(),
      degree: userEducationDegreeSchema.optional(),
      startYear: startYearSchema.optional(),
      endYear: endYearSchema.nullable().optional(),
    })
    .strict()
    .refine((s) => {
      if (s.endYear) {
        if (Number(s.startYear) > Number(s.endYear)) return false
      }
      return true
    }, 'Start year cannot be greater than end year')

export const userCreateExperienceReqBodySchema: z.ZodType<UserCreateExperienceReqBody> =
  z
    .object({
      company: userExperienceCompanySchema,
      type: userExperienceTypeSchema,
      schedule: userExperienceScheduleSchema,
      title: userExperienceTitleSchema,
      description: userExperienceDescriptionSchema,
      startYear: startYearSchema,
      endYear: endYearSchema.nullable(),
      userId: z.string(),
    })
    .strict()
    .refine((s) => {
      if (s.endYear) {
        if (Number(s.startYear) > Number(s.endYear)) return false
      }
      return true
    }, 'Start year cannot be greater than end year')

export const userUpdateExperienceReqBodySchema: z.ZodType<UserUpdateExperienceReqBody> =
  z
    .object({
      company: userExperienceCompanySchema.optional(),
      type: userExperienceTypeSchema.optional(),
      schedule: userExperienceScheduleSchema.optional(),
      title: userExperienceTitleSchema.optional(),
      description: userExperienceDescriptionSchema.optional(),
      startYear: startYearSchema.optional(),
      endYear: endYearSchema.nullable().optional(),
    })
    .strict()
    .refine((s) => {
      if (s.endYear) {
        if (Number(s.startYear) > Number(s.endYear)) return false
      }
      return true
    }, 'Start year cannot be greater than end year')
