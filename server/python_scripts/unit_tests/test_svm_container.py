import unittest
import numpy as np
from sklearn.svm import SVC as svc
import os
from model_containers import svm_container

class TestSVMContainer(unittest.TestCase):

    dataset_size = 10

    def test_train_empty_return(self):
        x = np.random.uniform(0, 6, (self.dataset_size, 4)).astype(np.float32)
        y = np.random.choice([0,1], (self.dataset_size, 4)).astype(np.float32)
        trainset = {"features" : x, "labels" : y} 
        metrics = svm_container.SVMContainer().train(trainset)
        self.assertFalse(len(metrics), 0)

if __name__ == "__main__":
    unittest.main()
