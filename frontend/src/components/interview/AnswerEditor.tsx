import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Bot, Send } from "lucide-react";
import { motion } from "framer-motion";

import { evaluateAnswer } from "../../api/interview";
import type { EvaluationRequest } from "../../types/interview";

import GlassPanel from "../ui/GlassPanel";
import LanguageSelector from "./LanguageSelector";
import { CODE_TEMPLATES } from "./CodeTemplates";
import {
  clearDraft,
  draftKey,
  loadDraft,
  saveDraft,
} from "../../utils/draft";

// Monaco is large; load it only when a coding question is shown.
const MonacoCodeEditor = lazy(
  () => import("./MonacoCodeEditor")
);

const DRAFT_DEBOUNCE_MS = 500;

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

  /* ---------------------------
      Monaco State
  ---------------------------- */

  const [language, setLanguage] =
    useState("python");

  const [answer, setAnswer] =
    useState(CODE_TEMPLATES.python);

  const [draftSaved, setDraftSaved] =
    useState(false);

  /* ---------------------------
      Detect Coding Question
  ---------------------------- */

  const topic = interview.topic?.toLowerCase();

  // SQL is judged by the LLM like code (two correct queries can look
  // very different), so it uses the code editor and the "code" path.
  const isSqlInterview =
    interview.interview_type ===
      "technical" && topic === "sql";

  const isCodingInterview =
    interview.interview_type ===
      "technical" &&
    (topic === "dsa" || topic === "sql");

  /* ---------------------------
      Reset on New Question
  ---------------------------- */

  const storageKey = useMemo(
    () => draftKey(interview.question),
    [interview.question]
  );

  const saveTimer = useRef<
    ReturnType<typeof setTimeout> | undefined
  >(undefined);

  // Restore a saved draft (if any), otherwise start fresh.
  useEffect(() => {
    const draft = loadDraft(storageKey);

    if (isCodingInterview) {
      const lang = isSqlInterview
        ? "sql"
        : draft?.language &&
            draft.language !== "sql" &&
            CODE_TEMPLATES[draft.language] !==
              undefined
          ? draft.language
          : "python";

      setLanguage(lang);
      setAnswer(
        draft?.answer ??
          CODE_TEMPLATES[lang] ??
          ""
      );
    } else {
      setAnswer(draft?.answer ?? "");
    }

    setDraftSaved(false);

    return () => clearTimeout(saveTimer.current);
  }, [
    storageKey,
    isCodingInterview,
    isSqlInterview,
  ]);

  // Debounced save, triggered only by user edits (not by restores).
  const persistDraft = useCallback(
    (nextAnswer: string, nextLanguage?: string) => {
      clearTimeout(saveTimer.current);

      saveTimer.current = setTimeout(() => {
        saveDraft(storageKey, {
          answer: nextAnswer,
          language: nextLanguage,
        });

        setDraftSaved(true);
      }, DRAFT_DEBOUNCE_MS);
    },
    [storageKey]
  );

  /* ---------------------------
      Language Change
  ---------------------------- */

  const handleLanguageChange = (
    lang: string
  ) => {
    const template =
      CODE_TEMPLATES[lang] ?? "";

    setLanguage(lang);
    setAnswer(template);
    persistDraft(template, lang);
  };

  const handleCodeChange = (
    value: string
  ) => {
    setAnswer(value);
    persistDraft(value, language);
  };

  /* ---------------------------
      Validation
  ---------------------------- */

  const minimumCharacters = 100;

  // For code, the starter template alone is not an answer.
  const canSubmit =
    isCodingInterview
      ? answer.trim().length > 0 &&
        answer.trim() !==
          (CODE_TEMPLATES[language] ?? "").trim()
      : answer.trim().length >=
        minimumCharacters;

  /* ---------------------------
      Counters
  ---------------------------- */

  const lineCount = answer.length
    ? answer.split("\n").length
    : 0;

  const wordCount = answer.trim()
    ? answer.trim().split(/\s+/).length
    : 0;

  /* ---------------------------
      Mutation
  ---------------------------- */

  const mutation = useMutation({
    mutationFn: (
      request: EvaluationRequest
    ) => evaluateAnswer(request),

    onSuccess: (result) => {
      clearTimeout(saveTimer.current);
      clearDraft(storageKey);

      navigate("/interview/result", {
        state: {
          result,
          interviewType:
            interview.interview_type,
          answerType: isCodingInterview
            ? "code"
            : "text",
        },
      });
    },

    onError: (error) => {
      console.error(
        "Evaluation failed:",
        error
      );

      alert(
        "Failed to evaluate your answer. Please try again."
      );
    },
  });

  /* ---------------------------
      Textarea Auto Resize
  ---------------------------- */

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAnswer(e.target.value);
    persistDraft(e.target.value);

    e.target.style.height = "auto";

    e.target.style.height =
      `${e.target.scrollHeight}px`;
  };

  /* ---------------------------
      Submit
  ---------------------------- */

  const handleSubmit = () => {
    mutation.mutate({
      interview_type:
        interview.interview_type,

      topic: interview.topic,

      difficulty:
        interview.difficulty,

      question: interview.question,

      candidate_answer: answer,

      answer_type: isCodingInterview
        ? "code"
        : "text",

      language: isCodingInterview
        ? language
        : undefined,
    });
  };

  return (
    <GlassPanel className="group relative overflow-hidden p-8">

      {/* Glow */}

      <div
        className="
          absolute
          -top-20
          -right-20
          h-52
          w-52
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      <div className="relative z-10">

        {/* Header */}

        <div className="mb-6 flex items-center gap-4">

          <motion.div
            whileHover={{
              y: -3,
              scale: 1.05,
            }}
            transition={{
              duration: 0.2,
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
            <Bot size={26} />
          </motion.div>

          <div>

            <h2
              className="
                text-2xl
                font-bold
                text-white
              "
            >
              Your Answer
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-400
              "
            >
              {isSqlInterview
                ? "Write your SQL query below. It is judged on correctness, not on how closely it matches a reference query."
                : isCodingInterview
                ? "Write your solution below. Choose your preferred programming language."
                : "Explain your approach clearly. AI will evaluate your response."}
            </p>

          </div>

        </div>

        {/* ===========================
                Editor
        ============================ */}

        {isCodingInterview ? (
          <div className="space-y-4">

            {!isSqlInterview && (
            <LanguageSelector
              language={language}
              onChange={
                handleLanguageChange
              }
            />
            )}

            <Suspense
              fallback={
                <div
                  className="
                    flex
                    h-[500px]
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    text-slate-400
                  "
                >
                  Loading editor...
                </div>
              }
            >
              <MonacoCodeEditor
                language={language}
                value={answer}
                onChange={handleCodeChange}
              />
            </Suspense>

          </div>
        ) : (
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
        )}

        {/* Footer */}

        <div
          className="
            mt-5
            flex
            flex-col
            gap-4
            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          {/* Status */}

          {isCodingInterview ? (
            <div
              className="
                rounded-full
                border
                border-cyan-400/20
                bg-cyan-500/10
                px-4
                py-2
                text-sm
                font-medium
                text-cyan-300
              "
            >
              Language: {language}
              {" · "}
              {lineCount} {lineCount === 1 ? "line" : "lines"}
              {" · "}
              {answer.length} characters
              {draftSaved && " · Draft saved"}
            </div>
          ) : (
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
                    ? "border-green-400/20 bg-green-500/10 text-green-300"
                    : "border-red-400/20 bg-red-500/10 text-red-300"
                }
              `}
            >
              {wordCount} words
              {" · "}
              {answer.length} /{" "}
              {minimumCharacters}
              {" "}minimum characters
              {draftSaved && " · Draft saved"}
            </div>
          )}

          {/* Submit */}

          <motion.button
            whileHover={{
              y: -2,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
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
                    rotate: 360,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
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
                <Send size={18} />
                Submit Answer
              </>
            )}
          </motion.button>

        </div>

      </div>

    </GlassPanel>
  );
}