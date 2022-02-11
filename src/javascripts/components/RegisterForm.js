import React, {useContext, useState} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { UserContext } from './RegisteredList'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'
import { validate } from 'webpack/node_modules/schema-utils'
import {format} from 'date-fns'

toast.configure()

export function VHelp({message}){
    return <p className='help'>{message}</p>
}

const validationSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    birthday: yup.date().required(),
    email: yup.string().required(),
    password: yup.string().required()
}) 

export default function RegisterForm(){
    let {users, setUsers} = useContext(UserContext)
    
    let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            birthday: "",
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit(values){
            let id = users.length
            while(true){
                let us = users.find(u => u.id == id++)
                if(us === undefined) break
            }
            values.id = id
            users.push(values)

            setUsers([...users])
            history.push('/users')
            toast("Successfully Registered")
        }
    })

    const history = useHistory()

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register as a User</h1>
            <div className='field'>
                <label htmlFor="firstName">First Name</label>
                <div className='control'>
                    <input type="text" name="firstName" value={values.firstName} onChange={handleChange}/>
                    <VHelp message={errors.firstName} />
                </div>
            </div>
            <div className='field'>
                <label htmlFor="lastName">Last Name</label>
                <div className='control'>
                    <input type="text" name="lastName" value={values.lastName} onChange={handleChange}/>
                    <VHelp message={errors.lastName} />
                </div>
            </div>
            <div className='field'>
                <label htmlFor="birthday">Birthday</label>
                <div className='control'>
                <DatePicker name="birthday" selected={values.birthday} onChange={(date => setFieldValue('birthday', date))}/>
                    <VHelp message={errors.birthday} />
                </div>
            </div>
            <div className='field'>
                <label htmlFor="email">Email Address</label>
                <div className='control'>
                    <input type="text" name="email" value={values.email} onChange={handleChange}/>
                    <VHelp message={errors.email} />
                </div>
            </div>
            <div className='field'>
                <label htmlFor="password">Password</label>
                <div className='control'>
                    <input type="text" name="password" value={values.password}onChange={handleChange}/>
                    <VHelp message={errors.password} />
                </div>
            </div>

            <div className='field'>
                <label></label>
                <div className='control'>
                    <button className='primary'>Submit</button>
                    <button className='primary' onClick={()=> history.push('/users')}>Cancel</button>
                </div>
            </div>
        </form>
    )
}