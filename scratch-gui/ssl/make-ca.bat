rem https://http2.try-and-test.net/openssl_simple_ca.html

call make-set.bat

rem --- ca.pem : root certification ---

openssl genrsa -out ca.key %DES3% 2048
openssl req  -new -x509 -key ca.key -sha256  -days 1825 -extensions v3_ca  -out ca.pem -subj "/C=%C%/ST=%ST%/O=%O%/CN=%CN% CA"
openssl x509 -in ca.pem -out ca.pem
openssl x509 -noout -text -in ca.pem > ca.pem.txt
copy ca.pem ca.pem.cer

rem --- inca.pem : root certification ---

openssl genrsa -out inca.key %DES3% 2048
openssl req -new -key inca.key -sha256 -outform PEM -keyform PEM -out inca.csr  -subj "/C=%C%/ST=%ST%/O=%O%/CN=%CN% Inter CA"
openssl req -noout -text -in inca.csr > inca.csr.txt

echo [ v3_ca ]>inca.cnf
echo basicConstraints = CA:true, pathlen:0>>inca.cnf
echo keyUsage = cRLSign, keyCertSign>>inca.cnf
echo nsCertType = sslCA, emailCA>>inca.cnf
openssl x509 -extfile inca.cnf -req -in inca.csr -sha256 -CA ca.pem -CAkey ca.key -set_serial 01  -extensions v3_ca  -days 1825 -out inca.pem

