export interface AuditEvent {
  actor_id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  before_state?: string;
  after_state?: string;
  ip_address?: string;
  user_agent?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export type EventCreationPayload = Omit<AuditEvent, "id">;
