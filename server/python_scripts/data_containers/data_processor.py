from __future__ import print_function
from data_containers.data_loader import DataLoader
from config.global_parameters import data_path

from sklearn.model_selection import train_test_split
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
        

    def split_data(self, dataset, split, trainset_only=False):
        
        trainset_feats, rem_feats, 
        trainset_labels, rem_labels = train_test_split(dataset['features'], 
                                        dataset['labels'], train_size=split[0])
        
        if not trainset_only:
        
            test_lim = (1-split[0])*1./split[1]
            valset_feats, testset_feats,
            valset_labels, testset_labels = train_test_split(rem_feats, rem_labels,
                                            test_size=test_lim)
        
            return trainset_feats, trainset_labels, valset_feats, valset_labels,
                    testset_feats, testset_labels

        return trainset_feats, trainset_labels
