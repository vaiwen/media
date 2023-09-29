import React from 'react'
import Button from './Button'
import ExpandablePanel from './ExpandablePanel'
import { GoTrash } from 'react-icons/go'
import { useRemoveAlbumMutation } from '../store'
import PhotosList from './PhotosList'

const AlbumsListItems = ({ album }) => {

    const [removeAlbum, results] = useRemoveAlbumMutation()

    const handleRemoveAlbum = () => {
        removeAlbum(album)
    }

    const header =
        <>
            <Button loading={results.isLoading} onClick={handleRemoveAlbum} className='mr-4'>
                <GoTrash />
            </Button>
            {album.title}
        </>
    return (
        <ExpandablePanel key={album.id} header={header}>
            <PhotosList album={album} />
        </ExpandablePanel>
    )
}

export default AlbumsListItems