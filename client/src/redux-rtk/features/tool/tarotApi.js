import { apiSlice } from "../api/apiSlice";
import toast from 'react-hot-toast';

export const tarotApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // register endpoint here
        createTarot: builder.mutation({
            query: (data) => ({
                url: 'tool/tarot',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Tarots"],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    toast.success(result.data.message);
                } catch (error) {
                    console.log(error);
                    toast.error(error.error.data.message);
                }
            }
        }),

    })
});

export const {
    useCreateTarotMutation
} = tarotApi;