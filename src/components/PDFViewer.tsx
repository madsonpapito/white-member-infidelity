'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { cn } from '@/components/Sidebar';

// Configure worker locally
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

interface PDFViewerProps {
    url: string;
}

export function PDFViewer({ url }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <div className="flex flex-col items-center w-full bg-gray-100 p-4 rounded-lg shadow-inner min-h-[600px]">
            {/* Controls Toolbar */}
            <div className="sticky top-0 z-10 flex items-center justify-between w-full max-w-3xl bg-white p-2 rounded-lg shadow mb-4">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                        disabled={pageNumber <= 1}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm font-medium">
                        Page {pageNumber} of {numPages || '--'}
                    </span>
                    <button
                        onClick={() => setPageNumber(prev => Math.min(numPages || Infinity, prev + 1))}
                        disabled={pageNumber >= (numPages || 1)}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <ZoomOut size={20} />
                    </button>
                    <span className="text-sm w-12 text-center">{Math.round(scale * 100)}%</span>
                    <button
                        onClick={() => setScale(s => Math.min(2.0, s + 0.1))}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <ZoomIn size={20} />
                    </button>
                </div>
            </div>

            {/* Document */}
            <div className="w-full max-w-3xl overflow-auto flex justify-center">
                <Document
                    file={url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="shadow-lg"
                    loading={<div className="p-10 text-gray-500">Carregando PDF...</div>}
                    error={<div className="p-10 text-red-500">Erro ao carregar PDF.</div>}
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
