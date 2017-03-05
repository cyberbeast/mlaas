###############################################################################
# Author: Abhimanyu Banerjee
# Project: Machine Learning as a Service
# Date Created: 2/28/2017
#
# File Description: This script serves as an interface for various data
# processing and related tasks required for smooth functioning of the model 
# containers.
###############################################################################

from __future__ import print_function
from abc import ABCMeta, abstractmethod

class DataContainer(metaclass=ABCMeta):
    
    '''load user data: fetch the data from the user's storage'''
    @abstractmethod
    def load_user_data(self, data_path):
        pass
    
    '''save_data: store the data passed as input in path defined by user's
    storage'''
    @abstractmethod
    def save_user_data(self, data):
        pass
    
