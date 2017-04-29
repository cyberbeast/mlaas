###############################################################################
# Author: Abhimanyu Banerjee
# Project: Machine Learning as a Service
# Date Created: 3/3/2017
#
# File Description: This script implements the data container template for the 
# purpose of loading both predefined and user defined datasets.
###############################################################################

from __future__ import print_function
from data_containers.data_container import DataContainer
from utils.gen_utils import load_pkl, save_pkl
from os.path import exists, join
import pdb
import numpy as np
import pandas as pd

class DataLoader(DataContainer):

    '''loads data from user's directory. Params: [], Returns: '''
    def load_user_data(self, data_path):
        
        #TODO: check for path name corruption
        return load_pkl(data_path)

    '''save data in user's directory. Params: [], Returns: '''
    def save_user_data(self, data_path, data):
        
        #TODO: define template for path for data storage
        assert exists(data_path), "\nData directory does not exist"
        
        path = join(data_path, "data_samples")
        save_pkl(data, path)
        return path
