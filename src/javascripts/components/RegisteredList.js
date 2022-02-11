import React, { createContext, useState } from 'react'
import { Link, Redirect, Route, Switch } from 'react-router-dom'
import RegisterForm from './RegisterForm'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { userList } from '../users'
import {format} from 'date-fns'

export const UserContext = createContext()

export default function RegisteredList(){
    const [users, setUsers] = useState(userList)
    const history = useHistory()

    return (
        <UserContext.Provider value={{users, setUsers}}>
            <nav>
                <ul>
                    <li><Link to='/users'>Users</Link></li>
                    <li><button onClick={()=> history.push('register')}>Register</button></li>
                </ul>
            </nav>
            <main>
                <Switch>
                    <Route path='/users'>
                        {users.map((u, i) => {
                            return (
                                <div key={i}>
                                    <ul>
                                        <li>{u.firstName}</li>
                                        <li>{u.lastName}</li>
                                        <li>{format(u.birthday, "MM/dd/yyyy")}</li>
                                        <li>{u.email}</li>
                                        <li>{u.password}</li>
                                    </ul>
                                </div>
                            )
                        })}
                    </Route>
                    <Route path='/register'><RegisterForm /></Route>
                </Switch>
            </main>
        </UserContext.Provider>
    )
}