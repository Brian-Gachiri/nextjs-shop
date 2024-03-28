import {Metadata} from "next";
import Link from "next/link";

type Props = {
    params: {slug:string}
}

async function fetchDevice(slug: string) {
    const res = await fetch(`http://127.0.0.1:8000/api/devices/${slug}`)
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json()
}

export async function generateMetadata({params}:Props):Promise<Metadata>{
    const device: Device = await fetchDevice(params.slug)
    return {
        title: `DvHub: ${device.name} | ${device.cpu}`,
        description: `Buy a ${device.name}, ${device.cpu} for an affordable price only at DvHub`,
        keywords: `${device.name}, ${device.cpu}, ${device.graphics_card}`
    }
}
export default async function DeviceDetails({params}: Props){

    const device: Device = await fetchDevice(params.slug)

    return (

        <div className="pt-14 w-screen mt-4">

            <nav className="flex px-8" aria-label="Breadcrumb">
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
                    <li>
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="1" d="m1 9 4-4-4-4"/>
                            </svg>
                            <Link href="/devices"
                                  className="ms-1 text-sm text-gray-700 hover:text-yellow-800 md:ms-2 dark:text-gray-400 dark:hover:text-yellow-900">Devices</Link>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="1" d="m1 9 4-4-4-4"/>
                            </svg>
                            <span
                                className="ms-1 text-sm  text-gray-500 md:ms-2 dark:text-gray-400">{device.name}</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className={'text-center'}>
                <h1 className="text-4xl font-extrabold">{device.name}</h1>
                <span
                    className="font-bold">Availability: </span>
                <span className="">In Stock</span>
            </div>
            <div className="flex-row justify-center">
                <div className=" py-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row -mx-4">
                            <div className="md:flex-1 px-4">
                                <div className="h-[460px] mb-4">
                                    <img className="w-full h-full object-cover rounded-2xl"
                                         src={device.image_src}
                                         alt={device.name + " Image"}/>
                                </div>
                            </div>
                            <div className="md:flex-1 px-4">
                                <p className="text-5xl font-bold mb-4 text-yellow-900">
                                    <span>
                                        ${device.price}
                                        <span
                                            className="text-sm text-gray-600  ml-2 line-through">${device.price}</span>

                                    </span>
                                </p>

                                <div className={'mt-9'}>
                                    <span
                                        className="font-bold text-2xl">Product Specifications:</span>
                                    <div className="text-sm mt-2 bg-gray-100 p-3 rounded">
                                        <span className="font-bold">Graphics Card:</span> {device.graphics_card}
                                    </div>
                                    <div className="text-sm mt-2 bg-gray-100 p-3 rounded">
                                        <span className="font-bold">Power System:</span> {device.power_system}
                                    </div>
                                    <div className="text-sm mt-2 bg-gray-100 p-3 rounded">
                                        <span className="font-bold">USB Ports:</span> {device.usb_ports}
                                    </div>
                                    <div className="text-sm mt-2 bg-gray-100 p-3 rounded">
                                        <span className="font-bold">CPU:</span> {device.cpu}
                                    </div>
                                    <div className="text-sm mt-2 bg-gray-100 p-3 rounded">
                                        <span className="font-bold">Weight:</span> {device.weight}
                                    </div>
                                    <div className="text-sm mt-2 bg-gray-100 p-3 rounded">
                                        <span className="font-bold">Ram:</span> {device.ram}
                                    </div>
                                </div>
                                <div className="flex -mx-2 mb-4 mt-4">
                                    <div className="w-1/2 px-2">
                                        <button
                                            className="w-full bg-transparent border-yellow border text-yellow-700 py-2 px-4 rounded font-bold hover:text-white hover:bg-yellow-900 dark:hover:bg-yellow-900">Add
                                            to Cart
                                        </button>
                                    </div>
                                    <div className="w-1/2 px-2">
                                        <button
                                            className="w-full  bg-yellow-800 dark:bg-yellow-700 text-white dark:text-white py-2 px-4 rounded font-bold hover:bg-yellow-900 dark:hover:bg-yellow-900">Add
                                            to Wishlist
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}