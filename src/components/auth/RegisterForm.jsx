import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, 'Must be at least 3 characters').required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      const result = await dispatch(register(values));
      if (!result.error) {
        navigate('/login');
      }
    },
  });

  return (
    <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Admin Registration
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <Input
          id="name"
          label="Name"
          placeholder="Admin Name"
          {...formik.getFieldProps('name')}
          error={formik.touched.name && formik.errors.name}
        />

        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="admin@example.com"
          {...formik.getFieldProps('email')}
          error={formik.touched.email && formik.errors.email}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          {...formik.getFieldProps('password')}
          error={formik.touched.password && formik.errors.password}
        />

        <div className="flex items-center justify-end">
          <Link to="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Already have an account? Sign in
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full py-3 text-lg shadow-md hover:shadow-lg transform transition-all active:scale-95"
          isLoading={loading}
        >
          Register Admin
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
