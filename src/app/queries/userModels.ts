import gql from 'graphql-tag';

export var userModelsQuery = gql`
  query userModelQuery {
    getUserModels{
      _id
      name
      type
      parameters {
        alpha
      }
      train_status
      deploy_status
      data_path
      description
      created_at
      updated_at
    }
  }
`
export var userModelByIdQuery = gql`
  query userModelByIdQuery($modelid: String!) {
    getUserModelById(id: $modelid){
      _id
      name
      type
      parameters {
        alpha
      }
      train_status
      deploy_status
      data_path
      description
      created_at
      updated_at
    }
  }
`

export var createNewModelMutation = gql`
  mutation createNewModel($model: newModel!){
    createNewModel(newModel: $model)
  }
`

export var deleteModelByIdMutation = gql`
  mutation deleteModelById($id: String!){
    deleteModelById(id: $id)
  }
`

interface parameters {
  alpha
}
export interface userModelsQueryResponse {
  _id
  name
  type
  parameters: parameters
  train_status
  deploy_status
  data_path
  description
  created_at
  updated_at
}
