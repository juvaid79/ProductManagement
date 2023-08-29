import '../App.css';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Singup() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post('http://localhost:3500/singup', {
        email: values.email,
        username: values.username,
        password: values.password
      });

      if (res.data.success) {
        toast.success(res.data.msg);
        navigate('/login');
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      toast.error('Error while submitting the form.');
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is Required'),
    username: Yup.string().required('Username is Required'),
    password: Yup.string().required('Password is Required')
  });

  return (
    <div>
      <div className='frombody'>
        <h4>Signup</h4>
        <Formik
          initialValues={{
            email: '',
            username: '',
            password: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className='text'>
                <label htmlFor='email'> Email : </label>
                <Field type='text' name='email' id='email' placeholder='Enter your email'  />
                <ErrorMessage name='email' component='div' className='error-message' />
              </div>
              <div>
                <label htmlFor='username'>Username : </label>
                <Field type='text' name='username' id='username' placeholder='Enter your name'  />
                <ErrorMessage name='username' component='div' className='error-message' />
              </div>
              <div>
                <label htmlFor='password'>Password : </label>
                <Field type='text' name='password' id='password' placeholder='Enter your password' />
                <ErrorMessage name='password' component='div' className='error-message' />
              </div>
              <button type='submit' disabled={isSubmitting}>
                Signup
              </button>
              <div className='already-reg'>
                Have You Already Registered <a href='login'>Login!</a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Singup;














































































// import '../App.css';
// import React, { useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Singup() {
//   const[email,setEmail]=useState("")
//   const[username,setUsername]=useState("")
//   const[password,setPassword]=useState("")
//   const navigate = useNavigate();

//   const Singup = async (e) => {
//     e.preventDefault();
//     const res = await axios.post('http://localhost:3500/singup',{
//       email: email,
//       username: username,
//       password: password
//     });
//     if(res.data.success)  {
//       toast.success(res.data.msg)
//       navigate("/login")
//     }
//     else {
//       toast.error(res.data.msg)
//     }
//   } 
 
//   return (
//     <div>
//       <div className='frombody'>
//       <h4>Singup</h4>
//       <form action onSubmit={Singup}>
//         <div className='text'>
//           <label htmlFor="email"> Email : </label>
//           <input type="text" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email' required/>
//         </div>
//         <div>
//           <label htmlFor="username">Username : </label>
//           <input type="text" name="username" id="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter your name' required/>
//         </div>
//         <div>
//           <label htmlFor="password">Password : </label>
//           <input type="text" name="password" id="password"  value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password' required />
//         </div>
//         <button type="submit">Singup</button>
//         <div className='already-reg'>
//         Have You Already Registerd <a href='login'>Login!</a>
//         </div>
//       </form>
//     </div>
//     </div>
//   )
// }

// export default Singup;