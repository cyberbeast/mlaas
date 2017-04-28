###############################################################################
# Author: Abhimanyu Banerjee
# Project: Machine Learning as a Service
# Date Created: 3/4/2017
#
# File Description: This script serves as a task manager for coordinating the
# model container related jobs.
###############################################################################

from __future__ import print_function
import argparse
# from model_containers import svm_container,linReg_container
from model_containers import linReg_container
from config.global_parameters import data_path
from data_containers import data_processor
from pymongo import MongoClient
from bson.objectid import ObjectId

'''define a dict mapping for dealing with which model container to activate
depending on ___ '''
def type_to_model_mapper(model_type):

    model_switcher = {
        'svm': lambda: svm_container.SVMContainer(),
        'linear_reg': lambda: linReg_container.linRegContainer() #TODO: verify if correct name
    }

    #get the correct model container object creating function
    model_builder = model_switcher.get(model_type, lambda: print('Invalid model type'))
    #build the model
    return model_builder()

'''access db for document related to given model id, checks type of container,
creates object for corresponding container and calls the relevant method while
passing the model id to it'''
def train_model(model_id):

    try:
        #create connection to server
        client = MongoClient('ds119250.mlab.com', 19250)
        db = client['mydb1']
        db.authenticate('gautam678', 'gautam678')
        collection = db.mlaas
        model_cont = collection.find_one({"_id": ObjectId(model_id)})
        assert model_cont, "Invalid model ID"
        model_type = model_cont['type']

        model = type_to_model_mapper(model_type)
        model.train(model_id)

    except ConnectionFailure as conn_e:
        print("\nCould not connect to server. \
                Raised the following exception:\n{}".format(conn_e))

''' call relevant methods to extract data from user-uploaded file and pickle it'''
def process_data(data_path):
    dataprocessor=data_processor.DataProcessor()
    dataprocessor.process(data_path)


if __name__ == "__main__":

    #configure the flags for working on this script
    #TODO: figure out defaults for the different optional parameters
    parser = argparse.ArgumentParser()
    parser.add_argument('--task', help='determine which task model container must perform')
    parser.add_argument('--model_id', help='model id for querying the db')
    parser.add_argument('--file_path', help='path to data file uploaded by user')

    args = parser.parse_args()

    if args.task == 'train':
        assert args.model_id, 'Model ID must be specified'
        train_model(args.model_id)

    elif args.task == 'process data':
        assert args.file_path, "Path to data file must be specified"
        process_data(args.file_path)
