import { AnimationContainer, MaxWidthWrapper } from "@/components";
import Link from "next/link";

const TermsPage = () => {
    return (
        <MaxWidthWrapper className="max-w-3xl mx-auto px-8 mb-40">
            <AnimationContainer delay={0.1} className="w-full">
                <h1 className="text-4xl md:text-6xl font-heading font-bold my-12 text-center w-full">
                    Terms and Conditions
                </h1>
                <p className="text-sm mb-2 italic mt-20">
                    Last updated: 17th June 2024
                </p>
                <p className="mt-4">
                    Welcome to WiseMe! These terms and conditions outline the rules and regulations for the use of WiseMe&apos;s website, services, and platform.
                </p>

                <h2 className="text-xl font-medium mt-8">
                    Acceptance of Terms
                </h2>

                <p className="mt-8 text-muted-foreground">
                    By accessing and using WiseMe, you agree to comply with and be bound by these terms and conditions. If you do not agree with these terms, you may not use our platform or services.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Changes to Terms
                </h2>
                <p className="mt-8 text-muted-foreground">
                    WiseMe reserves the right to modify these terms at any time. Any changes will be reflected by updating the "Last updated" date at the top of this page. Continued use of our platform after any changes indicates your acceptance of the revised terms.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Use of Services
                </h2>

                <h3 className="text-lg mt-8">
                    Eligibility
                </h3>
                <p className="mt-8">
                    To use WiseMe, you must be at least 18 years old and capable of entering into a legally binding agreement.
                </p>

                <h3 className="text-lg mt-8">
                    Account Registration
                </h3>
                <div className="mt-8">
                    <ul className="list-disc ml-8 text-muted-foreground">
                        <li>You must provide accurate and complete information during the registration process.</li>
                        <li>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</li>
                        <li>You agree to notify us immediately of any unauthorized use of your account.</li>
                    </ul>
                </div>

                <h3 className="text-lg mt-8">
                    Acceptable Use
                </h3>
                <div className="mt-8">
                    You agree not to use WiseMe for any unlawful or prohibited activities, including, but not limited to:
                    <ul className="list-disc text-muted-foreground ml-8">
                        <li>Uploading or sharing harmful, illegal, or offensive content.</li>
                        <li>Using the platform to distribute spam or malicious content.</li>
                        <li>Attempting unauthorized access to other users' accounts or WiseMe’s systems.</li>
                    </ul>
                </div>

                <h2 className="text-xl font-medium mt-12">
                    Personalization and AI Features
                </h2>

                <h3 className="text-lg mt-8">
                    AI-Driven Roadmap
                </h3>
                <p className="mt-8 text-muted-foreground">
                    WiseMe offers an AI-driven roadmap that personalizes your learning and development journey. By using this feature, you agree to provide necessary information and allow the platform to suggest tasks, learning paths, and scheduling options based on your progress.
                </p>

                <h3 className="text-lg mt-8">
                    Task Optimization and Lag Detection
                </h3>
                <p className="mt-8 text-muted-foreground">
                    Our platform uses AI to monitor your progress and optimize your tasks. If any lag is detected in your learning process, WiseMe will suggest improvements or adjustments to your roadmap to enhance productivity.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Community and Collaboration
                </h2>

                <h3 className="text-lg mt-8">
                    Developer Connections
                </h3>
                <p className="mt-8 text-muted-foreground">
                    WiseMe encourages collaboration by connecting developers learning at the same time. You may interact with fellow learners and share insights or seek guidance on your learning journey.
                </p>

                <h3 className="text-lg mt-8">
                    Community Guidelines
                </h3>
                <p className="mt-8 text-muted-foreground">
                    You agree to interact respectfully within the community. Any harmful or disruptive behavior that violates the integrity of our platform will not be tolerated.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    User Content and Intellectual Property
                </h2>

                <h3 className="text-lg mt-8">
                    Ownership of Content
                </h3>
                <p className="mt-8 text-muted-foreground">
                    You retain ownership of any content you upload to WiseMe, including learning materials or feedback. By uploading content, you grant WiseMe a non-exclusive, royalty-free license to use it for providing services and improving the platform.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Privacy and Data Usage
                </h2>

                <p className="mt-8 text-muted-foreground">
                    Your privacy is important to us. Please review our <Link href="/privacy" className="underline">Privacy Policy</Link> for detailed information on how we collect, use, and protect your personal data.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Termination and Suspension
                </h2>
                <p className="mt-8 text-muted-foreground">
                    WiseMe reserves the right to suspend or terminate your account at any time, with or without notice, for violating these terms or for any other reason deemed necessary.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Disclaimers and Limitations of Liability
                </h2>

                <h3 className="text-lg mt-8">
                    No Warranty
                </h3>
                <p className="mt-8 text-muted-foreground">
                    WiseMe is provided "as is" without warranties of any kind. We do not guarantee that the platform will be uninterrupted, error-free, or free from viruses.
                </p>

                <h3 className="text-lg mt-8">
                    Limitation of Liability
                </h3>
                <p className="mt-8 text-muted-foreground">
                    In no event will WiseMe be liable for any indirect, incidental, or consequential damages arising out of your use of the platform.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Governing Law
                </h2>
                <p className="mt-8 text-muted-foreground">
                    These terms will be governed by the laws of India, and any disputes shall be resolved under Indian jurisdiction.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Contact Us
                </h2>
                <p className="mt-8 text-muted-foreground">
                    If you have any questions or concerns regarding these Terms and Conditions, please contact us at support@WiseMe.io.
                </p>

                <p className="mt-8 font-medium">
                    By using WiseMe, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.
                </p>
            </AnimationContainer>
        </MaxWidthWrapper>
    );
};

export default TermsPage;
