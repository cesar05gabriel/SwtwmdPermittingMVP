import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const permitRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        userName: z.string().min(1),
        address: z.string().min(1),
        city: z.string().min(1),
        state: z.string().min(2).max(2),
        zip: z.string().min(1),
        permit_type: z.string().min(1),
        county: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
        // Map frontend keys to DB fields
        const created = await ctx.prisma.user_permit.create({
          data: {
            name: input.userName,
            address: input.address,
            city: input.city,
            state: input.state,
            zipCode: input.zip,
            permitType: input.permit_type,
            county: input.county,
          },
        });

        return {
          id: created.id,
          message: "Created",
        };
    }),
});
