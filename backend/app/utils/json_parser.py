import json
import re

_THINK_BLOCK = re.compile(r"<think>.*?</think>", re.DOTALL | re.IGNORECASE)
_THINK_UNCLOSED = re.compile(r"<think>.*$", re.DOTALL | re.IGNORECASE)


def strip_thinking(text: str) -> str:
    """
    Remove qwen3-style <think>...</think> reasoning from model output.

    Also drops an unclosed <think> block (output cut off mid-thought).
    """
    text = _THINK_BLOCK.sub("", text)
    text = _THINK_UNCLOSED.sub("", text)
    return text.strip()


def extract_json(raw: str) -> dict:
    """
    Extract the first valid JSON object from raw LLM output.

    Handles <think> blocks, markdown code fences and any text before or
    after the JSON. Raises ValueError if no JSON object can be parsed.
    """
    text = strip_thinking(raw)
    text = text.replace("```json", "").replace("```", "").strip()

    decoder = json.JSONDecoder()
    position = text.find("{")

    while position != -1:
        try:
            value, _ = decoder.raw_decode(text, position)

            if isinstance(value, dict):
                return value

        except json.JSONDecodeError:
            pass

        position = text.find("{", position + 1)

    raise ValueError("No valid JSON object found in model output.")
