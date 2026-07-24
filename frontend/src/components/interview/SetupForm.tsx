import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Brain, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import {
  interviewSetupSchema,
  type InterviewSetupForm,
} from "../../utils/interviewValidation";

import { generateQuestion } from "../../api/interview";

import GlassPanel from "../ui/GlassPanel";

const topics = [
  "DBMS",
  "Operating Systems",
  "Computer Networks",
  "OOP",
  "DSA",
  "Java",
  "Python",
  "SQL",
  "Machine Learning",
];

const difficulties = [
  "Easy",
  "Medium",
  "Hard",
];


export default function SetupForm() {
  const navigate = useNavigate();


  const [interviewType, setInterviewType] =
    useState<"technical" | "behavioral">(
      "technical"
    );


  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<InterviewSetupForm>({
    resolver: zodResolver(interviewSetupSchema),
    shouldUnregister:true,
  });



  const onSubmit = async (
    data: InterviewSetupForm
  ) => {

    try {

      const question = await generateQuestion({
        interview_type: interviewType,

        topic:
          interviewType === "technical"
            ? data.topic
            : undefined,

        difficulty:data.difficulty,
      });


      navigate("/interview/session",{
        state:{
          ...question,
          interview_type:interviewType,
        },
      });


    } catch(error){

      console.error(error);

      alert(
        "Failed to generate question."
      );

    }
  };



  return (

    <GlassPanel
      className="
        relative
        overflow-hidden
        p-8
      "
    >


      {/* AI Glow */}

      <div
        className="
          absolute
          -top-24
          -right-24
          h-64
          w-64
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />


      <form
        onSubmit={
          handleSubmit(onSubmit)
        }
        className="
          relative
          z-10
          space-y-7
        "
      >


        {/* Header */}

        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          <motion.div

            whileHover={{
              y:-3,
              scale:1.05,
            }}

            className="
              flex
              h-14
              w-14
              items-center
              justify-center

              rounded-2xl

              bg-cyan-500/10

              text-cyan-300
            "
          >

            <Brain size={30}/>

          </motion.div>


          <div>

            <h1
              className="
                text-3xl
                font-bold

                bg-gradient-to-r
                from-cyan-300
                via-blue-300
                to-violet-300

                bg-clip-text
                text-transparent
              "
            >
              Start New Interview
            </h1>


            <p
              className="
                mt-1
                text-slate-400
              "
            >
              Generate an AI-powered interview challenge.
            </p>

          </div>

        </div>




        {/* Interview Type */}

        <div>

          <label
            className="
              mb-3
              block
              text-sm
              font-medium
              text-slate-300
            "
          >
            Interview Type
          </label>



          <select

            value={interviewType}

            onChange={(e)=>
              setInterviewType(
                e.target.value as
                "technical" |
                "behavioral"
              )
            }

            className="
              w-full

              rounded-xl

              border
              border-white/10

              bg-white/5

              p-4

              text-white

              outline-none

              transition

              focus:border-cyan-400/40
            "
          >

            <option
              value="technical"
              className="bg-slate-900"
            >
              Technical Interview
            </option>


            <option
              value="behavioral"
              className="bg-slate-900"
            >
              Behavioral (HR)
            </option>

          </select>


        </div>




        {/* Topic */}

        {
          interviewType === "technical" && (

            <div>

              <label
                className="
                  mb-3
                  block
                  text-sm
                  font-medium
                  text-slate-300
                "
              >
                Topic
              </label>


              <select

                {...register("topic")}

                defaultValue=""

                className="
                  w-full

                  rounded-xl

                  border
                  border-white/10

                  bg-white/5

                  p-4

                  text-white

                  outline-none

                  focus:border-cyan-400/40
                "
              >

                <option
                  value=""
                  className="bg-slate-900"
                >
                  Select Topic
                </option>


                {
                  topics.map(topic=>(
                    <option
                      key={topic}
                      value={topic}
                      className="bg-slate-900"
                    >
                      {topic}
                    </option>
                  ))
                }

              </select>



              {
                errors.topic && (

                  <p className="
                    mt-2
                    text-sm
                    text-red-400
                  ">
                    {errors.topic.message}
                  </p>

                )
              }


            </div>

          )
        }





        {/* Difficulty */}

        <div>

          <label
            className="
              mb-3
              block
              text-sm
              font-medium
              text-slate-300
            "
          >
            Difficulty
          </label>


          <select

            {...register("difficulty")}

            defaultValue=""

            className="
              w-full

              rounded-xl

              border
              border-white/10

              bg-white/5

              p-4

              text-white

              outline-none

              focus:border-cyan-400/40
            "
          >

            <option
              value=""
              className="bg-slate-900"
            >
              Select Difficulty
            </option>


            {
              difficulties.map(level=>(
                <option
                  key={level}
                  value={level}
                  className="bg-slate-900"
                >
                  {level}
                </option>
              ))
            }


          </select>



          {
            errors.difficulty && (

              <p className="
                mt-2
                text-sm
                text-red-400
              ">
                {errors.difficulty.message}
              </p>

            )
          }


        </div>




        {/* Submit Button */}

        <motion.button

          whileHover={{
            y:-2,
            scale:1.02,
          }}

          whileTap={{
            scale:0.97,
          }}

          type="submit"

          disabled={isSubmitting}

          className="
            flex

            w-full

            items-center

            justify-center

            gap-2


            rounded-xl

            bg-gradient-to-r

            from-cyan-500

            to-blue-600


            py-4


            font-semibold

            text-white


            shadow-lg

            shadow-cyan-500/20


            transition


            disabled:cursor-not-allowed

            disabled:opacity-50
          "
        >

          {
            isSubmitting ? (

              <>
                <motion.div
                  animate={{
                    rotate:360,
                  }}
                  transition={{
                    repeat:Infinity,
                    duration:1,
                  }}
                  className="
                    h-5
                    w-5
                    rounded-full
                    border-2
                    border-white
                    border-t-transparent
                  "
                />

                Generating...
              </>

            ) : (

              <>
                <Sparkles size={18}/>

                {
                  interviewType === "technical"
                  ?
                  "Generate Technical Question"
                  :
                  "Generate Behavioral Question"
                }

              </>

            )
          }


        </motion.button>


      </form>


    </GlassPanel>

  );
}