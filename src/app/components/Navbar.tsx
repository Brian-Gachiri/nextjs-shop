'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";

export function Navbar(){
    const pathname = usePathname()

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Devices', href: '/devices' },
    ]
    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 font-extrabold text-lg text-yellow-800">
                        DvHub
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                    </button>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className={`text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400 ${pathname === item.href ? 'text-yellow-900 dark:text-yellow-700 ' : ''}`}>
                            {item.name}
                        </Link>
                    ))}
                    <Link href="#" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </nav>
        </header>
    )
}