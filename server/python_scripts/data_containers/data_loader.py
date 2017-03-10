###############################################################################
# Author: Abhimanyu Banerjee
# Project: Machine Learning as a Service
# Date Created: 3/3/2017
#
# File Description: This script serves to load or save different kinds of data
# - user-specified data, predefined datasets, or community (shared) datasets
###############################################################################

from __future__ import print_function

from utils.gen_utils import load_pkl, save_pkl
from config.global_parameters import data_path

import pdb

class DataLoader:

    '''loads data from user's directory. Params: [], Returns: '''
    def load_user_data(self, data_dir, fname):
        
        return load_pkl(data_dir, fname)

    '''save data in user's directory. Params: [], Returns: '''
    def save_user_data(self, data):
        
        save_pkl(data, data_path, "data_samples.p")
