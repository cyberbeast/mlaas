from __future__ import print_function
from data_containers.data_loader import DataLoader
#from utils.gen_utils import load_pkl, save_pkl
from config.global_parameters import data_path
from os.path import exists, join
import pandas as pd
import numpy as np
import pdb

class DataProcessor:

    #Get file path from user 
    def process_user_data(self, csv_path):

        #init the dataloader 
        data_loader = DataLoader()

        full_data=pd.read_csv(csv_path)
        #pdb.set_trace()
        target_col = full_data.columns.values[-1]
        features = full_data.drop(labels=full_data.columns.values[-1], axis=1)
        labels=full_data.iloc[:,-1]

        #TODO: replace with standard format
        pickle_name = 'test1.p'

        data_loader.save_user_data({"features": features.as_matrix(), \
                                    "labels": labels.as_matrix()})        
        

    def split_data(self, data, split):
        pass
