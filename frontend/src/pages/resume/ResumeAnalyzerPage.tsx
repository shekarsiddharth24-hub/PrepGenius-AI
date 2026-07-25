import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import ResumeUpload from "../../components/resume/ResumeUpload";
import ResumeResults from "../../components/resume/ResumeResults";

import { useAnalyzeResume } from "../../hooks/useAnalyzeResume";

import type { ResumeAnalysis } from "../../types/resume";

import GlassPanel from "../../components/ui/GlassPanel";


const ResumeAnalyzerPage = () => {

    const [analysis, setAnalysis] =
        useState<ResumeAnalysis | null>(null);


    const mutation = useAnalyzeResume();




    const handleAnalyze = (
        file: File,
        targetRole: string,
    ) => {

        mutation.mutate(
            {
                file,
                targetRole,
            },

            {
                onSuccess:(data)=>{

                    setAnalysis(data);

                },


                onError:(error: any)=>{
                    console.error("status: ",error.response?.status);
                    console.error("Response: ",error.response?.data);

                    console.error(
                        error,
                    );

                },
            },
        );

    };




    return (

        <motion.div

            initial={{
                opacity:0,
                y:20,
            }}

            animate={{
                opacity:1,
                y:0,
            }}

            transition={{
                duration:0.4,
            }}

            className="
                space-y-8
            "
        >



            {/* Header */}

            <GlassPanel
                className="
                    relative
                    overflow-hidden
                    p-8
                "
            >

                {/* Glow */}

                <div
                    className="
                        absolute
                        -top-20
                        right-0

                        h-64
                        w-64

                        rounded-full

                        bg-cyan-500/10

                        blur-3xl
                    "
                />



                <div
                    className="
                        relative
                        z-10

                        flex

                        flex-col

                        gap-6


                        md:flex-row

                        md:items-center

                        md:justify-between
                    "
                >


                    <div>


                        <div
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <Sparkles
                                size={22}
                                className="
                                    text-cyan-300
                                "
                            />


                            <span
                                className="
                                    text-sm
                                    font-medium
                                    text-cyan-300
                                "
                            >
                                AI Career Intelligence
                            </span>


                        </div>



                        <h1
                            className="
                                mt-3

                                text-4xl

                                font-bold

                                bg-gradient-to-r

                                from-cyan-300

                                via-blue-300

                                to-violet-300


                                bg-clip-text

                                text-transparent
                            "
                        >
                            Resume Analyzer
                        </h1>



                        <p
                            className="
                                mt-3

                                max-w-2xl

                                text-slate-400
                            "
                        >
                            Upload your resume and receive
                            AI-powered insights, skill analysis,
                            and personalized interview preparation
                            recommendations.
                        </p>


                    </div>




                    <motion.div

                        whileHover={{
                            y:-5,
                            rotate:3,
                        }}

                        transition={{
                            duration:0.2,
                        }}

                        className="
                            flex

                            h-20

                            w-20

                            items-center

                            justify-center


                            rounded-3xl


                            bg-cyan-500/10


                            text-cyan-300
                        "
                    >

                        <FileText size={40}/>

                    </motion.div>



                </div>


            </GlassPanel>





            {/* Upload Section */}

            <motion.div

                initial={{
                    opacity:0,
                    y:20,
                }}

                animate={{
                    opacity:1,
                    y:0,
                }}

                transition={{
                    delay:0.1,
                }}

            >

                <ResumeUpload

                    onAnalyze={handleAnalyze}

                    isLoading={
                        mutation.isPending
                    }

                />


            </motion.div>







            {/* Error */}

            {
                mutation.isError && (

                    <motion.div

                        initial={{
                            opacity:0,
                            scale:0.95,
                        }}

                        animate={{
                            opacity:1,
                            scale:1,
                        }}

                        className="
                            rounded-2xl

                            border

                            border-red-400/20

                            bg-red-500/10

                            p-5

                            text-red-300
                        "
                    >

                        Failed to analyze resume.
                        Please try again.

                    </motion.div>

                )
            }







            {/* Results */}

            {
                analysis && (

                    <motion.div

                        initial={{
                            opacity:0,
                            y:30,
                        }}

                        animate={{
                            opacity:1,
                            y:0,
                        }}

                        transition={{
                            duration:0.5,
                        }}

                    >

                        <ResumeResults
                            analysis={analysis}
                        />

                    </motion.div>

                )
            }




        </motion.div>

    );

};


export default ResumeAnalyzerPage;