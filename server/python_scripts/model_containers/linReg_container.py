from __future__ import print_function
from model_containers.model_container import ModelContainer
from data_containers.data_loader import DataLoader
from utils.gen_utils import load_pkl, save_pkl
from config.global_parameters import data_path
import numpy as np
from os.path import exists, join
#from sklearn import datasets
from sklearn.linear_model import LinearRegression
from pymongo import MongoClient
from bson.objectid import ObjectId

class linRegContainer(ModelContainer):
    
    def train(self,model_id):
        try:

            conn = MongoClient('ds119250.mlab.com', 19250)
            db = conn.mydb1
            db.authenticate('gautam678', 'gautam678')
            models = db.mlaas
            model_cont = models.find_one({"_id": ObjectId(model_id)})
            assert model_cont, "Invalid model ID"
            
            
            alpha=model_cont['parameters'][0]['alpha']
            train_status=model_cont['train_status']
            
            if train_status != "trained":
                #data_path = cursor['data_path'] #No datapath in schema
                pickle_path = join(data_path, 'test1.p')
                features, labels = DataLoader().load_user_data(pickle_path)

            clf = LinearRegression()
            clf.fit(features, labels)
            
            save_pkl(clf.coef_, join(data_path, 'weights.p'))
    
            model_cont['train_status'] = "trained"
            models.update({'_id': ObjectId(model_id)}, {'$set': model_cont}, upsert=False)
            
        except ConnectionFailure as conn_e:
            print("\nCould not connect to server. Raised the following exception:\n{}".format(conn_e))

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

    
