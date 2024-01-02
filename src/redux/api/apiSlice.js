// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const token = localStorage.getItem("access-token")
// const user = JSON.parse(localStorage.getItem("user"))
// const id = user?.customer

// export const api = createApi({
//     reducerPath:'api',
//     baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5001/api/v1/"}),
//     endpoints: (builder) =>({
//         getCartTemplates:builder.query({
//             query: (id) => `customers/${id}`,
//         }),
//     })
// })