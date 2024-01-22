import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const fetchingApi = createApi({
    reducerPath: "fetchingApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
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

        //register user
        register: build.mutation({
            query: (data) => ({
                url: '/users/register',
                method: 'POST',
                body: { ...data }
            })
        }),

        //login user
        login: build.mutation({
            query: (data) => ({
                url: '/users/login',
                method: 'POST', 
                body: { ...data }
            })
        })

    }),
});

export const { useGetExercisesQuery, useGetSingleExerciseQuery, useCreateExerciseMutation, useUpdateExerciseMutation, useDeleteExerciseMutation, useRegisterMutation, useLoginMutation } = fetchingApi