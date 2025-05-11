echo "Deploying news.yuanhau.com"
sleep 1
cd /deploy/applications/news-analyze
echo "Pulling from git repo"
git pull
echo "Building..."
docker compose build
echo "Deploying..."
docker compose down
docker compose up -d
