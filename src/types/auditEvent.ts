export interface AuditEvent {
  actor_id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  before_state?: unknown;
  after_state?: unknown;
  ip_address?: string;
  user_agent?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}
