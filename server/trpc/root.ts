import { router } from "./trpc";
import { permitRouter } from "./routers/permit";

export const appRouter = router({
    permit: permitRouter,
});

export type AppRouter = typeof appRouter;
