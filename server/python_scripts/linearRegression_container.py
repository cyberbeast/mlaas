import numpy as np
import pandas as pd
from sklearn import datasets
from sklearn.linear_model import LinearRegression
import pickle
import os

class linear_regression:
    model=0
    def __init__(self,name,fit_intercept=True,normalize=False,copy_X=True,n_jobs=1):
        self.name=name
        #Following parameters will be changed later
        self.intercept=fit_intercept
        self.normalize=normalize
        self.copy_x=copy_X
        self.n_jobs=n_jobs

    def fetch(self):
        pkl_file = open(os.path.join(os.getcwd(),str(self.name)+'.pkl'), 'rb')
        self.model = pickle.load(pkl_file)
        print self.model.coef_
        print "New model Loaded"
        return 0

    def create(self):
        self.model=LinearRegression(copy_X=self.copy_x,fit_intercept=self.intercept,normalize=self.normalize,n_jobs=self.n_jobs)
        self.save()
        return 0


    def fit(self,x,y):
        pkl_file = open(os.path.join(os.getcwd(),str(self.name)+'.pkl'), 'rb')
        self.model = pickle.load(pkl_file)
        self.model.fit(x,y)
        return "Train Accuracy"
    
    def predict(self,x_pred):
        y=self.model.predict(x_pred)
        return y
    
    def save(self):
        name1=self.name
        pickle_name=str(name1)+'.pkl'
        pickle_obj = open(pickle_name, 'wb')
        pickle.dump(self.model, pickle_obj)
        print("Pickle file created with name: "+pickle_name)
        return 0
    

    def delete(self):
        os.remove(os.path.join(os.getcwd(),str(self.name)+'.pkl'))
        print "File deleted"
        return 0




if __name__=="__main__":
    x=[[0, 0], [1, 1], [2, 2]]
    y=[0,1,2]

    #Linear Regression
    first_try=linear_regression("first_model",fit_intercept=True, normalize=False, copy_X=True, n_jobs=1)
    first_try.create()
    first_try.fit(x,y)

    #Define predicton values
    x_pred=[[3,3],[4,4]]
    y_pred=first_try.predict(x_pred)

    print y_pred
    #save model (optional)
    first_try.save()
    
    # delete model
    #first_try.delete()

    # Fetching from old data
    first_try.fetch()