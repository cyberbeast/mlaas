from __future__ import print_function
from node_builder import Node
from keras.models import Model
from keras.optimizers import RMSprop,SGD

class GraphBuilder:

    def __init__(self, params):

        #Pass parameter from above
        self.params=params   
        self.graph = None
        
        #build the graph
        self.graph = self.__build__()
    
    def __build__(self):
        
        #extract the architecture
        arch = self.params["arch"]
        layers = arch["layers"]
        losses= self.params["loss"]

        #Creates the Input and Activation layers
        input_ = Node(layers[0])
        prev_layer = input_.node

        for layer in layers[1:-1]:

            curr_layer = Node(layer)
            prev_layer = curr_layer.node(prev_layer)
        
        output_ = Node(layers[-1])
        final_layer=output_.node(prev_layer)
        
        #TODO: use a switcher or separate class for loss mapping
        if loss['optimizers']=='sgd':
            opti_val = SGD(lr=losses['learning_rate'])
        
        elif loss['optimizers']=='rms':
            opti_val = RMSprop(lr=losses['learning_rate'])

        model = Model(input = input_.node, output = final_layer)
        model.compile(loss = losses["name"], optimizer = opti_val)

        return model

    def fit(self, X, Y, **kwargs):
        
        #TODO: unpack kwargs to get training specific params

        self.graph.fit(X, Y)
