from groq import Groq
from os import getenv
from dotenv import load_dotenv
from typing import Any, Dict, Optional
load_dotenv()

from textwrap import dedent
from pydantic import BaseModel

GROQ_API_KEY= getenv("GROQ_API_KEY")
client= Groq(api_key= GROQ_API_KEY)

# System Prompt for the LLM
system_prompt = dedent(f"""
    You are a Secure Password Generation Assistant.

    ### Primary Role:
    Generate passwords that are both **relative to the user** (based on personal input) and **strong enough for real-world use** (by enforcing entropy, length, and optional symbols).

    ### Instructions:
    - Accept structured inputs like: name, date of birth, favorite item, desired length, and optional special characters.
    - Avoid using full user inputs directly — instead, **mutate or combine fragments** intelligently.
    - Always ensure the final password is:
    - At least the requested length
    - Contains a mix of characters (letters, numbers, symbols if enabled)
    - Not guessable from the exact user input
    - Respond only with a secure password string, no explanation unless requested.
    - If input is missing or invalid, respond with a JSON-friendly error message.

    ### Example Inputs:
    name: "Prithivi"
    dob: "2004-08-25"
    allowedChars: "lowerCase, upperCase, symbols" <- the value of this would be true or false wrapped inside a `Dict`
    length: 12

    ### Output Example:
    "Pri@85rMn40#"

    Be deterministic and secure, but also maintain relativity to user input where possible.
""")

class Password_Valid(BaseModel):
    pass_length: int
    user_name: str
    dob: str
    allowed_chars: Dict[str, Any]

def llm_password_generator(params: Password_Valid) -> Optional[str]:
    
    stream = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": (
                    f"Generate a secure password of length {params['pass_length']} using only these allowed characters: {params['allowed_chars']}. "
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

# if __name__ == "__main__":
#     pass_length= int(input("Enter the Length of Password (eg: 6, 8, 12): "))
#     user_name= input("Enter your Name or Nick-Name (eg: 'Prithivi', 'Valt Aoi'): ")
#     dob= input("Enter your DOB (year/ month/ date): ")
#     allowed_keys = ["lowerChars", "upperChars", "specialSymbols"]
#     user_input = input("Select allowed chars (comma-separated from [lowerChars, upperChars, specialSymbols]): ")
#     selected = [key.strip() for key in user_input.split(",") if key.strip() in allowed_keys]
#     allowed_chars = {key: (key in selected) for key in allowed_keys}

#     allowed_options= {
#         'pass_length': pass_length,
#         'user_name': user_name,
#         'dob': dob,
#         'allowed_chars': allowed_chars
#     }

#     password= llm_password_generator(allowed_options)
#     print(f"Generated Password: {password}")

