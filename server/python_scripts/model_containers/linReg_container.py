from __future__ import print_function
#from model_container import ModelContainer
import numpy as np
import pandas as pd
from sklearn import datasets
from sklearn.linear_model import LinearRegression
from pymongo import MongoClient
import pickle
import os
import json
class linear_regression:
    model=0
    name_of_file=""
    def train(self,model_id):
        #client = MongoClient()
        #db=client.mydb.mlaas
        #cursor = db.find_one()
        cursor={u'name': 'linearregression',u'type': 'NULL', u'_id': '58ba6c0dd84f08e2306fdb01', u'parameters':[{u'alpha':'0.01'}],u'train_status': 'untrained',u'deploy_status': 'undefined'}
        self.name_of_file=cursor['name']
        alpha=cursor['parameters'][0]['alpha']
        train_status=cursor['train_status']
        deploy_status=cursor['deploy_status']
        #if train_status != "trained":
            #data_path = cursor['data_path'] #No datapath in schema
            #features, labels = DataLoader.load_user_data(data_path)
        self.model=LinearRegression(copy_X=[[0, 0], [1, 1], [2, 2]])
        self.save()
        train_status="trained"

    def evaluate(self,model_id):
        client = MongoClient()
        db=client.mydb.mlaas
        cursor = db.find_one({'_id': model_id})
        print(cursor)

    def fetch(self):
        pkl_file = open(os.path.join(os.getcwd(),str(self.name)+'.pkl'), 'rb')
        self.model = pickle.load(pkl_file)
        print("New model Loaded")
        return self._attr()
    
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


    
    def _attr(self):
        coef=self.model.coef_
        intercept=self.model.intercept_
        return coef,intercept
    
    def score(self,x,y):
        score=self.model.score(x,y)
        return score


    def create(self):
        self.model=LinearRegression(copy_X=self.copy_x,fit_intercept=self.intercept,normalize=self.normalize,n_jobs=self.n_jobs)
        self.save()


    def fit(self,x,y):
        pkl_file = open(os.path.join(os.getcwd(),str(self.name)+'.pkl'), 'rb')
        self.model = pickle.load(pkl_file)
        self.model.fit(x,y)
    
    def predict(self,x_pred,model_id):
        client = MongoClient()
        db=client.mydb
        cursor = db.find_one({'_id': model_id})
        print(cursor)
        y=self.model.predict(x_pred)
        return y

    
    def save(self):
        name1=self.name_of_file
        pickle_name=str(name1)+'.pkl'
        pickle_obj = open(pickle_name, 'wb')
        pickle.dump(self.model, pickle_obj)
        print("Pickle file created with name: "+pickle_name)
        return
    
    def delete(self):
        os.remove(os.path.join(os.getcwd(),str(self.name)+'.pkl'))
        print("File deleted")
        return 0




if __name__=="__main__":
    x=[[0, 0], [1, 1], [2, 2]]
    y=[0,1,2]
    first_try=linear_regression()
    first_try.train("linearregression")

'''
    #Linear Regression
    first_try=linear_regression("first_model",fit_intercept=True, normalize=False, copy_X=True, n_jobs=1)
    first_try.create()
    first_try.fit(x,y)

    #Define predicton values
    x_pred=[[3,3],[4,4],[2,2]]
    y_pred=first_try.predict(x_pred)

    print(y_pred)
    #save model (optional)
    first_try.save()
    
    # delete model
    #first_try.delete()

    # Fetching from old data
    first_try.fetch()
    print(first_try.attr())
    print(first_try.score(x,y_pred))

    # predicting accuracy
    val_x=[[3,3],[5,5],[8,8],[9,9]]
    val_y=[3,5,8,3]
    #Validation accuracy
    print(first_try.accuracy(val_x,val_y))

'''