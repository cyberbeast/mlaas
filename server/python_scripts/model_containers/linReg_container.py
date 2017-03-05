from __future__ import print_function

#frame work specific dependencies
from model_containers.model_container import ModelContainer
from data_containers.data_loader import DataLoader
from utils.gen_utils import load_pkl, save_pkl
from config.global_parameters import (data_path, HOST_NAME, PORT, DB_NAME,
                                        COLL_NAME, USERNAME, PASS)

#third party libraries
import numpy as np
from os.path import exists, join
from sklearn.linear_model import LinearRegression
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from bson.objectid import ObjectId

#global constants for testing: TODO - replace with standard stuff later
PATH_TO_WEIGHTS = join(data_path, 'weights.p')
PATH_TO_DATA = join(data_path, 'test1.p')

class linRegContainer(ModelContainer):
    
    def train(self,model_id):

        try:

            conn = MongoClient(HOST_NAME, PORT)
            print('\nConnection Successful')

            mlaas_db = conn[DB_NAME]
            mlaas_db.authenticate(USERNAME, PASS)
            models = db[COLL_NAME]
            model_cont = models.find_one({"_id": ObjectId(model_id)})
            assert model_cont, "Invalid model ID"
           
            train_status=model_cont['train_status']
            
            if train_status != "trained":
                alpha = model_cont['parameters'][0]['alpha']
                dataset = DataLoader().load_user_data(PATH_TO_DATA)

                clf = LinearRegression(alpha)
                clf.fit(dataset['features'], dataset['labels'])
            
                save_pkl(clf.coef_, PATH_TO_WEIGHTS)
    
                model_cont['train_status'] = "trained"
                models.update({'_id': ObjectId(model_id)}, {'$set': model_cont}, upsert=False)

        #TODO: figure out why this format of catch clause does not work            
        except ConnectionFailure as conn_e:
            print("\nCould not connect to server. \
                Raised the following exception:\n{}".format(conn_e))

    def evaluate(self,model_id):
        pass
    
    '''
    def accuracy(self,x,y):
        y=[float(i) for i in y]
        pkl_file = open(os.path.join(os.getcwd(),str(self.name)+'.pkl'), 'rb')
        self.model = pickle.load(pkl_file)
        y_pred=self.model.predict(x)
        acc=0
        for i in range(0,len(y_pred)):
            if int(y_pred[i]-y[i])==0:
                acc+=1
        return ((float(acc)/len(y_pred))*100)


    '''
    
    def predict(self,x_pred,model_id):
        pass

    
