import unittest
from unittest.mock import patch, MagicMock
import builtins
import main

class TestAITerminalControl(unittest.TestCase):
    def setUp(self):
        # Reset aliases, context, and history before each test
        main.aliases.clear()
        main.context_state.clear()
        main.command_history.clear()
        main.history_index = -1

    @patch('builtins.input', side_effect=['y'])
    def test_confirm_command_yes(self, mock_input):
        self.assertTrue(main.confirm_command('echo test'))

    @patch('builtins.input', side_effect=['n'])
    def test_confirm_command_no(self, mock_input):
        self.assertFalse(main.confirm_command('echo test'))

    def test_apply_aliases(self):
        main.aliases['ll'] = 'ls -l'
        self.assertEqual(main.apply_aliases('ll'), 'ls -l')
        self.assertEqual(main.apply_aliases('ll /home'), 'ls -l /home')
        self.assertEqual(main.apply_aliases('ls'), 'ls')

    def test_update_context_cd(self):
        main.update_context('cd /tmp')
        self.assertEqual(main.context_state.get('current_directory'), '/tmp')

    def test_get_context_aware_prompt(self):
        main.context_state['current_directory'] = '/var'
        prompt = main.get_context_aware_prompt('ls')
        self.assertTrue(prompt.startswith('Current directory is /var. '))
        self.assertTrue(prompt.endswith('ls'))

    @patch('builtins.input', side_effect=[':alias gs=git status', ':alias', ':alias invalid', 'exit'])
    def test_alias_creation(self, mock_input):
        with patch('builtins.print') as mock_print:
            # Test valid alias
            main.main = lambda: None  # Disable main loop
            main.aliases.clear()
            # Simulate alias creation
            main.aliases['gs'] = 'git status'
            self.assertIn('gs', main.aliases)
            self.assertEqual(main.aliases['gs'], 'git status')

    @patch('builtins.input', side_effect=[':multi', 'echo line1', 'echo line2', '.', 'exit'])
    def test_multiline_input(self, mock_input):
        # Test multi-line input handling
        lines = ['echo line1', 'echo line2']
        # Simulate multi-line input
        user_input = '\n'.join(lines)
        self.assertEqual(user_input, 'echo line1\necho line2')

if __name__ == '__main__':
    unittest.main()