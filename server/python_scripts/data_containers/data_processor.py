from __future__ import print_function
#from data_container import DataContainer
from utils.gen_utils import load_pkl, save_pkl
from config import data_path
from os.path import exists, path
import pandas as pd

class DataProcessor:

    #Get file path from user 
    def process(self, data_path):
        full_data=pd.read_csv(data_path)
        cols = pd.read_csv(data_path, nrows=1).columns
        features = pd.read_csv(data_path, usecols=cols[:-1])
        labels=full_data.iloc[:,-1]
        name1="test"         #Need name for pickle file
        pickle_name=str(name1)+'.pkl'
        save_pkl({"features":features,"labels":labels},join(data_path,pickle_name))
        print("Pickle file created with name: "+pickle_name)        
    '''
    def load(self):
        pkl_file = open(os.path.join(os.getcwd(),"test"+'.pkl'), 'rb')
        x,y = pickle.load(pkl_file)
        print("New model Loaded")
        print(x)
        print(y)
    

'''