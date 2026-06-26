// import { type ValidationError } from "../types/auditEvent.js";

// const validateAuditEvent = (body): ValidationError[] => {
//     const errors: ValidationError[] = []

//     const data = body as Record<string, unknown>
//     const requiredFields = [
//  "actor_id",
//   "action",
//   "resource_type",
//   "resource_id"
// ]

// for(const field of requiredFields){
//     if(data[field] === undefined || data[field] === null){
//         errors.push(data[field])
//     }
// }
//     if(!data.actor_id || !data.action || )
//     if(data.actor_id !== undefined){
//         if(typeof data.actor_id !== "string")
//     }

// };
