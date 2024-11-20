// types
import {
  AddressUnitNumber,
  AddressStreetNumber,
  AddressStreetName,
  AddressSuburb,
  AddressState,
  AddressCountry,
  AddressCreateAddressFormData,
  AddressUpdateAddressFormData,
  AddressCreateUserAddressReqBody,
  AddressUpdateAddressReqBody,
} from '@vkastanenka/devbook-types/dist/address'

// validation
import { z } from 'zod'

/**
 * Inputs
 */

export const addressUnitNumberSchema: z.ZodType<AddressUnitNumber> = z
  .string()
  .min(1, { message: '1 characters(s) min' })
  .max(20, {
    message: '20 characters(s) max',
  })
  .nullable()

export const addressStreetNumberSchema: z.ZodType<AddressStreetNumber> = z
  .string()
  .min(1, { message: '1 characters(s) min' })
  .max(20, {
    message: '20 characters(s) max',
  })

export const addressStreetNameSchema: z.ZodType<AddressStreetName> = z
  .string()
  .min(2, { message: '2 characters(s) min' })
  .max(50, {
    message: '50 characters(s) max',
  })

export const addressSuburbSchema: z.ZodType<AddressSuburb> = z
  .string()
  .min(1, { message: '1 characters(s) min' })
  .max(50, {
    message: '50 characters(s) max',
  })

export const addressStateSchema: z.ZodType<AddressState> = z
  .string()
  .min(2, { message: '2 characters(s) min' })
  .max(50, {
    message: '50 characters(s) max',
  })

export const addressCountrySchema: z.ZodType<AddressCountry> = z
  .string()
  .min(1, { message: '1 characters(s) min' })
  .max(50, {
    message: '50 characters(s) max',
  })

/**
 * Forms
 */

export const addressCreateAddressFormSchema: z.ZodType<AddressCreateAddressFormData> =
  z
    .object({
      unitNumber: addressUnitNumberSchema.or(z.literal('')),
      streetNumber: addressStreetNumberSchema,
      streetName: addressStreetNameSchema,
      suburb: addressSuburbSchema,
      state: addressStateSchema,
      country: addressCountrySchema,
    })
    .strict()

export const addressUpdateAddressFormSchema: z.ZodType<AddressUpdateAddressFormData> =
  z
    .object({
      unitNumber: addressUnitNumberSchema.or(z.literal('')),
      streetNumber: addressStreetNumberSchema.or(z.literal('')),
      streetName: addressStreetNameSchema.or(z.literal('')),
      suburb: addressSuburbSchema.or(z.literal('')),
      state: addressStateSchema.or(z.literal('')),
      country: addressCountrySchema.or(z.literal('')),
    })
    .strict()

/**
 * Request Bodies
 */

export const addressCreateAddressReqBodySchema: z.ZodType<AddressCreateUserAddressReqBody> =
  z
    .object({
      unitNumber: addressUnitNumberSchema.optional(),
      streetNumber: addressStreetNumberSchema,
      streetName: addressStreetNameSchema,
      suburb: addressSuburbSchema,
      state: addressStateSchema,
      country: addressCountrySchema,
      userId: z.string(),
    })
    .strict()

export const addressUpdateAddressReqBodySchema: z.ZodType<AddressUpdateAddressReqBody> =
  z
    .object({
      unitNumber: addressUnitNumberSchema.optional(),
      streetNumber: addressStreetNumberSchema.optional(),
      streetName: addressStreetNameSchema.optional(),
      suburb: addressSuburbSchema.optional(),
      state: addressStateSchema.optional(),
      country: addressCountrySchema.optional(),
    })
    .strict()
