from __future__ import print_function

#frame work specific dependencies
from model_containers.model_container import ModelContainer
from data_containers.data_loader import DataLoader
from utils.gen_utils import load_pkl, save_pkl

#third party libraries
import numpy as np
from os.path import exists, join
from sklearn.linear_model import LinearRegression
from bson.binary import Binary
from pickle import dumps as pdumps, loads as ploads
import json
import pdb

class linRegContainer(ModelContainer):
    
    '''trains the model. Params: [], Returns: '''
    def train(self,model_cont, user_data_path):
        
        train_status=model_cont['train_status']
        
        if train_status != "training":
            
            #load the data to train on
            data_loader = DataLoader()
            dataset = data_loader.load_user_data(user_data_path);
            
            #load the model specific parameters
            arch = model_cont['parameters']['arch']

            #train the model
            clf = GraphContainer(arch)
            clf.fit(dataset['features'], dataset['labels'])
            pkl_file = pdumps(clf)
            
            #update the model object with the results of training
            model_cont['learned_model']=Binary(pkl_file)
            model_cont['train_status'] = "trained"
            return model_cont

        else:
            print("Already Trained")
            return True

    '''makes predictions on data samples provided. Params: [], Returns: '''
    def predict(self,model_id):
        try:
            conn = MongoClient(HOST_NAME)

            print('\nConnection Successful')
            mlaas_db = conn[DB_NAME]
            models = mlaas_db[COLL_NAME]
            model_cont = models.find_one({"_id": ObjectId(model_id)})
            assert model_cont, "Invalid model ID"
            model_id=model_cont['_id'] 

            train_status=model_cont['train_status']
            
            if train_status == "trained":
                clf = ploads(model_cont['learned_model'])
                y = clf.predict(x_pred)
                print("Predicted Value:",y)
        except ConnectionFailure:
            print("\nCould not connect to server. \
                Raised the following exception:\n{}".format(conn_e))
        return y
    
    def evaluate(self,y,y_pred):
        acc=0
        for i in range(0,len(y_pred)):
            if int(y_pred[i]-y[i])==0:
                acc+=1
        accuracy=float(acc)/len(y_pred)*100
        return accuracy


