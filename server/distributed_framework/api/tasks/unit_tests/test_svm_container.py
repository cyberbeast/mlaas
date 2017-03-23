###############################################################################
# Author: Abhimanyu Banerjee
# Project: Machine Learning as a Service
# Date Created: 2/28/2017
#
# File Description: This script performs unit tests on the various methods of 
# the SVMContainer class
###############################################################################

import unittest
import numpy as np
from sklearn.svm import SVC as svc
import os
from model_containers import svm_container

class TestSVMContainer(unittest.TestCase):

    def test_train_invalid_id(self):
        self.assertRaises(AssertionError, svm_container.SVMContainer().train, -999)

    def test_predict(self):
        pass

    def test_evaluate(self):
        pass

if __name__ == "__main__":
    unittest.main()
