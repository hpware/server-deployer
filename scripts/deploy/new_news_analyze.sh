echo "Deploying news.yuanhau.com"
sleep 1
cd /deploy/applications/news-analyze
echo "Building..."
docker compose build
echo "Deploying..."
docker-compose up -d --scale newsanalyze-service=2 --remove-orphans
sleep 4
echo "Killing old version..."
docker-compose up -d --scale newsanalyze-service=1
