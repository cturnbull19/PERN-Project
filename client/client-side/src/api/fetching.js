import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const fetchingApi = createApi({
    reducerPath: "fetchingApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:54321/workoutlibrary/api',
    }),

    endpoints: (build) => ({
        //Defining get exercises endpoint
        getExercises: build.query({
            query: () => '/exercises',
        }),

        getSingleExercise: build.query({
            query: (id) => `/exercises/${id}`
        }),

        //POST create exercise
        createExercise: build.mutation({
            query: (data) => ({
                url: '/exercises',
                method: 'POST',
                headers: {
                    'content-type': 'applicaiton.json',
                    authorization: `Bearer ${data.token}`,
                    body: { ...data }
                }
            })
        }),

        //PUT update exercises
        updateExercise: build.mutation({
            query: (data) => ({
                url: `/exercises/${data.id}`,
                method: 'PUT',
                headers: {
                    'content-type': 'application.json',
                    authorization: `Bearer ${data.token}`,
                body: { available: false }
                }
            })
        }),

        //delete exercise
        deleteExercise: build.mutation({
            query: (data) => ({
                url: `/exercises/${data.id}`,
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${data.token}`,
                },
            }),
        }),
    }),
});

export const { useGetExercisesQuery, useGetSingleExerciseQuery, useCreateExerciseMutation, useUpdateExerciseMutation, useDeleteExerciseMutation } = fetchingApi