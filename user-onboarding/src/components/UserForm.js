import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => [...users, status]);
        console.log(status);
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

                    <label htmlFor="tos">Terms of Service
                        <Field 
                            type="checkbox"
                            name="tos"
                            checked={values.tos}
                            value={values.tos}
                        />
                    </label>

                    <button type="submit">Submit</button>
                </Form>
            </div>
            <div className='users'>
                {users.map(user => (
                    <div className="user-card"> 
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                    </div>
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
        name: Yup.string()
        .min(2, "Please enter a name")
        .required("Please enter a name"),
        
        email: Yup.string()
        .email("Please enter a valid email address")
        .required("Please enter an email address"),
        
        password: Yup.string()
        .min(8, "Password must be 8+ characters.")
        .required("Please enter a password"),
        
        tos: Yup.bool()
        .required("You must agree to the terms of service to continue")
    }),

    handleSubmit(values, { setStatus, resetForm }) {
        console.log("Submitting form: ", values);

        axios
            .post("https://reqres.in/api/users", values)
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