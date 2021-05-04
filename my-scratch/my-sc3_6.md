# My Scratch 3.0 を作る（その6）

- [その1](./my-sc3_1.md)：scratch-gui をインストールする
- [その2](./my-sc3_2.md)：scratch-gui をカスタマイズする
- [その3](./my-sc3_3.md)：httpsで起動できるようにする
- [その4](./my-sc3_4.md)：httpsで使う自己証明書を作る
- [その5](./my-sc3_5.md)：参考）chromebookでの認証局の取り込み
- その6：nginxでscratch-guiとwebsocketサーバーを統合する

<hr>

scratch-guiとwebsocketサーバーを統合したサイト環境を作ります。

```
【ブラウザ】　→→→　nginx（C:\nginx-1.19.10）

　　https://server/scratch/　→→→→→→　scratch-gui
　　　　　　　　　　　　　　　　　　　　（C:\scratch-gui）
　　　　　　　　　　　　　　　　　　  　http://127.0.0.1:8601/

　　https://server/homeroom/wss/　→　homeroom (http server)
　　　　　　　　　　　　　　　　　　　　（C:\sc3\homeroom\wss）
　　　　　　　　　　　　　　　　　　　　http://127.0.0.1:8080/wss/

　　wss://server/homeroom/　→→→→→→→　homeroom (websocket server)
　　　　　　　　　　　　　　　　　　　　（C:\sc3\homeroom）
　　　　　　　　　　　　　　　　　　　　ws://127.0.0.1:8080/
```

<hr>

## 6-1 nginxをインストールする

- http://nginx.org/en/download.html から利用するnginx（nginx/Windows-1.19.10）をダウンロードして展開します。<br>
ここでは、「`C:\nginx-1.19.10`」に展開したとしています。

- `c:\sc3\scratch-gui\ssl`フォルダを`C:\nginx-1.19.10`にコピーします。<br>
コピーする前に自己証明書は「[その4](./my-sc3_4.md)」で作っておいてください。　 

- ‘このフォルダ下にある「nginx.conf.txt」の「`##{{`」と「`##}}`」で囲まれた箇所を参考に`C:\nginx-1.19.10\conf\nginx.conf`を修正します。

<hr>

## 6-2 homeroom (https/websocketサーバー)を起動する

- 以下のコマンドで homeroom (https/websocketサーバー) を起動します。

    ```
    cd /d c:\sc3\homeroom
    node server.js
    ```

<hr>

## 6-3 scratch-guiを起動する

- 3-1、3-2で修正した内容を変更します。

    `C:\scratch-gui\webpack.config.js` のhttps部分をコメントアウト（前に`//`を記述）します。

    ```
              disableHostCheck: true,
    //        https: {
    //            key: fs.readFileSync('ssl/server.key'),
    //            cert: fs.readFileSync('ssl/server.pem'),
    //            ca: fs.readFileSync('ssl/inca.pem')
    //        },
    ```

    起動用バッチのポート指定をコメントアウト（前に`rem`を記述）します。

    ```
    cd /d C:\scratch-gui
    rem set PORT=443
    set NODE_BLE=webbluetooth
    npm start
    ```

- 修正した起動用バッチで、scratch-gui を起動します。

<hr>

## 6-4 nginxを起動する

- 以下のコマンドで nginx を起動します。

    ```
    cd /d c:\nginx-1.19.10
    start nginx
    ```

- nginx の停止は、以下のコマンドでできます。

    ```
    cd /d c:\nginx-1.19.10
    nginx -s stop
    ```

<hr>

## 6-5 ブラウザから scratch-gui を開く

⇒　https://localhost/scratch/

- scratchのエディタが表示されれば正しく動作しています。

<hr>

## 6-6 ブラウザから homeroom (httpサーバー)を開く

⇒　https://localhost/homeroom/wss/server.html

- 上段に「R1」 ~ 「R9」の文字列が表示されれば正しく動作しています。


⇒　https://localhost/homeroom/wss/client.html

- server.htmlを開いたときに右上に表示されているPINの文字列（4文字）をPINのフィールドに入力して \[join\]ボタンをクリックして入室できれば正しく動作しています。<br>
このとき、server.htmlの表示に入室者の情報が反映されています。

<hr>

～　おわり　～