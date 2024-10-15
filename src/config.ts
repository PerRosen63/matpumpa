interface AppConfig {
  baseUrl: string;
  consumerKey: string;
  consumerSecret: string;
}

const config: AppConfig = {
  baseUrl: import.meta.env.VITE_BASE_URL,
  consumerKey: import.meta.env.VITE_CONSUMER_KEY,
  consumerSecret: import.meta.env.VITE_CONSUMER_SECRET,
};

export default config;
