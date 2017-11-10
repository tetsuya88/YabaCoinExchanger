#YCS-EXCHANGER
##動作環境

- Node.js v8.4.0
- npm v5.3.0
- TouchDesigner
- Arduino


##フォルダ構成

```bash
exchanger
 ├─ frontend					<= サーバー用ソフトウェア
 │   ├ app.js					<= サーバ │   ├ data						<= TouchDesignerに渡すデータ置き場
 │   ├ htdocs					<= WEBインターフェース置き場
 │   ├ node_modules				<= Nodeのパッケージ
 │   ├ package.json				<= パッケージ管理
 │   └ package-lock.json
 │
 ├─ TD							<= ビジュアライズ用 └─ Arduino						<= ハード制御

```

##導入方法

クローン後

```bash
# frontend 直下で

$ npm install                //モジュールのインストール

```

##起動方法

###本番実行

```bash
# frontend 直下で

//サーバの起動
	//localhost:8080でブラウザから見る(入力画面)
	//OSC:3000でTDにデータ設置完了の通知を送信
	//OSC:4000で同じWifi上にあるProviderが起動してあるPCに入力データを送信(IP設定必須)
  //exchangerとProviderの同じ階層にcommonconfig.jsを設置し、後述のようにする。

$ node app.js     



```

###設定ファイル

```bash
# exchanger 同階層に

module.exports = {
    providerIp: 'IPアドレス'
};



```
