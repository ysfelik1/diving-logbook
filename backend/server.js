import { createServer } from "http";
import app from "./app.js"; // Make sure app.js exists and is properly exported

const port = process.env.PORT || 3000;

// Pass the Express app as the request handler to createServer
const server = createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
