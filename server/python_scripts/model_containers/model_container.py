###############################################################################
# Author: Abhimanyu Banerjee
# Project: Machine Learning as a Service
# Date Created: 2/7/2017
# 
# File Description: This script serves as a template/interface for a model 
# container. It includes the following methods:
# 1) create: set up the container with relevant metadata passed to it by the
# 	api endpoint
# 2) fetch: fetch the model (a.k.a weights) corresponding to the container 
# 	queried; raise an exception if it doesn't exist
# 3) update: update the parameters and metadata associated with the model and
# 	associated container
# 4) delete: delete the model (a.k.a weights) corresponding to the container
# 	queried; raise an exception if it doesn't exist
# 5) train: train the model corresponding to the container queried with data
# 	provided through the api endpoint
# 6) predict: perform inference on the data provided by the api endpoint using
# 	the model associated with the container in question
###############################################################################

from __future__ import print_function
from abc import ABCMeta, abstractmethod

class ModelContainer(metaclass=ABCMeta):
	
	def __init__(self, name, metadata):
		pass

	'''create: sets up the model using the parameters provided by the api 
	request.'''
	@abstractmethod
	def create(self):
		pass

	'''fetch: loads the model corresponding to the container specified in the
	api request.'''
	@abstractmethod
	def fetch(self):
		pass

	'''update: updates characteristics and/or metadata of the container as 
	specified by the parameters in the api request.'''
	@abstractmethod
	def update(self, params):
		pass

	'''delete: delete the data store (pickle) representing the model 
	corresponding to the container specified by the api request.'''
	@abstractmethod
	def delete(self):
		pass

	'''train: train the model on the features and labels provided in the api
	request and compute the training and validation accuracy.'''
	@abstractmethod
	def train(self, trainset, valset):
		pass

	'''predict: perform inference on the data samples provided in the api 
	request using the trained model'''
	@abstractmethod
	def predict(self, data_feats):
		pass
	
