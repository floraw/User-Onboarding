import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import User from './User';

const UserForm = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);

    return (
        <div className='wrapper'>
            <div className='form'>
                <Form>
                    <Field 
                        type="text"
                        name="name"
                        placeholder="name"
                        value={values.name}
                    />
                    {touched.name && errors.name && <p>{errors.name}</p>}

                    <Field 
                        type="text"
                        name="email"
                        placeholder="email"
                        value={values.email}
                    />
                    {touched.email && errors.email && <p>{errors.email}</p>}

                    <Field 
                        type="text"
                        name="password"
                        placeholder="password"
                        value={values.password}
                    />
                    {touched.password && errors.password && <p>{errors.password}</p>}

                    <label htmlFor="tos">Terms of Service</label>
                    <Field 
                        type="checkbox"
                        name="tos"
                        value={values.tos}
                    />

                    <button type="submit">Submit</button>
                </Form>
            </div>
            <div className='users'>
                {users.map(user => (
                    <User
                        name={user.name}
                        email={user.email}
                    />
                ))}
            </div>
        </div>
    )
};

const FormikForm = withFormik({
    mapPropsToValues({ name, email, password, tos}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },

    validationScheme: Yup.object().shape({
        name: Yup.string().required("Please enter a name"),
        email: Yup.string().required("Please enter an email address"),
        password: Yup.string().required("Please enter a password"),
        tos: Yup.bool()
    }),

    handleSubmit(values, { setStatus, resetForm}) {
        console.log("Submitting form: ", values);

        axios
            .post("https://reqres.in/api/users")
            .then(response => {
                console.log("Success: ", response);
                setStatus(response.data);
                resetForm();
            })
            .catch(err => {
                console.log("Error: ", err.response)
            })
    }

})(UserForm);

export default FormikForm;