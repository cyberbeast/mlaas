###############################################################################
# Author: Abhimanyu Banerjee
# Project: Machine Learning as a Service
# Date Created: 2/7/2017
# 
# File Description: This script implements a Support Vector Machine container 
# through the model container template. It includes the following methods:
# 1) create: sets up the container with relevant metadata passed to it by the
# 	api endpoint
# 2) fetch: fetches the model (a.k.a weights) corresponding to the container 
# 	queried; raises an exception if it doesn't exist
# 3) update: update the parameters and metadata associated with the model and
# 	associated container
# 4) delete: deletes the model (a.k.a weights) corresponding to the container
# 	queried; raises an exception if it doesn't exist
# 5) train: trains the model corresponding to the container queried with data
# 	provided through the api endpoint
# 6) predict: performs inference on the data provided by the api endpoint using
# 	the model associated with the container in question
###############################################################################

from __future__ import print_function
import numpy as np
import os
from os.path import join
import pickle
from sklearn.svm import SVC as svc

class ModelContainer(object):
	
	def __init__(self, name, metadata):
		self.name = name
		self.train_status = metadata["train_status"]
		self.deploy_status = metadata["deploy_status"]
		self.training_acc = metadata["training_acc"]
		self.validation_acc = metadata["val_acc"]
		self.penalty_factor = metadata["parameters"]["C"]
		self.kernel = metadata["parameters"]["kernel"]
		self.basis_deg = metadata["parameters"]["degree"]
		self.kernel_coeff = metadata["parameters"]["gamma"]

	'''helper function for loading stored pickles'''
	def _load(self, pickle_fname):
		pass

	'''helper function for saving data to pickle'''
	def _save(self):
		pass

	'''create: sets up the model using the parameters provided by the api 
	request. Params: [], Return: '''
	def create(self):
		pass

	'''fetch: loads the model corresponding to the container specified in the
	api request. Params: [], Return: '''
	def fetch(self):
		pass

	'''update: updates characteristics and/or metadata of the container as 
	specified by the parameters in the api request. Params: [], Return: '''
	def update(self, params):
		pass

	'''delete: delete the data store (pickle) representing the model 
	corresponding to the container specified by the api request. Params: [], 
	Return: '''
	def delete(self):
		pass

	'''train: train the model on the features and labels provided in the api
	request and compute the training and validation accuracy. Params: [], 
	Return: '''
	def train(self, trainset, valset):
		pass

	'''predict: perform inference on the data samples provided in the api 
	request using the trained model'''
	def predict(self, data_feats):
		pass
	
