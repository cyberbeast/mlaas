###############################################################################
# Author: Abhimanyu Banerjee
# Project: Machine Learning as a Service
# Date Created: 2/28/2017
#
# File Description: This script is a collection of handy functions that may be
# required anywhere in the framework, but not a part of its design specifications
###############################################################################

from __future__ import print_function
from pickle import load, dump

'''loads a pickle from a specified path'''
def load_pkl(path, verbose=False):

    try:
        data = load(path)
    except (OSError, IOError) as io_e:
        print("\nPath to data is incorrect. Raised the following exception:\
                \n{}".format(io_e))
    except Exception as e:
        print("\nThe following exception was raised:\n{}"format(e))
    
    if verbose:
        print("\nData loaded successfully from {}".format(path))

    return data

'''saves the data at the specified path'''
def save_pkl(data, path, verbose=False):
    
    try:
        data = dump(data, path)
    except Exception as e:
        print("\nThe following exception was raised:\n{}".format(e))
    
    if verbose:
        print("\nData was successfully saved at {}".format(path))
