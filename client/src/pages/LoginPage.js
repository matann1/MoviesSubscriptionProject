import axios from 'axios'
import LoginComp from '../components/LoginComp'

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { doLoadUsers } from '../redux/UsersActions'

const usersUrl = 'http://localhost:8000/users';

const LoginPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
      const fetchUsers = async () => {
        const { data: users } = await axios.get(usersUrl);
        dispatch(doLoadUsers(users));
      }
      fetchUsers()
    }, [dispatch])

  return (
    <div>
        <LoginComp/>
    </div>
  )
}

export default LoginPage