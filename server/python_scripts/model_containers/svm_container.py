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
from model_containers.model_container import ModelContainer
from data_containers.data_loader import DataLoader
from utils.gen_utils import load_pkl, save_pkl
import numpy as np
import os
from os.path import join
from sklearn.svm import SVC as svc
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from bson.objectid import ObjectId

class SVMContainer(ModelContainer):

    '''trains the model. Params: [], Returns: '''
    def train(self, model_id):
        try:
            conn = MongoClient()
            print("\nConnection Successful")

            #TODO:replace the placeholders (in caps) with actual values
            mlaas_db = conn.DB_NAME #connect to db
            mlaas_db.authenticate(USERNAME, PASS)
            models = mlaas_db.COLL_NAME #load the collection
            model_cont = models.find_one({'_id': ObjectId(model_id)}) #get the model corresponding to the id provided
            assert model_cont, "Invalid model ID"
             
            train_status = model_cont['train_status'] #get training status of model container

            #block if model is being trained currently
            if train_status != "trained":
                params = model['parameters']
                pickle_path = PATH_TO_DATA
                #IMPORTANT: data loaded/stored into pickle should be an object 
                #containing features and labels
                features, labels = DataLoader().load_user_data(pickle_path)
                if 'train_test_split' in params.keys():
                    data_split = params['train_test_split']
                    trainset = DataProcessor().get_trainset(features, labels, data_split)
                
                clf = svc()
                clf.fit(features, labels)
                #TODO: figure out generic format for path to learned weights
                save_pkl(clf.coef_, PATH_TO_WEIGHTS)
                
                model_cont['path_to_weights'] = PATH_TO_WEIGHTS
                model_cont['train_status'] = "trained"
                
                models.update({'_id': ObjectId(model_id)}, {'$set': model_cont}, upsert=False)               

        except ConnectionFailure as conn_e:
            print("\nCould not connect to server. Raised the following exception:\n{}".format(conn_e))

    '''makes predictions on data samples provided. Params: [], Returns: '''
    def predict(self, model_id):
    	pass


    '''evaluates loss and other metrics on the trained model. Params: [],
    Returns: '''
    def evaluate(self, model_id):
        pass
