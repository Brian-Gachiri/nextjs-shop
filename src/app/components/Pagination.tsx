'use client'

import React, {useState} from "react";
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

type Props = {
    links : {
        next: string|null,
        previous:string|null,
        current_page: number
    },
    pages: number
}
export function Pagination({ links, pages }:Props) {
    const [activePage, setActivePage] = useState(1);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || links.current_page;
    const { replace } = useRouter();


    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        setActivePage(Number(pageNumber))
        replace(`${pathname}?${params.toString()}`);
    }

    const handleNext = () => {
        if (activePage < pages) {
            createPageUrl(activePage + 1);
        }
    };

    const handlePrev = () => {
        if (activePage > 1) {
            createPageUrl(activePage - 1);
        }
    };

    return (
            <nav aria-label="Page navigation example">
                <ul className="list-style-none flex">
                    {links.previous ? (
                        <li>
                            <button
                                onClick={() => {
                                    handlePrev()
                                }}
                                className={`relative block rounded bg-gray-100 px-3 py-1.5 text-sm  text-gray-700 transition-all duration-300 hover:bg-yellow-900 dark:bg-transparent dark:border dark:border-yellow-800 dark:text-yellow-800 hover:text-white mx-1`}>
                                Previous
                            </button>
                        </li>
                    ) : (
                        <span className={'text-sm rounded bg-gray-100 px-3 py-1.5 text-gray-700 dark:border dark:border-gray-700 dark:bg-transparent dark:text-gray-700 mx-1'}>Previous</span>
                    )}

                    {Array.from({length: pages}, (_, i) => i + 1).map((page) => (
                        <li key={page}>
                            <button
                                className={`mx-1 relative block rounded px-3 py-1.5 text-sm ${page == links.current_page ? 'bg-yellow-900 text-white': 'bg-transparent text-yellow-800'} hover:text-white transition-all duration-300 hover:bg-yellow-800`}
                                onClick={() => {
                                    createPageUrl(page)
                                }}
                            >{page}</button>
                        </li>
                    ))}
                    <li>
                        {links.next ? (
                            <button
                                className={`relative block rounded bg-gray-100 dark:bg-transparent dark:border dark:border-yellow-800 px-3 py-1.5 text-sm text-gray-700 dark:text-yellow-800 transition-all duration-300 hover:bg-yellow-900 hover:text-white mx-1`}
                                onClick={() => {
                                    handleNext()
                                }}
                            >Next
                            </button>
                        ): (
                            <span className={'text-sm rounded bg-gray-200 dark:border dark:border-gray-700 dark:bg-transparent dark:text-gray-700 px-3 py-1.5 text-gray-700 mx-1'}>Next</span>
                        )}

                    </li>
                </ul>
            </nav>
    );
}