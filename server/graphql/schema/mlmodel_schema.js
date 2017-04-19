const mlModel = `
  type mlModel {
    _id: String
    name: String
    type: String
    train_status: String
    deploy_status: String
    data_path: String
    description: String
    created_at: String
    updated_at: String
  }

  extend type RootQuery {
    getUserModels: [mlModel]
    getUserModelById(id: String!): mlModel
  }

  extend type Mutation {
    createNewModel(newModel: newModel!): String
  }

  input newModelParameters {
    alpha: Float
  }

  input newModel {
    name: String
    description: String
    type: String
    parameters: newModelParameters
  }
`

export default () => [
  mlModel
]
