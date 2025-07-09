# AI Terminal Control

This project uses AI to generate and execute terminal commands based on user prompts.

## Features

This enhanced version of the AI Terminal Control includes the following features:

*   **Model Selection:** Choose from different OpenAI models (e.g., `gpt-4o-mini`, `gpt-3.5-turbo`, `custom-model-1`) to tailor AI responses.
*   **Command Confirmation:** Before executing any AI-suggested command, the user is prompted for confirmation to prevent unintended actions.
*   **Alias Support:** Create custom aliases for frequently used commands or prompts (e.g., `:alias ll=ls -la`).
*   **Multi-line Command Support:** Input and execute multi-line shell scripts by typing `:multi` and ending with a single `.` on a new line.
*   **Context-Aware Conversations:** The AI can remember the context of the current session (e.g., current directory changes) to provide more relevant commands.
*   **Chat Journaling:** All user prompts and AI-generated commands are logged to `chat_journal.txt` for review and auditing.

## Setup

1.  Create a Python virtual environment and activate it.
2.  Install dependencies: `pip install openai`
3.  Set your OpenAI API key in the environment variable `OPENAI_API_KEY`.

## Usage Walkthrough

Run the main script to start the interactive AI terminal:

```bash
python main.py
```

Upon starting, you will be prompted to select an AI model:

```
Select an AI model to use:
1. gpt-4o-mini: A compact GPT-4 model for general purpose commands.
2. gpt-3.5-turbo: Efficient and fast GPT-3.5 model.
3. custom-model-1: Custom model with enhanced shell scripting capabilities.
Enter the number of the model to select: 1
Using model: gpt-4o-mini
AI Terminal Control - Type your prompt or 'exit' to quit
Type ':alias name=command' to create an alias.
Use up/down arrow keys to navigate command history.
Type ':multi' to enter multi-line command mode, end with a single '.' on a line.
```

### Basic Command Execution

Type your prompt, and the AI will suggest a command. You will then be asked to confirm its execution.

```
> list files
AI suggests command: ls -la
Do you want to execute this command? (y/n): y
Executing command: ls -la
Output:
total 0
... (output of ls -la) ...
```

### Using Aliases

You can create aliases for commands or prompts using the `:alias` command:

```
> :alias gs=git status
Alias 'gs' set to 'git status'

> gs
AI suggests command: git status
Do you want to execute this command? (y/n): y
Executing command: git status
Output:
On branch master
... (output of git status) ...
```

### Multi-line Commands

For complex scripts, use the `:multi` command to enter multi-line input. End your input with a single `.` on a new line.

```
> :multi
Enter multi-line command. End with a single '.' on a line.
echo "Hello, World!"
echo "This is a multi-line script."
.
AI suggests command: echo "Hello, World!"\necho "This is a multi-line script."
Do you want to execute this command? (y/n): y
Executing command: echo "Hello, World!"\necho "This is a multi-line script."
Output:
Hello, World!
This is a multi-line script.
```

### Context-Aware Conversations

The AI maintains context, such as your current directory.

```
> cd my_project
AI suggests command: cd my_project
Do you want to execute this command? (y/n): y
Executing command: cd my_project
Output:

> create a new file
AI suggests command: touch new_file.txt
Do you want to execute this command? (y/n): y
Executing command: touch new_file.txt
Output:
```
*(Note: The AI might suggest `touch my_project/new_file.txt` if it infers the full path based on context.)*

### Chat Journal

All interactions are logged in `chat_journal.txt` in the project root directory.

## Custom Model Usage

For detailed information on the `custom-model-1`, its advantages, and how to use it, please see [CUSTOM_MODEL_USAGE.md](CUSTOM_MODEL_USAGE.md).

## OpenAI Models Overview

For detailed information about the OpenAI models used, including image and video generation models, please see the [OpenAI Models Overview](README_models.md).

## Future Enhancements

The project is designed to be extensible, with potential future enhancements including:
*   Command History navigation (up/down arrow keys).
*   File Uploads for Context.
*   Plugin System for extended functionality (e.g., Git plugin).
*   Customizable System Messages.
*   Improved Error Handling and Suggestions.
*   Integration with Other Tools (Docker, Kubernetes, Cloud CLIs).
