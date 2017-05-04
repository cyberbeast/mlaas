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

#third party libraries
import numpy as np
from os.path import join, exists
from sklearn.svm import SVC as svc
from bson.binary import Binary
from pickle import dumps as pdumps, loads as ploads
import pdb

class SVMContainer(ModelContainer):

    '''trains the model. Params: [], Returns: '''
    def train(self, model_id):

        #get training status of model container
        train_status = model_cont['train_status'] 

        if train_status != "trained":
            
            #load the data to train
            data_loader = DataLoader()
            dataset = data_loader.load_user_data(user_data_path)

            #load model specific parameters
            #TODO

            if "train_test_split" in params.keys() and params["train_test_split"]:
                data_split = params['train_test_split']
                trainset = DataProcessor().get_trainset(features, labels, data_split)

            #train the model
            clf = svc()
            clf.fit(dataset['features'], dataset['labels'])
            pkl_file = pdumps(clf)
            
            #update the model object with the results of training
            model_cont['learned_model']=Binary(pkl_file)
            model_cont['train_status'] = "trained"
            
            return model_cont

        else:
            print("Already trained")
            return False     

    '''makes predictions on data samples provided. Params: [], Returns: '''
    def predict(self, model_id):
    	pass


    '''evaluates loss and other metrics on the trained model. Params: [],
    Returns: '''
    def evaluate(self, model_id):
        pass
