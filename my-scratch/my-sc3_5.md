# My Scratch 3.0 を作る（その5）

- [その1](./my-sc3_1.md)：scratch-gui をインストールする
- [その2](./my-sc3_2.md)：scratch-gui をカスタマイズする
- [その3](./my-sc3_3.md)：httpsで起動できるようにする
- [その4](./my-sc3_4.md)：httpsで使う自己証明書を作る
- その5：参考）chromebookでの認証局の取り込み
- [その6](./my-sc3_6.md)：参考）\[WIN\] nginxでサーバーを統合する
- [その7](./my-sc3_7.md)：参考）\[Linux\] nginxでサーバーを統合する

<hr>

※ chromebookでの操作を前提としています

<hr>

## 5-1 chromeに作ったプライベート認証局をシステムに取り込む

- 「設定」から「プライバシーとセキュリティ」をクリックし、「セキュリティ」をクリックします。

    ![](images/chrome-1.png)
    
- 「証明書の管理」をクリックします。

    ![](images/chrome-2.png)

- 「認証局」をクリックし、「インポート」をクリックします。

    ![](images/chrome-3.png)

- 4-1で作ったプライベート認証局(`ca.pem`または`ca.pem.cer`)を選択し「開く」をクリックします。

    ![](images/chrome-4.png)

- 「ウェブサイトの識別でこの証明書を信頼します」をチェックし、「OK」をクリックします。

    ![](images/chrome-5.png)

- 認証局の一覧にインポートした証明書が表示されていることを確認して終わりです。

    ![](images/chrome-6.png)

<hr>

※ 参考）[その6](./my-sc3_6.md)：参考）\[WIN\] nginxでサーバーを統合する

※ 参考）[その7](./my-sc3_7.md)：参考）\[Linux\] nginxでサーバーを統合する
