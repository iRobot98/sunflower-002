import { z } from "zod";

const date_regex_general =
    /(\d{4})-(0[1-9]|1[12])-(0[1-9]|1[0-9]|2[0-9]|3[01])/;
const date_regex_year = /(19[456789][0-9]|20[01][0-9])-(\d{2})-(\d{2})/;
const date_regex_month = /(\d{4})-(0[0-9]|1[012])-(\d{2})/;
const date_regex_day = /(\d{4})-(\d{2})-(0[123456789]|[12][0-9]|3[01])/;
const date_regex_february =
    /(\d{4})-(0[0-9^2]|1[012])-(\d{2})|(\d{4})-(02)-(0[123456789]|[12][0-9])/;

const name_regex = /^[A-Za-z']+$/i;

const phonenumber_general = /([0-9]{10})|(\+([0-9]{3})([0-9]{9}))/;
const kenyan_phone_number = /((07|01)[0-9]{8})|(\+254[0-9]{8})/;
const FormSchema = z
    .object({
        firstName: z
            .string()

            .min(3, "Name is required")
            .max(20, "Name is too long")
            .regex(name_regex, "Please write your real name"),
        middleName: z
            .string()
            .min(3, "Name is required")
            .max(20, "Name is too long")
            .regex(name_regex, "Please write your real name"),
        lastName: z
            .string()
            .min(3, "Name is required")
            .max(20, "Name is too long")
            .regex(name_regex, "Please write your real name"),
        DateOfBirth: z
            .string()
            .regex(date_regex_general, "Date of Birth must be a valid date")
            .regex(date_regex_year, "Please enter a year between 1940 and 2019")
            .regex(date_regex_month, "Please give a valid month")
            .regex(date_regex_day, "Please give a valid day")
            .regex(
                date_regex_february,
                "February only has a maximum of 29 days on leap years"
            ),
        email: z.string().email(),
        phoneNumber: z
            .string()
            .min(10, "Number is too short")
            .max(13, "Number is too long")
            .regex(phonenumber_general, "please enter a valid phone number")
            .regex(
                kenyan_phone_number,
                "Only kenyan phone numbers are accepted"
            ),
        userName: z
            .string()
            .min(4, "UserName is required")
            .max(16, "UserName is too long")
            .regex(/[a-zA-Z0-9]+/, "Only letters and numbers are allowed")
            .regex(/[a-zA-Z][a-zA-Z0-9]+/, "Name should start with a letter"),
        password: z
            .string()
            .min(4, "Password is too short")
            .max(20, "Password is too long")
            .regex(
                /(?=.*?[A-Z])/,
                "Password must contain at least 1 capital letter"
            )
            .regex(
                /(?=.*?[a-z])/,
                "Password must contain at least 1 small letter"
            )
            .regex(/(?=.*?[0-9])/, "Password must contain at least 1 number"),
        confirmPassword: z.string(),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                path: ["confirmPassword"],
                code: "custom",
                message: "The passwords did not match",
            });
        }
    });

export default FormSchema;
