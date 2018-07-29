trap "pkill -f coding_test_python_api && pkill -f coding_test_node && pkill -f coding_test_react" EXIT

# Install python and pip not already installed
sudo apt update && 
sudo apt install python2.7 python-pip;

echo "Installing Flask";
sudo pip install Flask;

echo "Start Python app";
cd api && 
bash -c "exec -a coding_test_python_api python api.py&"

cd ../node-server &&
npm install &&
bash -c "exec -a coding_test_node npm start&"
cd ../api_test_app &&
bash -c "exec -a coding_test_react npm start"
# cd ./
wait