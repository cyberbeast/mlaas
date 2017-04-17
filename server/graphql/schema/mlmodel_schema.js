const mlModel = `
  type mlModel {
    name: String
    type: String
    train_status: String
    deploy_status: String
    data_path: String
    description: String
    created_at: String
    updated_at: String
  }
`

export default () => [
  mlModel
]
