interface Props {
  language: string;
  onChange: (language: string) => void;
}

const LANGUAGES = [
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "C", value: "c" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "Kotlin", value: "kotlin" },
  { label: "Swift", value: "swift" },
  { label: "C#", value: "csharp" },
];

export default function LanguageSelector({
  language,
  onChange,
}: Props) {
  return (
    <select
      value={language}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-2 text-white"
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}