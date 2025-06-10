import * as yup from 'yup';

const adminEditJobValidation = yup.object({
    user_id: yup.string().required('User ID is required'),

    email_address: yup.string().email('Enter a valid email').required('Email is required'),

    title: yup.string().required('Job title is required'),

    location: yup.string().required('Job location is required'),

    number_of_applicants: yup
        .number()
        .typeError('Must be a number')
        .positive('Must be positive')
        .required('Number of applicants is required'),

    company_name: yup.string().required('Company name is required'),

    phone_number: yup.string().matches(/^\d{10}$/, 'Enter a valid 10-digit phone number'),
    //     .required('Phone number is required'),

    job_description: yup.string().min(10, 'Description should be at least 10 characters').required('Job description is required'),

    work_type: yup.string().required('Work type is required'),

    job_category_id: yup.string().required('Category is required'),

    salaryRange: yup
        .array()
        .of(yup.number().required('Each value in salary range is required'))
        .min(2, 'Salary range must have min and max')
        .max(2, 'Salary range must have min and max')
        .required('Salary range is required'),
    uploadcompanylogo: yup
        .mixed()
        .required('Company logo is required')
        .test('fileType', 'Only JPEG or PNG files are allowed', (value) => {
            if (!value) return false;
            if (typeof value === 'string') return true;
            const file = Array.isArray(value) ? value[0] : value;
            return file && ['image/jpeg', 'image/png'].includes(file.type);
        })
});

export default adminEditJobValidation;
