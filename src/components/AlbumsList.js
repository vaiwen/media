import React from 'react'
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store'
import Skeleton from './Skeleton'
import ExpandablePanel from './ExpandablePanel'
import Button from './Button'
import AlbumsListItems from './AlbumsListItems'

const AlbumsList = ({ user }) => {
    const { data, error, isLoading } = useFetchAlbumsQuery(user)
    const [addAlbum, results] = useAddAlbumMutation()

    const handleAddAlbum = () => {
        addAlbum(user)
    }

    // const results = useFetchAlbumsQuery(user)
    // console.log(results)

    let content
    if (isLoading) {
        content = <Skeleton className="h-10 w-full" times={3} />
    }
    else if (error) {
        content = <div>Error loadings albums.</div>
    }
    else {
        content = data.map((album) => {
            return <AlbumsListItems key={album.id} album={album} />
        })
    }

    return (
        <div>
            <div className='flex justify-between items-center mb-2'>
                <div>Albums for {user.name}</div>
                <Button loading={results.isLoading} onClick={handleAddAlbum}>+ Add Album</Button>
            </div>
            <div>{content}</div>
        </div>
    )
}

export default AlbumsList