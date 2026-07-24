import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Bot, Send } from "lucide-react";
import { motion } from "framer-motion";

import { evaluateAnswer } from "../../api/interview";
import type { EvaluationRequest } from "../../types/interview";

import GlassPanel from "../ui/GlassPanel";

interface Props {
  interview: {
    interview_type: "technical" | "behavioral";
    topic?: string;
    difficulty: string;
    question: string;
  };
}

export default function AnswerEditor({
  interview,
}: Props) {
  const navigate = useNavigate();

  const [answer, setAnswer] = useState("");

  const minimumCharacters = 100;

  const canSubmit =
    answer.trim().length >= minimumCharacters;

  const mutation = useMutation({
    mutationFn: (request: EvaluationRequest) =>
      evaluateAnswer(request),

    onSuccess: (result) => {
      navigate("/interview/result", {
        state: {
          result,
          interviewType: interview.interview_type,
        },
      });
    },

    onError: (error) => {
      console.error("Evaluation failed:", error);
      alert(
        "Failed to evaluate your answer. Please try again."
      );
    },
  });


  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAnswer(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height =
      `${e.target.scrollHeight}px`;
  };


  const handleSubmit = () => {
    mutation.mutate({
      interview_type: interview.interview_type,
      topic: interview.topic,
      difficulty: interview.difficulty,
      question: interview.question,
      candidate_answer: answer,
    });
  };


  return (
    <GlassPanel className="group relative overflow-hidden p-8">

      {/* Ambient Glow */}
      <div className="
        absolute
        -top-20
        -right-20
        h-52
        w-52
        rounded-full
        bg-cyan-500/10
        blur-3xl
      "/>


      <div className="relative z-10">


        {/* Header */}

        <div className="mb-6 flex items-center gap-4">

          <motion.div
            whileHover={{
              y:-3,
              scale:1.05,
            }}
            transition={{
              duration:0.2,
            }}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl

              bg-cyan-500/10

              text-cyan-300
            "
          >
            <Bot size={26}/>
          </motion.div>


          <div>

            <h2 className="
              text-2xl
              font-bold
              text-white
            ">
              Your Answer
            </h2>


            <p className="
              mt-1
              text-sm
              text-slate-400
            ">
              Explain your approach clearly. AI will evaluate your response.
            </p>

          </div>

        </div>



        {/* Answer Box */}

        <textarea
          rows={8}
          value={answer}
          onChange={handleChange}
          placeholder="Type your answer here..."
          className="
            w-full

            resize-none

            overflow-hidden

            rounded-2xl

            border
            border-white/10

            bg-white/5

            p-5

            text-white

            placeholder:text-slate-500

            outline-none

            transition-all

            duration-300

            focus:border-cyan-400/40

            focus:bg-white/10

            focus:ring-4

            focus:ring-cyan-400/10
          "
        />



        {/* Footer */}

        <div className="
          mt-5

          flex

          flex-col

          gap-4

          md:flex-row

          md:items-center

          md:justify-between
        ">


          {/* Character Count */}

          <div
            className={`
              rounded-full
              border
              px-4
              py-2

              text-sm
              font-medium

              ${
                canSubmit
                ? 
                "border-green-400/20 bg-green-500/10 text-green-300"
                :
                "border-red-400/20 bg-red-500/10 text-red-300"
              }
            `}
          >
            {answer.length}
            {" "}
            /
            {" "}
            {minimumCharacters}
            {" "}
            minimum characters
          </div>




          {/* Submit */}

          <motion.button
            whileHover={{
              y:-2,
              scale:1.02,
            }}
            whileTap={{
              scale:0.97,
            }}
            type="button"
            onClick={handleSubmit}
            disabled={
              !canSubmit ||
              mutation.isPending
            }
            className="
              flex

              items-center

              justify-center

              gap-2

              rounded-xl

              bg-gradient-to-r

              from-cyan-500

              to-blue-600

              px-7

              py-3

              font-semibold

              text-white

              shadow-lg

              shadow-cyan-500/20

              transition-all

              disabled:cursor-not-allowed

              disabled:opacity-40
            "
          >

            {mutation.isPending ? (
              <>
                <motion.div
                  animate={{
                    rotate:360,
                  }}
                  transition={{
                    repeat:Infinity,
                    duration:1,
                    ease:"linear",
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

                Evaluating...
              </>
            ) : (
              <>
                <Send size={18}/>
                Submit Answer
              </>
            )}

          </motion.button>


        </div>


      </div>


    </GlassPanel>
  );
}