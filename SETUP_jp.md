# scratch-desktopへの組み込み

## scratch-desktopのインストール

- https://github.com/llk/scratch-desktop をひらき、リリース 3.20.1 (zip)をダウンロードします。
- ダウンロードしたzipを適当なフォルダ(ここでは C:\sc3\scratch-desktop-3.20.1）に展開します。
- フォルダ(C:\sc3\scratch-desktop-3.20.1）をカレントフォルダにして、npm install またはnpm clean-install で必要なパッケージを組み込みます。
- npm start で scratch desktopが起動したら、次のステップに進んでください。

## scratch-desktopへの拡張機能の組み込み

- ４つのリポジトリ: sc3、sc3-mbitlink、sc3-mbituart、sc3-maqueen を git clone するか zip＆展開します。
- それぞれの scratch-vm、scratch-gui を、先のフォルダ\node_modules(C:\sc3\scratch-desktop-3.20.1\node_modules）下にコピーします。
- C:\sc3\scratch-desktop-3.20.1\node_modules\scratch-gui\src\lib\libraries\extensions フォルダを開き、index.jsx.txt を見て、index.jsx を編集・保存します。
編集箇所は２つです。
- C:\sc3\scratch-desktop-3.20.1\node_modules\scratch-vm\src\extension-support フォルダを開き、extension-manager.js.txt を見て、extension-manager.js を編集・保存します。
編集箇所は１つです。

## scratch-linkフォルダへのファイルのコピー

- scratch-lin (1.3.67.0) がインストールしていなければ、インストールしてください。

https://scratch.mit.edu/microbit

- sc3-mbitlinkのフォルダ下にある Scratch-mbitlink.exe を C:\Program Files (x86)\Scratch Linkフォルダにコピーします。
- コピーした Scratch-mbitlink.exe を起動します。

## micro:bitへのプログラムの転送

- リポジトリ: maqueen_hex を git clone するか zip＆展開します。
- microbit-ble_maqeen_v2.hex をmicro:bit V2に転送します。

## scratch-desktop の起動と確認

- フォルダ(C:\sc3\scratch-desktop-3.20.1）をカレントフォルダにして、npm start で scratch desktopを起動します。
- 左下の拡張機能をクリックして、一番上に３つの拡張機能: micro:bit linkフォルダ、mbituart、maqueen が表示されたらOKです。

- micro:bitのセンサーを使う場合は
	- mbitlink を組み込み、micro:bitを接続します。
	- mbituart を組み込み、ブロックを並べて動作するか確認します。


- maqueenを使う場合は
	- mbitlink を組み込み、micro:bitを接続します。
	- maqueen を組み込み、ブロックを並べて動作するか確認します。

## ブラウザ(chrome)からmaqueenを直接操作する

scratch-desktop を使わず、ブラウザ(chrome)からmaqueenを直接操作することもできます。

- リポジトリ: maqueen を git clone するか zip＆展開します。
- ブラウザ(chrome)で maqueen.html を開きます。
- 右上の「micro:bit」をクリック/タッチしてmaqueenと接続します。
- 画面上のボタンでモーターを動かしたり、LED点灯などをすることができます。

