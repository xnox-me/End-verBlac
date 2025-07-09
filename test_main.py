import unittest
from unittest.mock import patch, mock_open
import os
import sys

# Add the project directory to the path
sys.path.insert(0, '/home/eboalking/ai_terminal_control')

import main

class TestMain(unittest.TestCase):

    @patch('builtins.input', side_effect=['1', 'ls', 'y', 'exit'])
    @patch('main.OpenAI')
    @patch('subprocess.run')
    def test_main_flow(self, mock_subprocess_run, mock_openai, mock_input):
        # Mock the AI's response
        mock_choice = mock_openai.return_value.chat.completions.create.return_value.choices[0]
        mock_choice.message.content = "ls -la"

        # Mock the subprocess result
        mock_subprocess_run.return_value.stdout = "total 0"
        mock_subprocess_run.return_value.stderr = ""

        # Mock the open function for the journal
        m = mock_open()
        with patch('builtins.open', m, create=True):
            main.main()

        # Assert that the journal was written to
        m.assert_called_with("chat_journal.txt", "a")
        handle = m()
        # Assert that the journal was written to with both user input and AI command
        journal_content = "".join([call.args[0] for call in handle.write.call_args_list])
        self.assertIn("User: ls", journal_content)
        self.assertIn("AI Command: ls -la", journal_content)

        # Assert that the command was executed
        mock_subprocess_run.assert_called_with(["bash", "-c", "ls -la"], capture_output=True, text=True, check=True)

    @patch('builtins.input', side_effect=['1', ':alias ll=ls -la', 'll', 'y', 'exit'])
    @patch('main.OpenAI')
    @patch('subprocess.run')
    def test_alias_and_history(self, mock_subprocess_run, mock_openai, mock_input):
        # Mock the AI's response for the 'll' prompt
        mock_choice = mock_openai.return_value.chat.completions.create.return_value.choices[0]
        mock_choice.message.content = "ll" # AI returns the alias, main.py applies the actual command

        # Mock the subprocess result
        mock_subprocess_run.return_value.stdout = "aliased command output"
        mock_subprocess_run.return_value.stderr = ""

        # Mock the open function for the journal
        m = mock_open()
        with patch('builtins.open', m, create=True):
            main.main()

        # Assert that the journal was written to
        journal_content = "".join([call.args[0] for call in m().write.call_args_list])
        self.assertIn("User: :alias ll=ls -la", journal_content)
        self.assertIn("User: ll", journal_content)
        self.assertIn("AI Command: ls -la", journal_content) # The actual executed command after alias resolution

    @patch('builtins.input', side_effect=['1', ':multi', 'echo "Hello"', 'echo "World!"', '.', 'y', 'exit'])
    @patch('main.OpenAI')
    @patch('subprocess.run')
    def test_multi_line_command(self, mock_subprocess_run, mock_openai, mock_input):
        # Mock the AI's response for the multi-line prompt
        multi_line_ai_command = 'echo "Hello"\necho "World!"'
        mock_choice = mock_openai.return_value.chat.completions.create.return_value.choices[0]
        mock_choice.message.content = multi_line_ai_command

        # Mock the subprocess result
        mock_subprocess_run.return_value.stdout = "Hello\nWorld!"
        mock_subprocess_run.return_value.stderr = ""

        # Mock the open function for the journal
        m = mock_open()
        with patch('builtins.open', m, create=True):
            main.main()

        # Assert that the journal was written to
        journal_content = "".join([call.args[0] for call in m().write.call_args_list])
        self.assertIn("User: echo \"Hello\"\necho \"World!\"", journal_content)
        self.assertIn(f"AI Command: {multi_line_ai_command}", journal_content)

        # Assert that the multi-line command was executed
        mock_subprocess_run.assert_called_with(["bash", "-c", multi_line_ai_command], capture_output=True, text=True, check=True)

    @patch('builtins.input', side_effect=['1', 'cd my_project', 'y', 'create file', 'y', 'exit'])
    @patch('main.OpenAI')
    @patch('subprocess.run')
    def test_context_aware_prompt(self, mock_subprocess_run, mock_openai, mock_input):
        # Create mock responses for OpenAI API calls
        mock_response_cd = unittest.mock.Mock()
        mock_response_cd.choices = [unittest.mock.Mock()]
        mock_response_cd.choices[0].message.content = "cd my_project"

        mock_response_create_file = unittest.mock.Mock()
        mock_response_create_file.choices = [unittest.mock.Mock()]
        mock_response_create_file.choices[0].message.content = "touch my_project/new_file.txt"

        # Set the side_effect for the create method
        mock_openai.return_value.chat.completions.create.side_effect = [
            mock_response_cd,
            mock_response_create_file
        ]

        # Mock the subprocess result
        mock_subprocess_run.return_value.stdout = ""
        mock_subprocess_run.return_value.stderr = ""

        # Mock the open function for the journal
        m = mock_open()
        with patch('builtins.open', m, create=True):
            main.main()

        # Assert that the cd command was executed
        mock_subprocess_run.assert_any_call(["bash", "-c", "cd my_project"], capture_output=True, text=True, check=True)

        # Assert that get_ai_command_with_model was called with the context-aware prompt
        # The second call to create (index 1) should have the context
        expected_context_prompt = "Current directory is my_project. create file"
        mock_openai.return_value.chat.completions.create.assert_any_call(
            model=unittest.mock.ANY,
            messages=[
                {"role": "system", "content": unittest.mock.ANY},
                {"role": "user", "content": expected_context_prompt}
            ]
        )

        # Assert that the file creation command was executed
        mock_subprocess_run.assert_any_call(["bash", "-c", "touch my_project/new_file.txt"], capture_output=True, text=True, check=True)

        # Assert that the journal contains the relevant entries
        journal_content = "".join([call.args[0] for call in m().write.call_args_list])
        self.assertIn("User: cd my_project", journal_content)
        self.assertIn("AI Command: cd my_project", journal_content)
        self.assertIn("User: create file", journal_content)
        self.assertIn("AI Command: touch my_project/new_file.txt", journal_content)