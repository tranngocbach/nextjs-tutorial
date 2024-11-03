'use client'

import AppTable from "@/components/app.table";
import useSWR from "swr";


const Blogs = () => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        "http://localhost:8000/blogs",
        fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
    );

    console.log(">>>check data", data)

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div className="mt-3">
            <AppTable
                blogs={data?.sort((a: any, b: any) => b.id - a.id) ??[]}
            />
        </div>
    );
}

export default Blogs;