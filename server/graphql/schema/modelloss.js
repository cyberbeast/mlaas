const ModelLoss = `
  type ModelLoss {
    mean_squared_error: String
    mean_absolute_error: String
  }

  extend type mlModel {
    loss: ModelLoss
  }
`
export default () => [ModelLoss]
