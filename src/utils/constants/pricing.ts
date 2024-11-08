export const PLANS = [
    {
        name: "Free",
        info: "Perfect for individual learners",
        price: {
            monthly: 0,
            yearly: 0,
        },
        features: [
            { text: "Access learning roadmaps" },
            { text: "Personalized AI suggestions", tooltip: "Up to 100 suggestions/month" },
            { text: "Basic project guidance" },
            { text: "Limited resource selection", limit: "Access to docs only" },
            { text: "Track progress", tooltip: "Track progress in current roadmap" },
            { text: "Community support", tooltip: "Access forums and peer help" },
        ],
        btn: {
            text: "Start learning for free",
            href: "/auth/sign-up?plan=free",
            variant: "default",
        }
    },
    {
        name: "Pro",
        info: "For dedicated learners and small teams",
        price: {
            monthly: 12,
            yearly: Math.round(12 * 12 * (1 - 0.12)),
        },
        features: [
            { text: "Access all learning roadmaps" },
            { text: "Enhanced AI suggestions", tooltip: "Up to 500 suggestions/month" },
            { text: "Intermediate project guidance" },
            { text: "Flexible resource selection", tooltip: "Access docs and video tutorials" },
            { text: "Progress tracking & reports", tooltip: "Get detailed progress reports" },
            { text: "Priority support", tooltip: "24/7 chat and email support" },
            { text: "Access to peer groups", tooltip: "Join study and discussion groups" },
        ],
        btn: {
            text: "Unlock Pro features",
            href: "/auth/sign-up?plan=pro",
            variant: "purple",
        }
    },
    {
        name: "Business",
        info: "For large teams and organizations",
        price: {
            monthly: 49,
            yearly: Math.round(49 * 12 * (1 - 0.12)),
        },
        features: [
            { text: "Access all learning roadmaps" },
            { text: "Unlimited AI suggestions" },
            { text: "Advanced project guidance" },
            { text: "Flexible resource selection", tooltip: "Access docs, video tutorials, and custom content" },
            { text: "Comprehensive progress tracking & reports" },
            { text: "Dedicated account manager", tooltip: "One-on-one guidance from a learning advisor" },
            { text: "Customizable team goals", tooltip: "Set and monitor learning goals for teams" },
            { text: "Team collaboration tools", tooltip: "Coordinate with teammates on projects" },
        ],
        btn: {
            text: "Contact for Business",
            href: "/auth/sign-up?plan=business",
            variant: "default",
        }
    }
];

export const PRICING_FEATURES = [
    {
        text: "Personalized AI suggestions",
        tooltip: "Receive AI-driven roadmap suggestions based on your preferences",
    },
    {
        text: "Progress tracking",
        tooltip: "Track your progress in real-time for each roadmap",
    },
    {
        text: "Access to various resources",
        tooltip: "Choose from documents, video tutorials, or projects based on your preference",
    },
    {
        text: "Community support",
        tooltip: "Access community forums and peer help",
    },
    {
        text: "Priority support",
        tooltip: "Get priority support from our team",
    },
    {
        text: "Advanced project guidance",
        tooltip: "Receive guidance on intermediate and advanced projects",
    },
];

export const WORKSPACE_LIMIT = 2;
