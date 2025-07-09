# Custom Model Usage and Explanation

## Overview

The `custom-model-1` in this application is designed to provide enhanced shell scripting capabilities tailored specifically for generating and executing terminal commands. This model is a placeholder for any specialized or fine-tuned AI model that you might want to integrate into your workflow.

## Why Use the Custom Model?

- **Specialization:** Unlike general-purpose models like `gpt-4o-mini` or `gpt-3.5-turbo`, the custom model can be fine-tuned on specific shell scripting tasks, making it more accurate and efficient for your particular use cases.
- **Enhanced Command Generation:** It can generate more complex, context-aware shell commands that are optimized for your environment.
- **Flexibility:** You can customize the model to include domain-specific knowledge, aliases, or scripting conventions that you frequently use.
- **Improved Safety:** By tailoring the model, you can reduce the risk of unsafe or unintended commands.

## How to Use the Custom Model

1. **Selection:** When you start the AI terminal control application, you will be prompted to select an AI model. Choose the option corresponding to `custom-model-1`.

2. **Integration:** The application uses this model to generate shell commands based on your prompts. It applies any aliases and context-aware enhancements you have configured.

3. **Customization:** To customize the model, you can fine-tune it with your own dataset of shell commands, scripts, and usage patterns. This requires access to OpenAI's fine-tuning API or your own model training pipeline.

4. **Extending Functionality:** You can extend the application to load different custom models by adding them to the models list in `main.py` with appropriate names and descriptions.

## Example Usage

```bash
# Start the application
python3 main.py

# Select the custom model when prompted
Enter the number of the model to select: 3

# Enter your prompt
> create a backup script for my documents

# The AI will generate a shell command using the custom model
# Confirm and execute the command as usual
```

## Summary

The custom model offers a powerful way to tailor AI-generated shell commands to your specific needs, improving accuracy, safety, and efficiency. It complements the general-purpose models by providing a specialized option for advanced users.

Feel free to modify and extend this model to best fit your workflow!