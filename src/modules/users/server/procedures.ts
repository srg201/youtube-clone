import { db } from "@/db";
import { subscriptions, users, videos } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { eq, getTableColumns, inArray, isNotNull } from "drizzle-orm";
import { z } from "zod";

export const usersRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { userId: userIdToFetch } = input;
      const { clerkUserId } = ctx;

      let userId;

      const [user] = await db
        .select()
        .from(users)
        .where(inArray(users.clerkId, clerkUserId ? [clerkUserId] : []));

      if (user) {
        userId = user.id;
      }

      const viewerSubscriptions = db.$with("viewer_subscriptions").as(
        db
          .select()
          .from(subscriptions)
          .where(inArray(subscriptions.viewerId, userId ? [userId] : []))
      );

      const [reqUser] = await db
        .with(viewerSubscriptions)
        .select({
          ...getTableColumns(users),
          subscribersCount: db.$count(
            subscriptions,
            eq(subscriptions.creatorId, userIdToFetch)
          ),
          videosCount: db.$count(videos, eq(videos.userId, userIdToFetch)),
          viewerSubscribed: isNotNull(viewerSubscriptions.viewerId).mapWith(
            Boolean
          ),
        })
        .from(users)
        .leftJoin(
          viewerSubscriptions,
          eq(viewerSubscriptions.creatorId, users.id)
        )
        .where(eq(users.id, userIdToFetch));

      return reqUser;
    }),
});
