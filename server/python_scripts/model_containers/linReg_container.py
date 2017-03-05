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
        #client = MongoClient()
        #db=client.mydb
        #cursor = db.find_one({'_id': model_id})
        #print(cursor)
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
    first_try.train("insert_model_id")
    #y=first_try.predict([[3,3],[4,4],[2,2]],"insert_model_id")
    #print(y)

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
