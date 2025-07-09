# AI Terminal Control

This project uses AI to generate and execute terminal commands based on user prompts.

## Custom Model Usage

For detailed information on the custom model, its advantages, and how to use it, please see [CUSTOM_MODEL_USAGE.md](CUSTOM_MODEL_USAGE.md).

For detailed information about the OpenAI models used, including image and video generation models, please see the [OpenAI Models Overview](README_models.md).

## Setup

1. Create a Python virtual environment and activate it.
2. Install dependencies: `pip install openai`
3. Set your OpenAI API key in the environment variable `OPENAI_API_KEY`.

## Usage

Run the main script:

```bash
python main.py
```

Type your prompt, and the AI will suggest and execute terminal commands.
Type `exit` to quit the program.