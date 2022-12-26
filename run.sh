git clone https://github.com/Leeon123/golang-httpflood ~/flo
wget https://go.dev/dl/go1.19.4.linux-amd64.tar.gz -O ~/gol

tar -xzf ~/gol
~/go/bin/go build ~/flo/httpflood.go
./httpflood
