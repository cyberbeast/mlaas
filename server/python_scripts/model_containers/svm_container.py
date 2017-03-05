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

#framework specific dependencies
from model_containers.model_container import ModelContainer
from data_containers.data_loader import DataLoader
from utils.gen_utils import load_pkl, save_pkl
from config.global_parameters import (data_path, HOST_NAME, PORT, DB_NAME,
                                        COLL_NAME, USERNAME, PASS)
#third party libraries
import numpy as np
from os.path import join, exists
from sklearn.svm import SVC as svc
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from bson.objectid import ObjectId

#global constants for testing: TODO - replace with standard stuff later
PATH_TO_WEIGHTS = join(data_path, 'weights.p')
PATH_TO_DATA = join(data_path, 'test1.p')

class SVMContainer(ModelContainer):

    '''trains the model. Params: [], Returns: '''
    def train(self, model_id):

        try:
            conn = MongoClient()
            print("\nConnection Successful")

            mlaas_db = conn[DB_NAME] #connect to db
            mlaas_db.authenticate(USERNAME, PASS)
            models = mlaas_db[COLL_NAME] #load the collection
            
            #get the model corresponding to the id provided
            model_cont = models.find_one({'_id': ObjectId(model_id)})
            assert model_cont, "Invalid model ID"
            
            #get training status of model container
            train_status = model_cont['train_status'] 

            #block if model is being trained currently
            if train_status != "trained":
                #params = model['parameters']
                dataset = DataLoader().load_user_data(PATH_TO_DATA)

                if 'train_test_split' in params.keys():
                    data_split = params['train_test_split']
                    trainset = DataProcessor().get_trainset(features, labels, data_split)
                
                clf = svc()
                clf.fit(dataset['features'], dataset['labels'])
                
                save_pkl(clf.coef_, PATH_TO_WEIGHTS)
                
                #model_cont['path_to_weights'] = PATH_TO_WEIGHTS
                model_cont['train_status'] = "trained"
                
                models.update({'_id': ObjectId(model_id)}, {'$set': model_cont}, upsert=False)               
        #TODO: figure out why this form of catch clause does not work
        except ConnectionFailure as conn_e:
            print("\nCould not connect to server. \
                    Raised the following exception:\n{}".format(conn_e))

    '''makes predictions on data samples provided. Params: [], Returns: '''
    def predict(self, model_id):
    	pass


    '''evaluates loss and other metrics on the trained model. Params: [],
    Returns: '''
    def evaluate(self, model_id):
        pass
