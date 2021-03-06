from __future__ import print_function
import argparse
from model_containers import linReg_container, svm_container, deep_container
from data_containers import data_processor
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from bson.objectid import ObjectId
from os.path import join
import json
import pdb

##Unpacking config.json
config = json.load(open('config.json'))
HOST_NAME, DB_NAME, COLL_NAME, WEIGHTS_FNAME = config["HOST_NAME"], config["DB_NAME"], \
                                                config["COLL_NAME"], 
USER_DATA_FNAME, data_path = config["WEIGHTS_FNAME"], config["USER_DATA_FNAME"], \
                                config["data_path"] 

'''define a dict mapping for dealing with which model container to activate
	depending on ___ '''
def type_to_model_mapper(model_type):

    model_switcher = {
        'svm': lambda: svm_container.SVMContainer(),
        'Linear Regression': lambda: linReg_container.linRegContainer(),
        'Deep Model': lambda: deep_container.DeepContainer()
    }

    #get the correct model container object creating function
    model_builder = model_switcher.get(model_type, lambda: print('Invalid model type'))
    #build the model
    return model_builder()

'''access db for document related to given model id, checks type of container,
creates object for corresponding container and calls the relevant method while
passing the model id to it'''
def train_model(model_id, data=None):

    try:
        #create connection to server
        client = MongoClient(HOST_NAME)
        db = client[DB_NAME]
        models = db[COLL_NAME]
        model_cont = models.find_one({"_id": ObjectId(model_id)})
        assert model_cont, "Invalid model ID"
        model_type = model_cont['type']

        #get the correct model object
        model = type_to_model_mapper(model_type)

        #train the model
        if data:
            model_cont = model.train(model_cont, user_data=data)
        else:
            model_cont = model.train(model_cont)

        #persist the updated metadata
        if model_cont:
            models.update({'_id': ObjectId(model_id)}, {'$set': model_cont}, upsert=False)
            return True
        else:
            return False

    except ConnectionFailure as conn_e:
        print("\nCould not connect to server. \
                Raised the following exception:\n{}".format(conn_e))
        return False

def predict_on_model(model_id, data):

    try:
        #create connection to server
        client = MongoClient(HOST_NAME)
        db = client[DB_NAME]
        models = db[COLL_NAME]
        model_cont = models.find_one({"_id": ObjectId(model_id)})
        assert model_cont, "Invalid model ID"
        model_type = model_cont['type']

        #get the correct model object
        model = type_to_model_mapper(model_type)

        #predict on test data
        predictions = model.predict(model_cont, data)

        #persist the updated metadata
        if predictions is not False:
            return predictions
        else:
            return False

    except ConnectionFailure as conn_e:
        print("\nCould not connect to server. \
                Raised the following exception:\n{}".format(conn_e))
        return False

''' call relevant methods to extract data from user-uploaded file and pickle it'''
def process_data(user_data_path):
    dataprocessor=data_processor.DataProcessor()
    dataprocessor.process(join(data_path, USER_DATA_FNAME), user_data_path)
    return False


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

    elif args.task == 'process_data':
        assert args.file_path, "Path to data file must be specified"
        process_data(args.file_path)
