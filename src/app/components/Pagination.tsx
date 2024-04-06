'use client'

import React, {useState} from "react";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/outline";

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

    const handleNext = () => {
        if (activePage < pages) {
            setActivePage(activePage + 1);
        }
    };

    const handlePrev = () => {
        if (activePage > 1) {
            setActivePage(activePage - 1);
        }
    };

    return (
            <nav aria-label="Page navigation example">
                <ul className="list-style-none flex">
                    {links.previous ? (
                        <li>
                            <a
                                className={`relative block rounded bg-gray-100 px-3 py-1.5 text-sm  text-gray-700 transition-all duration-300 hover:bg-yellow-900 dark:bg-transparent dark:border dark:border-yellow-800 dark:text-yellow-800 hover:text-white mx-1`}>
                                Previous
                            </a>
                        </li>
                    ) : (
                        <span className={'text-sm rounded bg-gray-100 px-3 py-1.5 text-gray-700 dark:border dark:border-gray-700 dark:bg-transparent dark:text-gray-700 mx-1'}>Previous</span>
                    )}

                    {Array.from({length: pages}, (_, i) => i + 1).map((page) => (
                        <li key={page}>
                            <a
                                className={`mx-1 relative block rounded px-3 py-1.5 text-sm ${page == links.current_page ? 'bg-yellow-900 text-white': 'bg-transparent text-yellow-800'} hover:text-white transition-all duration-300 hover:bg-yellow-800`}
                                href="#!">{page}</a>
                        </li>
                    ))}
                    <li>
                        {links.next ? (
                            <a
                                className={`relative block rounded bg-gray-100 dark:bg-transparent dark:border dark:border-yellow-800 px-3 py-1.5 text-sm text-gray-700 dark:text-yellow-800 transition-all duration-300 hover:bg-yellow-900 hover:text-white mx-1`}
                                href="#!">Next
                            </a>
                        ): (
                            <span className={'text-sm rounded bg-gray-200 dark:border dark:border-gray-700 dark:bg-transparent dark:text-gray-700 px-3 py-1.5 text-gray-700 mx-1'}>Next</span>
                        )}

                    </li>
                </ul>
            </nav>
    );
}