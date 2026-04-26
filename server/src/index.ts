import app from "./server";
import connectToDatabase from "./database/mongodb";

import { PORT } from "./config/env";





app.listen(PORT, async () => {
    
  console.log(`Server is running on port http://localhost:${PORT}`);
  await connectToDatabase();
});
