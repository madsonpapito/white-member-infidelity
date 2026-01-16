import { courseModules } from '@/lib/data';
import { PDFViewer } from '@/components/PDFViewer';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ lessonId: string }>;
}

export default async function LessonPage({ params }: Props) {
    const { lessonId } = await params;

    // Find lesson
    let foundLesson = null;
    let foundModule = null;

    for (const mod of courseModules) {
        const lesson = mod.lessons.find(l => l.id === lessonId);
        if (lesson) {
            foundLesson = lesson;
            foundModule = mod;
            break;
        }
    }

    if (!foundLesson) {
        notFound();
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 lg:py-8 space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="space-y-1">
                <h2 className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest">
                    {foundModule?.title}
                </h2>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                    {foundLesson.title}
                </h1>
                {foundLesson.description && (
                    <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                        {foundLesson.description}
                    </p>
                )}
            </div>

            {/* PDF Viewer Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 sm:p-2 lg:p-4">
                {foundLesson.pdfUrl ? (
                    <PDFViewer url={foundLesson.pdfUrl} />
                ) : (
                    <div className="flex items-center justify-center h-48 sm:h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 text-center text-sm sm:text-base px-4">
                            This content is a video or text (No PDF available).
                        </p>
                    </div>
                )}
            </div>

            {/* Action Button */}
            <div className="flex justify-center sm:justify-end pb-4">
                <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow active:scale-95">
                    Mark as Complete
                </button>
            </div>
        </div>
    );
}
