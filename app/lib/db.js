// Simple in-memory store for demonstration purposes
// Bind to global to prevent Next.js dev server from resetting it on hot-reload or across API routes
const fakeDatabase = global.fakeDatabase || new Map();
if (process.env.NODE_ENV !== 'production') global.fakeDatabase = fakeDatabase;
export { fakeDatabase };
