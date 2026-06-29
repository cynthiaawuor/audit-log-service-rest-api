import type { NextFunction, Request, Response } from "express";
import type { ZodError, ZodType } from "zod";

// type ValidationError = {
//   field: string;
//   message: string;
//   code: string;
// };

// function zodErrors(error: ZodError): ValidationError[] {
//   return error.issues.map((err) => {
//     const message = err.message;
//     const field = err.path.join(".");
//     const code = err.code;
//     return { field, message, code };
//   });
// }
export const validateAuditEvent = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsedBody = schema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({
        errors: parsedBody.error.issues.map((issue) => {
          return {
            field: issue.path.join("."),
            message: issue.message,
          };
        }),
      });
    }
    req.body = parsedBody.data;
    next();
  };
};
