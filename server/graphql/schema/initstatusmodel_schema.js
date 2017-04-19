const initStatusSchema = `
  type initStatus {
    cold_start: Boolean
    #last_changed_at: String
  }

  extend type RootQuery {
    getInitStatus: initStatus
  }
`

export default () => [initStatusSchema]
