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

        // updating default chat data
        // updateMagicORBChat: builder.mutation({
        //     query: (updateData) => ({
        //         url: `tool/default`,
        //         method: 'POST',
        //         body: updateData,
        //     }),
        //     invalidatesTags: (arg) => [
        //         'DefaultChat',
        //     ],
        //     async onQueryStarted(arg, { queryFulfilled }) {
        //         try {
        //             const result = await queryFulfilled;
        //             toast.success(result.data.message);
        //         } catch (error) {
        //             toast.error(error.error.data.message);
        //         }
        //     }
        // }),

        // // get role endpoint here
        // getRole: builder.query({
        //     query: (roleId) => `role/${roleId}`,
        //     providesTags: (result, error, arg) => [{
        //         type: 'Role', id: arg
        //     }],
        //     async onQueryStarted(arg, { queryFulfilled }) {
        //         try {
        //             await queryFulfilled;
        //         } catch (error: any) {
        //             // toast.error(error?.error?.data?.message);
        //             console.log(error?.error?.data?.message)
        //         }
        //     }
        // }),

        // // create new role endpoint here
        // createRole: builder.mutation({
        //     query: (data) => ({
        //         url: 'role',
        //         method: 'POST',
        //         body: data
        //     }),
        //     invalidatesTags: ["Roles"],
        //     async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //         try {
        //             const result = await queryFulfilled;
        //             toast.success(result.data.message);
        //         } catch (error: any) {
        //             toast.error(error.error.data.message);
        //         }
        //     }
        // }),

        // // updating role data
        // updateRole: builder.mutation({
        //     query: ({ roleId, updateData }) => ({
        //         url: `role/${roleId}`,
        //         method: 'PATCH',
        //         body: updateData,
        //     }),
        //     invalidatesTags: (result, error, arg) => [
        //         'Roles',
        //         { type: 'Role', id: arg.roleId }
        //     ],
        //     async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //         try {
        //             const result = await queryFulfilled;
        //             toast.success(result.data.message);
        //         } catch (error: any) {
        //             toast.error(error.error.data.message);
        //         }
        //     }
        // }),

        // deleteRole: builder.mutation({
        //     query: (roleId) => ({
        //         url: `role/${roleId}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['Roles'],
        //     async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //         try {
        //             const result = await queryFulfilled;
        //             toast.success(result.data.message);
        //         } catch (error: any) {
        //             toast.error(error.error.data.message);
        //         }
        //     }
        // }),

    })
});

export const {
    useGetUsersQuery,
} = userApi;