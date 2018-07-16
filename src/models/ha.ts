export interface HAState {
  id: number
  type: string
}

export interface HAService {
  id: number
  type: string
  domain: string
  service: string
  service_data?: HAServiceData
}

interface HAServiceData {
  entity_id: string
}
