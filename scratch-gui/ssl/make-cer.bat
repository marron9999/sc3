set C=JP
set ST=shizuoka
set L=numazu
set O=hiroyuki
set OU=develop
set CN=my-scratch
set DNS1=localhost
set DNS2=*.%CN%

openssl genrsa -out server.key 2048
openssl req -batch -new -key server.key -out server.csr -subj "/C=%C%/ST=%ST%/L=%L%/O=%O%/OU=%OU%/CN=%CN%"
echo subjectAltName = DNS:%DNS1%, DNS:%DNS2%> server.san
openssl x509 -in server.csr -out server.cer -req -signkey server.key -days 73000 -sha256 -extfile server.san
openssl x509 -text -in server.cer -noout > server.cer.txt