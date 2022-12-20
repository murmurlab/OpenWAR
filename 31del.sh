ps aux | grep 31.sh | cut -d ' ' -f 10 | xargs -n1 kill -9
