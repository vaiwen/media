import React from 'react'
import { GoTrash } from 'react-icons/go'
import Button from './Button'
import { deleteUser } from '../store'
import { useThunk } from '../hooks/useThunk'
import ExpandablePanel from './ExpandablePanel'
import AlbumsList from './AlbumsList'

const UsersListItem = ({ user }) => {

    const [doDeleteUser, isLoading, error] = useThunk(deleteUser)

    const handleClick = () => {
        doDeleteUser(user)
    }

    const header =
        <>
            <Button className='mr-2' loading={isLoading} onClick={handleClick}>
                <GoTrash />
            </Button>
            {error && <div>Error deleting user</div>}
            <p className='font-semibold'>{user.name}</p>
        </>

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user} />
        </ExpandablePanel>
    )
}

export default UsersListItem