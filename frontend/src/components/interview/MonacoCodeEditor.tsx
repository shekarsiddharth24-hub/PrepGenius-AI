import Editor from "@monaco-editor/react";

interface MonacoCodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
}

export default function MonacoCodeEditor({
  language,
  value,
  onChange,
}: MonacoCodeEditorProps) {
  return (
    <Editor
      height="500px"
      language={language}
      theme="vs-dark"
      value={value}
      onChange={(value) => onChange(value ?? "")}
      options={{
        minimap: {
          enabled: false,
        },

        fontSize: 15,

        automaticLayout: true,

        wordWrap: "on",

        scrollBeyondLastLine: false,

        roundedSelection: true,

        tabSize: 4,

        insertSpaces: true,

        formatOnPaste: true,

        formatOnType: true,
      }}
    />
  );
}