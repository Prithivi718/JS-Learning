from groq import Groq
from os import getenv
from dotenv import load_dotenv
from typing import List, Dict, Optional
load_dotenv()

from textwrap import dedent

GROQ_API_KEY= getenv("GROQ_API_KEY")
client= Groq(api_key= GROQ_API_KEY)



def llm_password_generator(pass_length: int, allowed_chars: List[Dict]) -> Optional[str]:
    
    stream = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a helpful assistant that generates secure passwords. "
                    "Given a desired password length and a set of allowed characters, "
                    "generate a strong password that meets the requirements."
                )
            },
            {
                "role": "user",
                "content": (
                    f"Generate a secure password of length {pass_length} using only these allowed characters: {allowed_chars}. "
                    "Return only the password, with no explanation or extra text."
                )
            }
        ],
        model="llama-3.3-70b-versatile",
        temperature=0.5,
        max_completion_tokens=1024,
        top_p=1,
        stop=None,
        stream=True,
    )

    password = ""
    for chunk in stream:
        if chunk.choices[0].delta.content:
            password += chunk.choices[0].delta.content
    return password.strip()