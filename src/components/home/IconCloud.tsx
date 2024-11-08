import IconCloud from "../ui/icon-cloud";
import MaxWidthWrapper from "../global/max-width-wrapper";
import AnimationContainer from "../global/animation-container";
import MagicBadge from "../ui/magic-badge";
const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

export function IconCloudDemo() {
  return (

    <div className="w-screen flex flex-col md:flex-row justify-center items-center">
        <div >
          
        <MaxWidthWrapper className="py-10">
                <AnimationContainer delay={0.1}>
                    <div className="flex flex-col items-start justify-start w-full py-8 max-w-xl pl-0 px-0 md:ml-[-2rem] lg:ml-[-4rem] ml-0 mx-0 ">
                        <MagicBadge title="The Process" />
                        <h2 className=" text-3xl md:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-6">
                            Effortless link management in 3 steps
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-xl">
                            Follow these simple steps to optimize, organize, and share your links with ease.
                        </p>
                    </div>
                </AnimationContainer>
               
            </MaxWidthWrapper>

        </div>
 <div className="relative flex  max-w-4xl items-center justify-center overflow-hidden rounded-lg  bg-background pr-10 pb-20 pt-8 ">
      <IconCloud iconSlugs={slugs} />
    </div>
    </div>
   
  );
}
