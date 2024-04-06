import {Metadata} from "next";
import Image from "next/image";
import {useRouter} from "next/router";
import Link from "next/link";
import {Pagination} from "@/app/components/Pagination";
import Search from "@/app/components/Search";
import {DeviceSkeleton} from "@/app/components/Skeletons";
import { Suspense } from 'react';
// import {ArrowRightIcon} from '@heroicons/react/24/outline'



async function getDevices(search:string, currentPage:number){
    let url = `http://127.0.0.1:8000/api/devices/?page=${currentPage}`
    if(search != ''){
        url = url+`&search=${search}`
    }
    const res = await fetch(url,{ next: { revalidate: 60 } })
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}
export default async function Device(
    {searchParams,}:{
        searchParams?:{
            search?: string;
            page?: string;
        }
    }
){
    const search = searchParams?.search || '';
    const currentPage = Number(searchParams?.page) || 1;
    const deviceItems = await getDevices(search, currentPage)
    return (
        <div className="px-6 pt-14 lg:px-8 mt-4">

            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <Link href="/"
                              className="inline-flex items-center text-sm text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-yellow-900">
                            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                            </svg>
                        </Link>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="1" d="m1 9 4-4-4-4"/>
                            </svg>
                            <span
                                className="ms-1 text-sm  text-gray-500 md:ms-2 dark:text-gray-400">Devices</span>
                        </div>
                    </li>
                </ol>
            </nav>


            <div className="text-center p-10 flex flex-col justify-center items-center">
                <h1 className="font-bold text-4xl mb-4">Browse Products</h1>
                <Search placeholder={"Search for Devices..."}/>
            </div>

            <section id="Projects"
                     className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                {deviceItems.results && deviceItems.results.map((device: Device) => (
                    <Suspense key={search+currentPage} fallback={<DeviceSkeleton/>}>
                        <div key={device.id}
                             className="w-72 bg-white dark:bg-gray-800 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                            <Link href={'devices/' + device.slug}>
                                <Image
                                    src={device.image_src}
                                    alt="Product" width={500}
                                    height={500} className="h-80 w-72 object-cover rounded-t-xl"/>
                                <div className="px-4 py-3 w-72">
                                    <span className="text-gray-400 mr-3 uppercase text-xs">{device.graphics_card}</span>
                                    <p className="text-lg font-bold text-black dark:text-gray-400 truncate block capitalize">{device.name}</p>
                                    <div className="flex items-center">
                                        <p className="text-lg font-semibold text-black dark:text-gray-400 cursor-auto my-3">${device.price}</p>
                                        <del>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 cursor-auto ml-2">${device.price}</p>
                                        </del>
                                        <div className="ml-auto">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                 fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd"
                                                      d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
                                                <path
                                                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </Suspense>
                ))}
            </section>

            <div className={'flex flex-row justify-center my-20'}>
                <Pagination links={deviceItems.links} pages={deviceItems.pages}/>
            </div>
        </div>
    )
}