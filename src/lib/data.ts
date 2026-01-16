export type Lesson = {
    id: string;
    title: string;
    pdfUrl?: string; // Path to PDF in public folder
    description?: string;
    duration?: string;
};

export type Module = {
    id: string;
    title: string;
    lessons: Lesson[];
    isBonus?: boolean;
};

export const courseModules: Module[] = [
    {
        id: "onboarding",
        title: "👋 Comece Por Aqui",
        lessons: [
            {
                id: "aula-0",
                title: "Boas-vindas + Como usar a plataforma",
                description: "Assista este vídeo para entender como navegar na plataforma.",
                duration: "5 min",
                // pdfUrl: "/Module-0.pdf" // If applicable
            }
        ]
    },
    {
        id: "mod-01",
        title: "Módulo 1: Os Fundamentos",
        lessons: [
            {
                id: "fundamentos-mentira",
                title: "Os fundamentos da mentira e como o cérebro reage",
                pdfUrl: "/Module-1.pdf",
                description: "Entenda a psicologia por trás da mentira.",
                duration: "10 min Leitura"
            }
        ]
    },
    {
        id: "mod-02",
        title: "Módulo 2: Linguagem Corporal",
        lessons: [
            {
                id: "leitura-corporal",
                title: "Lendo olhos, mãos e postura – O corpo fala",
                pdfUrl: "/Module-2.pdf",
                description: "Aprenda a identificar sinais não-verbais.",
                duration: "15 min Leitura"
            }
        ]
    },
    {
        id: "mod-03",
        title: "Módulo 3: O Mundo Digital",
        lessons: [
            {
                id: "analise-digital",
                title: "Analisando mensagens de texto e comportamento online",
                pdfUrl: "/Module-3.pdf",
                description: "Checklist interativo para análise digital.",
                duration: "12 min Leitura"
            }
        ]
    },
    {
        id: "mod-04",
        title: "Módulo 4: O Método da Verdade",
        lessons: [
            {
                id: "confronto-seguro",
                title: "Como confrontar com segurança",
                pdfUrl: "/Module-4-The-TRUTH-Method-How-to-Confront-with-Confidence.pdf",
                description: "Script passo a passo para o confronto.",
                duration: "20 min Leitura"
            }
        ]
    },
    {
        id: "bonus",
        title: "🎁 Bônus Exclusivo",
        isBonus: true,
        lessons: [
            {
                id: "reconstruindo-confianca",
                title: "Guia para Reconstruir a Confiança e Intimidade",
                pdfUrl: "/Bonus-Module.pdf",
                description: "E-book completo.",
                duration: "E-book"
            }
        ]
    }
];
