# My Scratch 3.0 を作る（その8）

- [その1](./my-sc3_1.md)：scratch-gui をインストールする
- [その2](./my-sc3_1.md)：scratch-gui をカスタマイズする
- [その3](./my-sc3_3.md)：httpsで起動できるようにする
- [その4](./my-sc3_4.md)：httpsで使う自己証明書を作る
- [その5](./my-sc3_5.md)：参考）chromebookでの認証局の取り込み
- [その6](./my-sc3_6.md)：参考）\[WIN\] nginxでサーバーを統合する
- [その7](./my-sc3_7.md)：参考）\[Linux\] nginxでサーバーを統合する
- その8：おまけ）インターネット上のイメージ等を使わないようにする

<hr>

## 8-1 イメージ等をダウンロードする

githubから「scratch-desktop」をダウンロードします。

【windows】

```
cd /d C:\
git clone https://github.com/llk/scratch-desktop.git
```

必要なパッケージを組み込みます。

```
cd C:\scratch-desktop
npm install
```

cdn.assets.scratch.mit.eduからイメージ等をダウンロードします。

```
npm run fetch
```

ダウンロードしたイメージ等(/static/assets下のファイル)をフォルダごとscratch-gui下に移動します。

```
move c:\scratch-desktop\static\assets c:\scratch-gui\static
```

これ以降、scratch-desktop環境は使わないので削除します。

<hr>

## 8-2 インターネット上のイメージ等を使わないようにする

- `src\components\library` フォルダを開き

	- `library.jsx.txt` に記述されているマージ箇所を `library.jsx` に組み込み保存します。

- `src\containers` フォルダを開き

	- `backdrop-library.jsx.txt` に記述されているマージ箇所を `backdrop-library.jsx` に組み込み保存します。
	- `costume-library.jsx.txt` に記述されているマージ箇所を `costume-library.jsx` に組み込み保存します。
	- `library-item.jsx.txt` に記述されているマージ箇所を `library-item.jsx` に組み込み保存します。
	- `sound-library.jsx.txt` に記述されているマージ箇所を `sound-library.jsx` に組み込み保存します。
	- `sprite-library.jsx.txt` に記述されているマージ箇所を `sprite-library.jsx` に組み込み保存します。

- `src\lib` フォルダを開き

	- `storage.js.txt` に記述されているマージ箇所を `storage.js` に組み込み保存します。

- `webpack.config.js.local.txt` に記述されているマージ箇所を `webpack.config.js` に組み込み保存します。<br>
注）httpsの定義部分はマージ不要です。


## 8-3 起動用バッチを修正する

起動用バッチに以下の１行を、`npm start`の行よりも前に挿入します。

```
set ASSETS=static
```

<hr>

～　おわり　～
