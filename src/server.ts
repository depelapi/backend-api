import app from './app';
import config from './config/config';

const PORT = process.env.PORT || config.port || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
