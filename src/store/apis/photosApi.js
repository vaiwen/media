import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}

const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        // fetchFn: async (...args) => {
        //     await pause(1000)
        //     return fetch(...args)
        // }
    }),
    endpoints(builder) {
        return {
            fetchPhotos: builder.query({
                providesTags: (result, error, album) => {
                    return [{ type: 'Photo', id: album.id }]
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        params: {
                            albumId: album.id
                        },
                        method: 'GET' // default method == GET by the way
                    }
                }
            }),
            addPhoto: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ type: 'Photo', id: album.id }]
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        body: {
                            albumId: album.id,
                            url: faker.image.abstract(150, 150, true)
                        },
                        method: 'POST'
                    }
                }
            }),
            removePhoto: builder.mutation({
                invalidatesTags: (result, error, photo) => {
                    return [{ type: 'Photo', id: photo.albumId }]
                },
                query: (photo) => {
                    return {
                        url: `/photos/${photo.id}`,
                        method: 'DELETE'
                    }
                }
            })
        }
    }
})

export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi
export { photosApi }