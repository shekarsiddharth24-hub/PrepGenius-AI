import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  X,
  Sparkles,
} from "lucide-react";

import GlassPanel from "../ui/GlassPanel";


interface ResumeUploadProps {
  onAnalyze: (
    file: File,
    targetRole: string,
  ) => void;

  isLoading: boolean;
}


const MAX_SIZE = 10 * 1024 * 1024;


const TARGET_ROLES = [
  {
    value: "software_engineer",
    label: "Software Engineer",
  },
  {
    value: "aiml_engineer",
    label: "AI / ML Engineer",
  },
  {
    value: "data_scientist",
    label: "Data Scientist",
  },
  {
    value: "data_engineer",
    label: "Data Engineer",
  },
];



const ResumeUpload = ({
  onAnalyze,
  isLoading,
}: ResumeUploadProps) => {


  const inputRef =
    useRef<HTMLInputElement>(null);



  const [
    selectedFile,
    setSelectedFile,
  ] = useState<File | null>(null);



  const [
    targetRole,
    setTargetRole,
  ] = useState(
    "software_engineer"
  );



  const [
    error,
    setError,
  ] = useState("");



  const [
    isDragging,
    setIsDragging,
  ] = useState(false);





  const validateFile = (
    file: File
  ) => {

    if (
      file.type !==
      "application/pdf"
    ) {

      setError(
        "Only PDF files are allowed."
      );

      return;

    }


    if (
      file.size >
      MAX_SIZE
    ) {

      setError(
        "Maximum file size is 10 MB."
      );

      return;

    }


    setSelectedFile(file);
    setError("");

  };





  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      e.target.files?.[0];


    if(file){
      validateFile(file);
    }

  };





  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>
  ) => {

    e.preventDefault();

    setIsDragging(false);


    const file =
      e.dataTransfer.files?.[0];


    if(file){
      validateFile(file);
    }

  };





  const removeFile = () => {

    setSelectedFile(null);
    setError("");


    if(inputRef.current){

      inputRef.current.value="";

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

            <Sparkles size={30}/>

          </motion.div>



          <div>

            <h2
              className="
                text-3xl
                font-bold

                text-white
              "
            >
              Resume Analyzer
            </h2>


            <p
              className="
                mt-1
                text-slate-400
              "
            >
              Upload your resume and receive
              AI-powered career insights.
            </p>


          </div>


        </div>





        {/* Role Selection */}

        <div
          className="
            mt-8
          "
        >

          <label
            className="
              mb-3
              block

              text-sm

              font-medium

              text-slate-300
            "
          >
            Target Role
          </label>


          <select

            value={targetRole}

            onChange={(e)=>
              setTargetRole(
                e.target.value
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

              focus:border-cyan-400/40
            "
          >

            {
              TARGET_ROLES.map(role=>(

                <option

                  key={role.value}

                  value={role.value}

                  className="bg-slate-900"

                >

                  {role.label}

                </option>

              ))
            }


          </select>


        </div>





        {/* Upload Area */}

        <motion.div

          whileHover={{
            scale:1.01,
          }}

          onClick={() =>
            inputRef.current?.click()
          }

          onDragOver={(e)=>{

            e.preventDefault();

            setIsDragging(true);

          }}

          onDragLeave={() =>
            setIsDragging(false)
          }


          onDrop={handleDrop}


          className={`

            mt-8

            cursor-pointer

            rounded-2xl

            border-2

            border-dashed

            p-10

            text-center

            transition-all


            ${
              isDragging

              ?

              `
              border-cyan-400

              bg-cyan-500/10

              shadow-[0_0_30px_rgba(34,211,238,0.2)]
              `

              :

              `
              border-white/20

              bg-white/5

              hover:border-cyan-400/40
              `
            }

          `}
        >

          <Upload
            className="
              mx-auto
              h-14
              w-14
              text-cyan-300
            "
          />



          <p
            className="
              mt-4
              text-xl
              font-semibold
              text-white
            "
          >
            Click or Drag & Drop
          </p>



          <p
            className="
              mt-2
              text-sm
              text-slate-400
            "
          >
            PDF only • Maximum 10 MB
          </p>



          <input

            ref={inputRef}

            hidden

            type="file"

            accept=".pdf"

            onChange={handleFileChange}

          />


        </motion.div>





        {/* Error */}

        {
          error && (

            <p
              className="
                mt-4
                text-sm
                font-medium
                text-red-400
              "
            >
              {error}
            </p>

          )
        }





        {/* File Preview */}

        {
          selectedFile && (

            <div

              className="
                mt-6

                flex

                items-center

                justify-between


                rounded-2xl

                border

                border-white/10

                bg-white/5

                p-4
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                <FileText
                  className="
                    h-10
                    w-10
                    text-cyan-300
                  "
                />


                <div>

                  <p
                    className="
                      font-medium
                      text-white
                    "
                  >
                    {selectedFile.name}
                  </p>


                  <p
                    className="
                      text-sm
                      text-slate-400
                    "
                  >
                    {
                      (
                        selectedFile.size /
                        1024 /
                        1024
                      ).toFixed(2)
                    } MB
                  </p>


                </div>

              </div>



              <button

                type="button"

                onClick={removeFile}

                className="
                  rounded-lg

                  p-2

                  text-red-400

                  hover:bg-red-500/10
                "
              >

                <X size={20}/>

              </button>


            </div>

          )
        }





        {/* Analyze Button */}

        <motion.button

          whileHover={{
            y:-2,
            scale:1.02,
          }}

          whileTap={{
            scale:0.97,
          }}


          type="button"


          disabled={
            !selectedFile ||
            isLoading
          }


          onClick={() =>
            selectedFile &&
            onAnalyze(
              selectedFile,
              targetRole
            )
          }


          className="
            mt-8

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


            disabled:cursor-not-allowed

            disabled:opacity-50
          "
        >

          {
            isLoading
            ?
            "Analyzing Resume..."
            :
            <>
              <Sparkles size={18}/>
              Analyze Resume
            </>
          }


        </motion.button>


      </div>


    </GlassPanel>

  );

};


export default ResumeUpload;