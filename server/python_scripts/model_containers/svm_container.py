#############################################################################
# Author: Abhimanyu Banerjee
# Project: Machine Learning as a Service
# Date Created: 2/7/2017
# 
# File Description: This script implements a Support Vector Machine container 
# through the model container template. It implements the train, test and 
# evaluate methods of the model container template. 
###############################################################################

from __future__ import print_function
from .model_container import ModelContainer
import numpy as np
import os
from os.path import join
import pickle
from sklearn.svm import SVC as svc

class SVMContainer(ModelContainer):

	'''trains the model. Params: [], Returns: '''
	def train(self, model_id):
		
        #assert self.train_status != None, "This container's train status has \
        #not been activated.\nSet it to 1: untrained, 2: training, 3:trained"
        pass

	'''makes predictions on data samples provided. Params: [], Returns: '''
	def predict(self, model_id):
		pass
	

    '''evaluates loss and other metrics on the trained model. Params: [],
    Returns: '''
    def evaluate(self, model_id):
        pass
