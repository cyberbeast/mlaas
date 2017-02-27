###############################################################################
# Author: Abhimanyu Banerjee
# Project: Machine Learning as a Service
# Date Created: 2/7/2017
# 
# File Description: This script serves as a template/interface for a model 
# container. It includes the following methods:
# 1) train: train the model corresponding to the container
# 2) predict: perform inference on data using the model associated with the 
#   container in question
# 3) evaluate: evaluate the loss and other metrics associated with the model
#   container
###############################################################################

from __future__ import print_function
from abc import ABCMeta, abstractmethod

class ModelContainer(metaclass=ABCMeta):
	
	'''train: pull the model parameters from the database, fetch relevant 
    featuresand labels through the data processing interface, train the model 
    and return the computed training and validation accuracy.'''
	@abstractmethod
	def train(self, model_id):
		pass

	'''predict: pull the model weights from the database, perform inference on 
    the data samples provided in the api request using the trained model'''
	@abstractmethod
	def predict(self, model_id):
		pass

    '''evaluate: evaluate the loss and other metrics associated with the model
    container'''
    @abstractmethod
    def evaluate(self, model_id):
	    pass
