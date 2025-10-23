import app from "./app";
import config from "./config";

const server = app.listen(config.port, () => console.log(`Server running on port ${config.port}`));

process.on('unhandledRejection', err => {
    console.log(`Error: ${(err as any).message}`);
    console.log('Shutting down the server due to Unhandled promise rejection.');
    server.close( () => {
        process.exit(1);
    }) 
});