'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '@/components/Sidebar';

// Configure worker - use CDN matching react-pdf's pdfjs-dist version
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
    url: string;
}

export function PDFViewer({ url }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [containerWidth, setContainerWidth] = useState(0);

    // Responsive scale based on container width
    useEffect(() => {
        const updateWidth = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setScale(0.5); // Mobile
            } else if (width < 1024) {
                setScale(0.75); // Tablet
            } else {
                setScale(1.0); // Desktop
            }
            setContainerWidth(width);
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <div className="flex flex-col items-center w-full bg-gray-100 p-2 sm:p-4 rounded-lg shadow-inner min-h-[400px] sm:min-h-[600px]">
            {/* Controls Toolbar */}
            <div className="sticky top-0 z-10 flex flex-col sm:flex-row items-center justify-between w-full max-w-3xl bg-white p-2 rounded-lg shadow mb-4 gap-2">
                {/* Page Navigation */}
                <div className="flex items-center space-x-1 sm:space-x-2">
                    <button
                        onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                        disabled={pageNumber <= 1}
                        className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 transition-colors"
                        aria-label="Previous page"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-xs sm:text-sm font-medium whitespace-nowrap px-2">
                        Page {pageNumber} of {numPages || '--'}
                    </span>
                    <button
                        onClick={() => setPageNumber(prev => Math.min(numPages || Infinity, prev + 1))}
                        disabled={pageNumber >= (numPages || 1)}
                        className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 transition-colors"
                        aria-label="Next page"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center space-x-1 sm:space-x-2">
                    <button
                        onClick={() => setScale(s => Math.max(0.3, s - 0.1))}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Zoom out"
                    >
                        <ZoomOut size={18} />
                    </button>
                    <span className="text-xs sm:text-sm w-12 text-center font-medium">
                        {Math.round(scale * 100)}%
                    </span>
                    <button
                        onClick={() => setScale(s => Math.min(2.0, s + 0.1))}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Zoom in"
                    >
                        <ZoomIn size={18} />
                    </button>
                </div>
            </div>

            {/* Document */}
            <div className="w-full overflow-x-auto flex justify-center touch-pan-x">
                <Document
                    file={url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="shadow-lg"
                    loading={
                        <div className="flex items-center justify-center p-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="ml-3 text-gray-500">Loading PDF...</span>
                        </div>
                    }
                    error={
                        <div className="p-10 text-center">
                            <p className="text-red-500 font-medium">Error loading PDF.</p>
                            <p className="text-gray-400 text-sm mt-2">Please try refreshing the page.</p>
                        </div>
                    }
                >
                    <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="bg-white"
                    />
                </Document>
            </div>
        </div>
    );
}
