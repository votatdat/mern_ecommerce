import React, {useEffect, useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails} from '../actions/userActions'

const UserEditScreen = ({match, history}) => {
  const userId = match.params.id

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const {loading, error, user} = userDetails

  useEffect(() => {
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId))
    } else {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [dispatch, user, userId])

  const submitHandler = (e) => {
    e.preventDefault()

  }

  return (
    <>
      <Link to={`/admin/userlist`} className='btn btn-light my-3'>Go Back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
