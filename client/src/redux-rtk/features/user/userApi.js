import { apiSlice } from "../api/apiSlice";
import toast from 'react-hot-toast';

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // all all users endpoint here
        getUsers: builder.query({
            query: () => 'user',
            keepUnusedDataFor: 600,
            providesTags: ['Users'],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error) {
                    toast.error(error.error.data.message);
                }
            }
        }),

        // get single user endpoint here
        getUser: builder.query({
            query: (userId) => `user/${userId}`,
            providesTags: (result, error, arg) => [{
                type: 'User', id: arg
            }],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error?.error?.data?.message)
                }
            }
        }),

        // updating user data
        updateUser: builder.mutation({
            query: ({ userId, updatedData }) => ({
                url: `user/${userId}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: (result, error, arg) => [
                'Users',
                { type: 'User', id: arg.roleId }
            ],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    toast.success(result.data.message);
                } catch (error) {
                    toast.error(error.error.data.message);
                }
            }
        }),

        // delete user api endpoint
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `user/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    toast.success(result.data.message);
                } catch (error) {
                    toast.error(error.error.data.message);
                }
            }
        }),

    })
});

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;