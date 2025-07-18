import * as yup from 'yup';

const userPostJobValidation = yup.object({
    email_address: yup.string().email('Enter a valid email').required('Email is required'),

    title: yup.string().required('Job title is required'),

    location: yup.string().required('Job location is required'),

    number_of_applicants: yup
        .number()
        .typeError('Must be a number')
        .positive('Must be positive')
        .integer('Must be an integer')
        .required('Number of applicants is required'),

    company_name: yup.string().required('Company name is required'),

    phone_number: yup.string().matches(/^\d{10}$/, 'Enter a valid 10-digit phone number'),
    // .required('Phone number is required'),

    job_description: yup.string().min(10, 'Description should be at least 10 characters').required('Job description is required'),

    work_type: yup.string().required('Work type is required'),

    job_category_id: yup.string().required('Category is required'),

    salaryRange: yup
        .array()
        .of(yup.number().required('Each value in salary range is required'))
        .min(2, 'Salary range must have min and max')
        .max(2, 'Salary range must have min and max')
        .required('Salary range is required')

    // uploadcompanylogo: yup
    //     .mixed()
    //     .required('Company logo is required')
    //     .test('fileType', 'Only JPEG or PNG files are allowed', (value) => {
    //         if (!value) return false;
    //         if (typeof value === 'string') return true;
    //         return ['image/jpeg', 'image/png'].includes(value.type);
    //     })
});

export default userPostJobValidation;
