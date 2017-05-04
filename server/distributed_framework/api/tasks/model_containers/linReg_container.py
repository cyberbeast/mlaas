from __future__ import print_function

#frame work specific dependencies
from model_containers.model_container import ModelContainer
from data_containers.data_loader import DataLoader
from utils.gen_utils import load_pkl, save_pkl
#from config.global_parameters import (data_path, HOST_NAME, DB_NAME,
 #                                      WEIGHTS_FNAME, USER_DATA_FNAME, COLL_NAME)

#third party libraries
import numpy as np
from os.path import exists, join
from sklearn.linear_model import LinearRegression
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from bson.objectid import ObjectId
from bson.binary import Binary
from pickle import dumps as pdumps, loads as ploads
import json
import pdb

class linRegContainer(ModelContainer):

    def train(self, model_cont, user_data=None):

        train_status=model_cont['train_status']

        if train_status != "training":
            data_loader = DataLoader()

            alpha = model_cont['parameters']['alpha']
            dataset = data_loader.load_user_data(user_data_path);
            clf = LinearRegression(alpha)
            clf.fit(dataset['features'], dataset['labels'])
            pkl_file = pdumps(clf)
            #save_pkl(clf, data_path, WEIGHTS_FNAME)
            model_cont['learned_model']=pkl_file
            model_cont['train_status'] = "trained"
            return model_cont
        else:
            print("Already Trained")
            return True

    def predict(self,model_cont, x_pred):

        train_status=model_cont['train_status']

        if train_status == "trained":

            x_pred = np.array(x_pred)
            clf = ploads(model_cont['learned_model'])
            y = clf.predict(x_pred)

        else:
            y = False

        return y

    def evaluate(self,y,y_pred):
        acc=0
        for i in range(0,len(y_pred)):
            if int(y_pred[i]-y[i])==0:
                acc+=1
        accuracy=float(acc)/len(y_pred)*100
        return accuracy
