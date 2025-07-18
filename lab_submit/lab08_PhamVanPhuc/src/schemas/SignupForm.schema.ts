

import * as yup from 'yup';

export const SignupFormSchema = yup.object().shape({
    email: yup.string()
        .required('Email is required')
        .email('Invalid email'),
    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: yup.string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password')], `Password don't match`),
    name: yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters long'),
    phone: yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]{10,11}$/, 'Phone number must be 10-11 digits'),
});