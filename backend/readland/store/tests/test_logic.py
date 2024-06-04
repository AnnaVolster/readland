from unittest import TestCase
from store.logic import operations


class LogicTestCase(TestCase):
    def test_plus(self):
        result = operations(6, 13, '+')
        self.assertEqual(19, result)

    def test_multiply(self):
        result = operations(6, 3, '*')
        self.assertEqual(18, result)
