rem https://http2.try-and-test.net/openssl_simple_ca.html

call make-set.bat

rem --- ca.pem : server certification ---

openssl genrsa -out server.key %DES3% 2048
openssl req -new -key server.key -outform PEM -keyform PEM -sha256 -out server.csr -subj "/C=%C%/ST=%ST%/L=%L%/O=%O%/OU=%OU%/CN=%CN%"
openssl req -noout -text -in server.csr > server.csr.txt

echo subjectAltName = DNS:localhost, DNS:%HN%, DNS:*.%CN%, IP:127.0.0.1, IP:%IP%> server.san
openssl x509 -req -in server.csr -sha256 -CA inca.pem -CAkey inca.key -set_serial 01 -days 730 -out server.pem  -extfile server.san
openssl x509 -noout -text -in server.pem > server.pem.txt
copy server.pem server.pem.cer

type server.pem >server+inca.pem
type inca.pem  >>server+inca.pem

pause
