const ModelMetrics = `
  type ModelMetrics {
    mean_squared_error: String
    mean_absolute_error: String
  }

  extend type mlModel {
    metrics: ModelMetrics
  }
`
export default () => [ModelMetrics]
