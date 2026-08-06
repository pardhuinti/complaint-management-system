const { spawn } = require('child_process');
const net = require('net');

const isWindows = process.platform === 'win32';
const npmCommand = isWindows ? 'npm.cmd' : 'npm';

const findAvailablePort = (startPort = 5000, maxAttempts = 20) => {
  return new Promise((resolve, reject) => {
    const tryPort = (port, attempt) => {
      const server = net.createServer();
      server.unref();
      server.on('error', (error) => {
        if (error.code === 'EADDRINUSE' && attempt < maxAttempts) {
          tryPort(port + 1, attempt + 1);
        } else {
          reject(error);
        }
      });
      server.listen(port, () => {
        server.close(() => resolve(port));
      });
    };

    tryPort(startPort, 1);
  });
};

const start = async () => {
  const backendPort = await findAvailablePort();
  const env = {
    ...process.env,
    PORT: String(backendPort),
    VITE_API_PORT: String(backendPort),
  };

  const services = [
    { name: 'backend', args: ['run', 'dev:backend'] },
    { name: 'client', args: ['run', 'dev:client'] },
  ];

  const children = services.map(({ name, args }) => {
    const child = spawn(npmCommand, args, {
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: true,
      env,
    });

    child.on('exit', (code, signal) => {
      if (signal) {
        console.log(`[${name}] stopped with signal ${signal}`);
      } else {
        console.log(`[${name}] exited with code ${code}`);
      }

      if (code !== 0 && !process.exitCode) {
        process.exitCode = code ?? 1;
      }
    });

    return child;
  });

  const shutdown = () => {
    children.forEach((child) => {
      if (!child.killed) {
        child.kill('SIGINT');
      }
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
