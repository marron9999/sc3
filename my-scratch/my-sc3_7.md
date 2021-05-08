# My Scratch 3.0 を作る（その6）

- [その1](./my-sc3_1.md)：scratch-gui をインストールする
- [その2](./my-sc3_2.md)：scratch-gui をカスタマイズする
- [その3](./my-sc3_3.md)：httpsで起動できるようにする
- [その4](./my-sc3_4.md)：httpsで使う自己証明書を作る
- [その5](./my-sc3_5.md)：参考）chromebookでの認証局の取り込み
- [その6](./my-sc3_6.md)：参考）\[WIN\] nginxでサーバーを統合する
- その7：参考）\[Linux\] nginxでサーバーを統合する

<hr>

【Linux : chromebook】

scratch-guiとwebsocketサーバーを統合したサイト環境を作ります。<br>
chromebookのlinux環境のポート転送として「8080」を事前に設定しておいてください。

```
【ブラウザ】　→→→　nginx

　　https://server:8080/scratch/　→→→→→→　scratch-gui
　　　　　　　　　　　　　　　　　　　　（~/scratch-gui）
　　　　　　　　　　　　　　　　　　  　http://127.0.0.1:8601/

　　https://server:8080/homeroom/wss/　→　homeroom (http server)
　　　　　　　　　　　　　　　　　　　　（~/homeroom\wss）
　　　　　　　　　　　　　　　　　　　　http://127.0.0.1:8602/wss/

　　wss://server:8080/homeroom/　→→→→→→→　homeroom (websocket server)
　　　　　　　　　　　　　　　　　　　　（~/homeroom）
　　　　　　　　　　　　　　　　　　　　ws://127.0.0.1:8602/
```

<hr>

## 6-1 nginxをインストールする

- 以下のコマンドで nginx をインストールします。

    ```
    sudo apt install nginx
    ```

- `~/sc3/scratch-gui/ssl`フォルダを`/etc/nginx/`にコピーします。<br>
コピーする前に自己証明書は「[その4](./my-sc3_4.md)」で作っておいてください。　 

- このフォルダ下にある「`nginx.conf.default.txt`」を `/etc/nginx/sites-available/`にコピーします。

- `default` を `default.org`に変名し、`nginx.conf.default.txt` を `default` に変名します。

- `sudo /usr/sbin/nginx -t` でエラーが出ないことを確認します。

<hr>

## 6-2 homeroom (http/websocketサーバー)を起動する

- server.js の中に書かれているポート番号 8080 を 8602 に変更します。

- 以下のコマンドで homeroom (http/websocketサーバー) を起動します。

    ```
    cd ~/homeroom
    node server.js
    ```

<hr>

## 6-3 scratch-guiを起動する

- 3-1、3-2で修正した内容を変更します。

    `~/scratch-gui/webpack.config.js` のhttps部分をコメントアウト（前に`//`を記述）します。

    ```
              disableHostCheck: true,
    //        https: {
    //            key: fs.readFileSync('ssl/server.key'),
    //            cert: fs.readFileSync('ssl/server.pem'),
    //            ca: fs.readFileSync('ssl/inca.pem')
    //        },
    ```

    起動用シェル(バッチ)のポート指定をコメントアウト（前に`#`を記述）します。

    ```
    #!/bin/bash
    cd ~/scratch-gui
    # export PORT=443
    export NODE_BLE=webbluetooth
    npm start
    ```

- 修正した起動用シェルで、scratch-gui を起動します。

<hr>

## 6-4 nginxを起動する

- 以下のコマンドで nginx を起動します。

    ```
    sudo /usr/sbin/nginx
    ```

- nginx の停止は、以下のコマンドでできます。

    ```
    sudo /usr/sbin/nginx -s stop
    ```

<hr>

## 6-5 ブラウザから scratch-gui を開く

⇒　https://localhost:8080/scratch/

- scratchのエディタが表示されれば正しく動作しています。

<hr>

## 6-6 ブラウザから homeroom (httpサーバー)を開く

⇒　https://localhost:8080/homeroom/wss/server.html

- 上段に「R1」 ~ 「R9」の文字列が表示されれば正しく動作しています。


⇒　https://localhost:8080/homeroom/wss/client.html

- server.htmlを開いたときに右上に表示されているPINの文字列（4文字）をPINのフィールドに入力して \[join\]ボタンをクリックして入室できれば正しく動作しています。<br>
このとき、server.htmlの表示に入室者の情報が反映されています。

<hr>

～　おわり　～