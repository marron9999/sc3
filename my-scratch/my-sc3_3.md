# My Scratch 3.0 を作る（その3）

- [その1](./my-sc3_1.md)：scratch-gui をインストールする
- [その2](./my-sc3_2.md)：scratch-gui をカスタマイズする
- その3：httpsで起動できるようにする
- [その4](./my-sc3_4.md)：httpsで使う自己証明書を作る
- [その5](./my-sc3_5.md)：参考）chromebookでの認証局の取り込み
- [その6](./my-sc3_6.md)：nginxでscratch-guiとwebsocketサーバーを統合する

<hr>

## 3-1 scratch-guiをhttpsで起動できるようにする

- `webpack.config.js.txt` に記述されているマージ箇所を `webpack.config.js` に組み込み保存します。

<hr>

## 3-2 起動用バッチを作る

注）「3-1」の修正を実施しない場合は、「PORT=80」となります。

例）【windows】 `server.bat`

```
cd /d c:\scratch-gui
set PORT=443
set NODE_BLE=webbluetooth
npm start
```

例）【linux】 `server.sh`

```
#!/bin/bash
cd ~/scratch-gui
export PORT=443
export NODE_BLE=webbluetooth
npm start
```

<hr>

## 3-3 chromeで Scratch を開く

(1) 「3-1」の修正を実施している場合

起動用バッチを起動し、chromeで `https://localhost` を開きます。

- 別PCでscratch-guiを起動した場合は、<br>
`https://マシン名` または `https://IPアドレス` を開きます。

このとき、証明書の警告がでるので、[詳細設定]ボタンをクリックし、[アクセスする]のリンクをクリックします。

- chromeでWeb-Bluetoothを使用する場合、リモート接続（localhost以外へのアクセス）ではhttpsでのアクセスが必要になりますが、今回の設定では「証明書」を用意していないため、「CERT_AUTHORITY_INVALID」のエラーがでます。

- chromeでWeb-Bluetoothを使用するが、localhostでしかアクセスしない場合は、「3-1」の修正は不要です。(2)の方法で開いてください。

![](images/chrome1.png)

![](images/chrome2.png)

(2) 「3-1」の修正を実施していない場合

起動用バッチを起動し、chromeで `http://localhost` を開きます。

- 別PCでscratch-guiを起動した場合は、<br>
`http://マシン名` または `http://IPアドレス` を開きます。

<hr>

※ （[その4](./my-sc3_4.md)）に続く
