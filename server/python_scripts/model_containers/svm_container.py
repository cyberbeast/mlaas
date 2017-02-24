###############################################################################
# Author: Abhimanyu Banerjee
# Project: Machine Learning as a Service
# Date Created: 2/7/2017
# 
# File Description: This script implements a Support Vector Machine container 
# through the model container template. It implements the train and test methods
# of the model container template. 
###############################################################################

from __future__ import print_function
from .model_container import ModelContainer
import numpy as np
import os
from os.path import join
import pickle
from sklearn.svm import SVC as svc

class SVMContainer(ModelContainer):
	
	def __init__(self, metadata=None):
		super().__init__(metadata)


	def _load(self, pickle_fname):
		pass

	'''helper function for saving data to pickle'''
	def _save(self):
		pass

	'''train: train the model on the features and labels provided in the api
	request and compute the training and validation accuracy. Params: [], 
	Return: '''
	def train(self, trainset, valset=None):
		assert self.train_status != None, "This container's train status has not been activated"

	'''predict: perform inference on the data samples provided in the api 
	request using the trained model'''
	def predict(self, data_feats):
		pass
	
