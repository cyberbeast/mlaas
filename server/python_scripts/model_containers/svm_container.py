###############################################################################
# Author: Abhimanyu Banerjee
# Project: Machine Learning as a Service
# Date Created: 2/7/2017
# 
# File Description: This script implements a Support Vector Machine container 
# through the model container template. It implements the train, test and 
# evaluate methods of the model container template. 
###############################################################################

from __future__ import print_function
from model_container import ModelContainer
from data_container.data_loader import DataLoader
from utils.gen_utils import load_pkl, save_pkl
import numpy as np
import os
from os.path import join
from sklearn.svm import SVC as svc
import pymongo
from pymongo.errors import ConnectionFailure

class SVMContainer(ModelContainer):

	'''trains the model. Params: [], Returns: '''
	def train(self, model_id):
        try:
            conn = pymongo.MongoClient()
            print("\nConnection Successful")

            #TODO:replace the placeholders (in caps) with actual values
            mlaas_db = conn.DB_NAME
            models = mlaas_db.COLL_NAME
            model = models.find_one({'_id': model_id})
            assert model != None, "Invalid model ID"
             
            train_status = model['meta']['train_status']

            #block if model is being trained currently
            if train_status != "trained":
                params = model['parameters']
                data_path = model['data_path']
                features, labels = DataLoader.load_user_data(data_path)
                if 'train_test_split' in params.keys():
                    data_split = params['train_test_split']
                    trainset = DataProcessor.get_trainset(data_split)
                
                clf = svc()
                clf.fit(trainset['features'], trainset['labels'])
                #TODO: figure out generic format for path to learned weights
                dump_pkl(clf.coeff_, PATH_TO_WEIGHTS)
                
                model['path_to_weights'] = PATH_TO_WEIGHTS
                model['train_status'] = "trained"
                
                models.update({'_id': model_id}, {'$set': model}, upsert: False)               

        except ConnectionFailure as conn_e:
            print("\nCould not connect to server.\
                    Raised the following exception:\n{}".format(conn_e))

	'''makes predictions on data samples provided. Params: [], Returns: '''
	def predict(self, model_id):
		pass
	

    '''evaluates loss and other metrics on the trained model. Params: [],
    Returns: '''
    def evaluate(self, model_id):
        pass
