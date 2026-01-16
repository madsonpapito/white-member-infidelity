'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, CheckCircle, Lock, Menu, X } from 'lucide-react';
import { courseModules } from '@/lib/data';
import { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false); // Mobile state

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Trigger */}
            <div className="lg:hidden fixed top-0 left-0 w-full h-16 bg-white border-b z-20 flex items-center px-4 justify-between">
                <span className="font-bold text-blue-900">Reading Signs</span>
                <button onClick={toggleSidebar} className="p-2">
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-10 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:overflow-y-auto",
                    isOpen ? "translate-x-0 pt-16" : "-translate-x-full lg:pt-0"
                )}
            >
                <div className="p-6 hidden lg:block">
                    <h1 className="text-xl font-bold text-blue-900">Reading Signs</h1>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">VIP Member</p>
                </div>

                <nav className="p-4 space-y-6">
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
                                            className={cn(
                                                "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                                                isActive
                                                    ? "bg-blue-50 text-blue-700"
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
                                            {/* CheckCircle for completed would go here */}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
