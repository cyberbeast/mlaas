const initStatusSchema = `
  type initStatus {
    cold_start: Boolean
    #last_changed_at: String
  }
`

export default () => [initStatusSchema]
