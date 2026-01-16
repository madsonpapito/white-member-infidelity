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
        title: "👋 Start Here",
        lessons: [
            {
                id: "welcome",
                title: "Welcome + How to Use the Platform",
                description: "Watch this video to understand how to navigate the platform.",
                duration: "5 min",
            }
        ]
    },
    {
        id: "mod-01",
        title: "Module 1: The Fundamentals",
        lessons: [
            {
                id: "foundations-of-lying",
                title: "The Foundations of Lying & How the Brain Reacts",
                pdfUrl: "/Module-1.pdf",
                description: "Understand the psychology behind deception.",
                duration: "10 min Read"
            }
        ]
    },
    {
        id: "mod-02",
        title: "Module 2: Body Language",
        lessons: [
            {
                id: "reading-body-language",
                title: "Reading Eyes, Hands & Posture – The Body Speaks",
                pdfUrl: "/Module-2.pdf",
                description: "Learn to identify non-verbal signals.",
                duration: "15 min Read"
            }
        ]
    },
    {
        id: "mod-03",
        title: "Module 3: The Digital World",
        lessons: [
            {
                id: "digital-analysis",
                title: "Analyzing Text Messages & Online Behavior",
                pdfUrl: "/Module-3.pdf",
                description: "Interactive checklist for digital analysis.",
                duration: "12 min Read"
            }
        ]
    },
    {
        id: "mod-04",
        title: "Module 4: The TRUTH Method",
        lessons: [
            {
                id: "confrontation-guide",
                title: "How to Confront with Confidence",
                pdfUrl: "/Module-4-The-TRUTH-Method-How-to-Confront-with-Confidence.pdf",
                description: "Step-by-step script for confrontation.",
                duration: "20 min Read"
            }
        ]
    },
    {
        id: "bonus",
        title: "🎁 Exclusive Bonus",
        isBonus: true,
        lessons: [
            {
                id: "rebuilding-trust",
                title: "Guide to Rebuilding Trust & Intimacy",
                pdfUrl: "/Bonus-Module.pdf",
                description: "Complete e-book.",
                duration: "E-book"
            }
        ]
    },
    {
        id: "bonus-digital-audit",
        title: "🎁 Bonus: Digital Audit Kit",
        isBonus: true,
        lessons: [
            {
                id: "digital-audit-kit",
                title: "The Tracking Guide",
                pdfUrl: "/Digital_Audit_Kit_The_Tracking_Guide.pdf",
                description: "Comprehensive guide for digital tracking and auditing.",
                duration: "PDF Guide"
            }
        ]
    },
    {
        id: "bonus-emotional-shielding",
        title: "🎁 Bonus: Emotional Shielding",
        isBonus: true,
        lessons: [
            {
                id: "emotional-shielding-protocol",
                title: "The Self-Control Guide",
                pdfUrl: "/Emotional_Shielding_Protocol__The_Self-Control_Guide.pdf",
                description: "Protocol for emotional self-control and shielding.",
                duration: "PDF Guide"
            }
        ]
    }
];
