import { apiSlice } from "../api/apiSlice";
import toast from 'react-hot-toast';

export const toolApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // all default chat endpoint here
        getDefaultMagicORBChat: builder.query({
            query: () => 'tool/default',
            keepUnusedDataFor: 600,
            providesTags: ['DefaultMagicORB'],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error) {
                    toast.error(error.error.data.message);
                }
            }
        }),

        // updating default chat data
        updateMagicORBChat: builder.mutation({
            query: (updateData) => ({
                url: `tool/default`,
                method: 'POST',
                body: updateData,
            }),
            invalidatesTags: (arg) => [
                'DefaultMagicORB',
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

        // updating default others
        updateMagicORBOthersDefault: builder.mutation({
            query: ({ defaultId, updatedData }) => ({
                url: `tool/default/${defaultId}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: (arg) => [
                'DefaultMagicORB',
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
    })
});

export const {
    useGetDefaultMagicORBChatQuery,
    useUpdateMagicORBChatMutation,
    useUpdateMagicORBOthersDefaultMutation
} = toolApi;