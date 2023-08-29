import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  newPassword: Yup.string().required('New Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function Changepass() {
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await axios.post('http://localhost:3500/change-password', values);
      const { success, msg } = response.data;
      if (success) {

        toast.success('Password changed successfully!');
        navigate('/login');
      } else {
        setStatus(msg);
      }
    } catch (error) {
      setStatus('An error occurred while changing the password.');
    }
    setSubmitting(false);
  };
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <div className='frombody'>
            <h4>Change Password !</h4>
            <Form>
              <div>
                <label>Email:</label>
                <Field type="text" name="email" placeholder="Enter Your Email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div>
                <label>Current Password:</label>
                <Field type="text" name="password" placeholder="Enter Current Password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <div>
                <label>New Password:</label>
                <Field type="text" name="newPassword" placeholder="Enter NewPassword" />
                <ErrorMessage name="newPassword" component="div" className="error" />
              </div>
              <div>
                <label>Confirm Password:</label>
                <Field type="text" name="confirmPassword" placeholder="Enter Confirm Password" />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </div>
              {status && <div className="error">{status}</div>}
              <button type="submit" disabled={isSubmitting}>
                Change Password
              </button>
            </Form>
          </div>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
}



















































































































