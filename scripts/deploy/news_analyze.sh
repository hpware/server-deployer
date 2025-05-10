echo "Deploying news.yuanhau.com"
sleep 1
cd /deploy/applications/news-analyze
echo "Building..."
docker compose build
echo "Deploying..."
docker compose up -d
