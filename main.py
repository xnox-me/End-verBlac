import openai
import subprocess
from openai import OpenAI
import subprocess
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Function to get AI-generated terminal command

def get_ai_command(prompt):
    system_message = {"role": "system", "content": "You are a helpful assistant that only responds with valid shell commands without any explanations or additional text."}
    user_message = {"role": "user", "content": prompt}
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[system_message, user_message]
    )
    command = response.choices[0].message.content.strip()
    return command

# Function to execute terminal command

def execute_command(command):
    try:
        # Wrap command in bash -c to handle complex commands safely
        result = subprocess.run(["bash", "-c", command], capture_output=True, text=True)
        return result.stdout, result.stderr
    except Exception as e:
        return "", str(e)

# Main loop

def main():
    print("AI Terminal Control - Type your prompt or 'exit' to quit")
    while True:
        user_input = input("> ")
        if user_input.lower() == 'exit':
            break
        ai_command = get_ai_command(user_input)
        print(f"AI suggests command: {ai_command}")
        print(f"Executing command: {ai_command}")  # Debugging output
        stdout, stderr = execute_command(ai_command)
        print("Output:")
        print(stdout)
        if stderr:
            print("Errors:")
            print(stderr)

if __name__ == "__main__":
    main()