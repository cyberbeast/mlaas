from __future__ import print_function
#from data_container import DataContainer
from utils.gen_utils import load_pkl, save_pkl
from os.path import exists, join
import pandas as pd
import numpy as np
import pdb

class DataProcessor:

    #Get file path from user 
    def process(self, dump_path, csv_path):

        full_data=pd.read_csv(csv_path)
        features = full_data.drop(labels=full_data.columns.values[-1], axis=1)
        labels=full_data.iloc[:,-1]

        save_pkl({"features" : features.as_matrix(),"labels": labels.as_matrix()}, dump_path)
        print("\nPickle file created with name: " + pickle_name)        

    '''
    def load(self):
        pkl_file = open(os.path.join(os.getcwd(),"test"+'.pkl'), 'rb')
        x,y = pickle.load(pkl_file)
        print("New model Loaded")
        print(x)
        print(y)
    

'''
