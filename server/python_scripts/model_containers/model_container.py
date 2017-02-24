###############################################################################
# Author: Abhimanyu Banerjee
# Project: Machine Learning as a Service
# Date Created: 2/7/2017
# 
# File Description: This script serves as a template/interface for a model 
# container. It includes the following methods:
# 1) train: train the model corresponding to the container queried with data
# 	provided through the api endpoint
# 2) predict: perform inference on the data provided by the api endpoint using
# 	the model associated with the container in question
###############################################################################

from __future__ import print_function
from abc import ABCMeta, abstractmethod

class ModelContainer(metaclass=ABCMeta):
	
	def __init__(self, metadata=None):
		if metadata:
			self.train_status = metadata["train_status"]
			self.deploy_status = metadata["deploy_status"]
			self.training_acc = metadata["training_acc"]
			self.validation_acc = metadata["val_acc"]
        


	'''train: train the model on the features and labels provided in the api
	request and compute the training and validation accuracy.'''
	@abstractmethod
	def train(self, trainset, valset, parameters):
		pass

	'''predict: perform inference on the data samples provided in the api 
	request using the trained model'''
	@abstractmethod
	def predict(self, data_feats, weights_path):
		pass
	
