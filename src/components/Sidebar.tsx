'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Menu, X } from 'lucide-react';
import { courseModules } from '@/lib/data';
import { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-30 flex items-center px-4 justify-between shadow-sm">
                <span className="font-bold text-blue-900 text-lg">Reading Signs</span>
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out overflow-y-auto",
                    "lg:translate-x-0 lg:static lg:z-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Desktop Header */}
                <div className="p-6 hidden lg:block border-b border-gray-100">
                    <h1 className="text-xl font-bold text-blue-900">Reading Signs</h1>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">VIP Member</p>
                </div>

                {/* Mobile Header Space */}
                <div className="h-14 lg:hidden" />

                <nav className="p-4 space-y-4 pb-20 lg:pb-4">
                    {courseModules.map((module) => (
                        <div key={module.id}>
                            <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                {module.title}
                            </h3>
                            <div className="space-y-1">
                                {module.lessons.map((lesson) => {
                                    const isActive = pathname === `/dashboard/lesson/${lesson.id}`;
                                    return (
                                        <Link
                                            key={lesson.id}
                                            href={`/dashboard/lesson/${lesson.id}`}
                                            onClick={closeSidebar}
                                            className={cn(
                                                "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                                                isActive
                                                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                                                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                            )}
                                        >
                                            <BookOpen
                                                className={cn(
                                                    "mr-3 flex-shrink-0 h-4 w-4",
                                                    isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"
                                                )}
                                            />
                                            <span className="truncate">{lesson.title}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>
            </aside>
        </>
    );
}
