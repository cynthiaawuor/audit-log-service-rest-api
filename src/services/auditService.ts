import { and, count, eq, gte, lte, or } from "drizzle-orm";
import { db } from "../db/connection.js";
import { audits } from "../db/schema.js";
import type { InsertAuditEvent } from "../db/zodSchema.js";

export const createAuditEvent = async (data: InsertAuditEvent) => {
  const { actor_id, action, resource_type, resource_id } = data;

  const auditEvent: InsertAuditEvent = {
    actor_id,
    action,
    resource_type,
    resource_id,
  };
  const event = await db.insert(audits).values(auditEvent).returning();
  return event;
};

export const getAuditEvents = async (queryParams: Record<string, string>) => {
  try {
    const {
      actor_id,
      actions,
      resource_type,
      resource_id,
      from,
      to,
      limit,
      page,
    } = queryParams;
    const dateRanges = [];
    const _limit = Number(limit) || 10;
    const _page = (Number(page) || 1) - 1;

    const offset = _page * _limit;

    let fromDate: Date | null = null;
    if (from) {
      const parsedFrom = new Date(from);
      // .getTime() returns NaN for Invalid Dates
      if (!isNaN(parsedFrom.getTime())) {
        fromDate = parsedFrom;
      }
    }

    let toDate: Date | null = null;
    if (to) {
      const parsedTo = new Date(to);
      if (!isNaN(parsedTo.getTime())) {
        toDate = parsedTo;
      }
    }

    if (toDate) {
      dateRanges.push(lte(audits.timestamp, toDate));
    } else if (fromDate) {
      dateRanges.push(gte(audits.timestamp, fromDate));
    } else if (fromDate && toDate) {
      dateRanges.push(lte(audits.timestamp, toDate));
      dateRanges.push(gte(audits.timestamp, fromDate));
    }

    const actors =
      actor_id?.split(",").map((actor) => eq(audits.actor_id, actor)) ?? [];
    const _actions =
      actions?.split(",").map((action) => eq(audits.action, action)) ?? [];
    const _resource_type =
      resource_type
        ?.split(",")
        .map((resource) => eq(audits.resource_type, resource)) ?? [];
    const _resource_id =
      resource_id
        ?.split(",")
        .map((resource) => eq(audits.resource_id, resource)) ?? [];
    const events = await db
      .select()
      .from(audits)
      .where(
        and(
          or(...actors),
          or(..._actions),
          or(..._resource_type),
          or(..._resource_id),
          ...dateRanges,
        ),
      )
      .offset(offset)
      .limit(_limit);
    const [{ total }] = await db
      .select({ total: count() })
      .from(audits)
      .where(
        and(
          or(...actors),
          or(..._actions),
          or(..._resource_type),
          or(..._resource_id),
          ...dateRanges,
        ),
      );
    return {
      data: events,
      meta: {
        limit: _limit,
        page: _page + 1,
        total,
        totalPages: Math.ceil(total / _limit),
      },
    };
  } catch (e) {
    throw e;
  }
};

export const getEventById = async (id: string) => {
  try {
    const event = await db.query.audits.findFirst({
      where: eq(audits.id, parseInt(id)),
    });
    return event;
  } catch (e) {
    throw e;
  }
};

export const createBulkEvents = async (data: InsertAuditEvent[]) => {
  return await db.insert(audits).values(data).onConflictDoNothing().returning();
};
