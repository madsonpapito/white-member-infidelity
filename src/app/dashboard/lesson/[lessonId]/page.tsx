import { courseModules } from '@/lib/data';
import { PDFViewer } from '@/components/PDFViewer';
import { notFound } from 'next/navigation';

interface Props {
    params: { lessonId: string };
}

export default async function LessonPage({ params }: Props) {
    // Find lesson
    let foundLesson = null;
    let foundModule = null;

    for (const mod of courseModules) {
        const lesson = mod.lessons.find(l => l.id === params.lessonId);
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
        <div className="max-w-4xl mx-auto p-4 lg:p-8 space-y-6">
            <div>
                <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-1">
                    {foundModule?.title}
                </h2>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {foundLesson.title}
                </h1>
                {foundLesson.description && (
                    <p className="mt-2 text-gray-600 leading-relaxed">
                        {foundLesson.description}
                    </p>
                )}
            </div>

            {/* PDF Viewer Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 lg:p-4">
                {foundLesson.pdfUrl ? (
                    <PDFViewer url={foundLesson.pdfUrl} />
                ) : (
                    <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        <p className="text-gray-500">This content is a video or text (No PDF available).</p>
                    </div>
                )}
            </div>

            <div className="flex justify-end">
                <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow">
                    Mark as Complete
                </button>
            </div>
        </div>
    );
}
