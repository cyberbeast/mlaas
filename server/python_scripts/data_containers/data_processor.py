from __future__ import print_function
#from data_container import DataContainer
from utils.gen_utils import load_pkl, save_pkl
from config.global_parameters import data_path
from os.path import exists, join
import pandas as pd
import pdb

class DataProcessor:

    #Get file path from user 
    def process(self, csv_path):

        full_data=pd.read_csv(csv_path)
        #pdb.set_trace()
        features = full_data.drop(labels=full_data.columns.values[-1], axis=1)
        labels=full_data.iloc[:,-1]

        pickle_name = 'test1.p'
        
        save_pkl({"features":features,"labels":labels}, join(data_path,pickle_name))
        print("Pickle file created with name: "+pickle_name)        

    '''
    def load(self):
        pkl_file = open(os.path.join(os.getcwd(),"test"+'.pkl'), 'rb')
        x,y = pickle.load(pkl_file)
        print("New model Loaded")
        print(x)
        print(y)
    

'''
