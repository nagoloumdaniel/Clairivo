import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: Boolean(process.env.SENTRY_DSN),
  sendDefaultPii: false,
  tracesSampleRate: 0.1,
  beforeSend(event) {
    if (event.user) event.user = { id: event.user.id };
    delete event.request?.cookies;
    delete event.request?.headers;
    return event;
  },
});
