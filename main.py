import openai
import subprocess
from openai import OpenAI
import subprocess
import os

def execute_command(command):
    try:
        result = subprocess.run(
            ["bash", "-c", command],
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout, result.stderr
    except subprocess.CalledProcessError as e:
        return e.stdout, e.stderr
    except FileNotFoundError:
        return "", f"Error: Command not found: {command}"

def main():
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    journal_path = "chat_journal.txt"

    # Available models with descriptions and media
    models = [
        {
            "name": "gpt-4o-mini",
            "description": "A compact GPT-4 model for general purpose commands.",
            "media": ["e2222/image1.jpg", "e2222/track.mp3"]
        },
        {
            "name": "gpt-3.5-turbo",
            "description": "Efficient and fast GPT-3.5 model.",
            "media": ["e2222/image2.png"]
        },
        {
            "name": "custom-model-1",
            "description": "Custom model with enhanced shell scripting capabilities.",
            "media": ["e111/file1.txt"]
        }
    ]

    print("Select an AI model to use:")
    for idx, model in enumerate(models, start=1):
        print(f"{idx}. {model['name']}: {model['description']}")

    selected_model = None
    while True:
        choice = input("Enter the number of the model to select: ")
        if choice.isdigit() and 1 <= int(choice) <= len(models):
            selected_model = models[int(choice) - 1]['name']
            break
        else:
            print("Invalid selection. Please enter a valid number.")

    print(f"Using model: {selected_model}")

    def get_ai_command_with_model(prompt):
        response = client.chat.completions.create(
            model=selected_model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant that ONLY responds with valid shell commands without any explanations or additional text. When the user input is vague or incomplete, respond with helpful shell commands that prompt for more details or provide useful scaffolding commands. Examples include: \n- echo \"Please provide the specific app details or requirements.\"\n- echo \"What features do you want to include?\"\n- echo \"Starting project setup...\"\n- mkdir my_app && cd my_app\n- touch README.md\n- echo \"# Project Title\" > README.md\n- git init\n- echo \"Setup complete. Please specify next steps.\""},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content.strip()

    import readline
    import shlex
    import sys

    # Alias dictionary
    aliases = {}

    # Command history list
    command_history = []
    history_index = -1

    # Context state dictionary
    context_state = {}

    def confirm_command(command):
        print(f"AI suggests command: {command}")
        while True:
            confirm = input("Do you want to execute this command? (y/n): ").strip().lower()
            if confirm == 'y':
                return True
            elif confirm == 'n':
                return False
            else:
                print("Please enter 'y' or 'n'.")

    def apply_aliases(command):
        parts = shlex.split(command)
        if parts and parts[0] in aliases:
            aliased_command = aliases[parts[0]]
            if len(parts) > 1:
                aliased_command += ' ' + ' '.join(parts[1:])
            return aliased_command
        return command

    def update_context(command):
        # Simple example: track current directory changes
        if command.startswith('cd '):
            path = command[3:].strip()
            context_state['current_directory'] = path
        elif command.startswith('mkdir '):
            # Could track created directories
            pass
        # Extend with more context tracking as needed

    def get_context_aware_prompt(user_prompt):
        context_info = ''
        if 'current_directory' in context_state:
            context_info = f"Current directory is {context_state['current_directory']}. "
        return context_info + user_prompt

    print("AI Terminal Control - Type your prompt or 'exit' to quit")
    print("Type ':alias name=command' to create an alias.")
    print("Use up/down arrow keys to navigate command history.")
    print("Type ':multi' to enter multi-line command mode, end with a single '.' on a line.")

    while True:
        try:
            user_input = input("> ")
        except (EOFError, KeyboardInterrupt):
            print("\nExiting.")
            break

        if user_input.lower() == 'exit':
            break

        if user_input.startswith(':alias '):
            # Create alias
            alias_def = user_input[len(':alias '):].strip()
            if '=' in alias_def:
                name, cmd = alias_def.split('=', 1)
                name = name.strip()
                cmd = cmd.strip()
                aliases[name] = cmd
                print(f"Alias '{name}' set to '{cmd}'")
                from datetime import datetime
                timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                with open(journal_path, "a") as journal_file:
                    journal_file.write(f"[{timestamp}] User: {user_input}\n\n")
            else:
                print("Invalid alias format. Use :alias name=command")
            continue

        if user_input == ':multi':
            print("Enter multi-line command. End with a single '.' on a line.")
            lines = []
            while True:
                line = input()
                if line.strip() == '.':
                    break
                lines.append(line)
            user_input = '\n'.join(lines)

        # Add to history
        command_history.append(user_input)
        history_index = len(command_history)

        # Prepare prompt with context
        prompt_with_context = get_context_aware_prompt(user_input)

        ai_command = get_ai_command_with_model(prompt_with_context)

        # Apply aliases
        ai_command = apply_aliases(ai_command)

        # Confirm before execution
        if not confirm_command(ai_command):
            print("Command execution cancelled.")
            continue

        # Update context
        update_context(ai_command)

        from datetime import datetime
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        with open(journal_path, "a") as journal_file:
            journal_file.write(f"[{timestamp}] User: {user_input}\n")
            journal_file.write(f"[{timestamp}] AI Command: {ai_command}\n\n")

        print(f"Executing command: {ai_command}")
        stdout, stderr = execute_command(ai_command)
        print("Output:")
        print(stdout)
        if stderr:
            print("Errors:")
            print(stderr)

    # Note: Integration with other tools and plugin system can be added later
    # ... existing code ...


if __name__ == "__main__":
    main()