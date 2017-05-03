'''
Container to create Neural Networks
'''

#Deep Learning Imports
from __future__ import print_function

from keras.layers import *
import keras.models
import keras.preprocessing.text
import keras.preprocessing.sequence
import tensorflow as tf
from keras.layers import Input, Embedding, LSTM, Dense
from keras.models import Sequential
from keras.optimizers import RMSprop,SGD
import random,json,string
import keras.callbacks





class Node:
    input_dim=0
    model=0

    def __init__(self,parameters):
        self.node = None
        if parameters['name']=='input':
            self.node = Input(batch_shape=(None,parameters['dims']), name = "input")
        elif parameters['name']=='act':
            self.node = Dense(parameters['dims'], activation=parameters['activation'])
