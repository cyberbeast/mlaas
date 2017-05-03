from __future__ import print_function
from node_builder import Node
import keras.models
import keras
from keras.optimizers import RMSprop,SGD
class GraphBuilder:
    model=0
    def __init__(self,params):
        self.layers=params   #Pass parameter from above
        self.input_dim=0
        self.output_dim=0
        self.graph = None
        self.build()
    def build(self):
        
        #Creates the Input and Activation layers
        architecture=self.layers["arch"]
        input_ = Node(architecture["layers"][0])
        prev_layer = input_.node
        for i in architecture["layers"][1:-1]:
            layer=Node(i)
            prev_layer = layer.node(prev_layer)
        output_ = Node(architecture["layers"][-1])
        prev_layer=output_.node(prev_layer)
        # Fitting the loss function and compiling 
        loss=self.layers["loss"]
        if loss['optimizers']=='sgd':
            opti_val = SGD(lr=loss['learning_rate'])
        elif loss['optimizers']=='rms':
            opti_val = RMSprop(lr=loss['learning_rate'])
        print(loss["name"])
        print(prev_layer)
        model = keras.models.Model(input = input_.node, output = prev_layer)
        model.compile(loss = loss["name"],optimizer = opti_val)
        print(model.summary())