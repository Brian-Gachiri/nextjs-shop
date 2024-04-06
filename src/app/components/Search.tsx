'use client'

import {MagnifyingGlassIcon} from '@heroicons/react/24/outline'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search(
    {placeholder}: {placeholder:string}
){
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term:string) => {
        const params = new URLSearchParams(searchParams)
        if(term){
            params.set('search', term)
        }else{
            params.delete('search')
        }

        replace(`${pathname}?${params.toString()}`)
    }, 800)


    return (
        <div className="flex flex-row w-3/5">
            <label className="w-full mx-2 relative">
                <span className="sr-only">Search</span>
                <input
                    className="block w-full rounded-md dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-800 border-0 py-2.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                    placeholder={placeholder} type="text" name="search"
                    onChange={(e) => {
                        handleSearch(e.target.value)
                    }}
                    defaultValue={searchParams.get('search')?.toString()}
                />
            </label>

            <button
                className="rounded-md bg-yellow-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-900"
            >
                <MagnifyingGlassIcon className="h-[18px] w-[18px] text-white peer-focus:text-gray-900" />
            </button>
        </div>
    )
}