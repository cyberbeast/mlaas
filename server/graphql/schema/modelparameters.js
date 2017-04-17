const ModelParameters = `
  type ModelParameters {
    alpha: Float
  }

  extend type mlModel {
    parameters: ModelParameters
  }
`
export default () => [ModelParameters]
