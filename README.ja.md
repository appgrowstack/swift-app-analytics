# swift-app-analytics

数え方を宣言する、Swiftのアプリの計測のイベント。数え方の決まりを呼ぶ場所ごとでなく、イベントの定義に置く。

[English](./README.md)

![Swift](https://img.shields.io/badge/Swift-6.2-orange.svg)
![Platforms](https://img.shields.io/badge/Platforms-iOS%2017%20%7C%20macOS%2014%20%7C%20tvOS%2017%20%7C%20watchOS%2010%20%7C%20visionOS%201-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

不具合を調べるためのログではありません。アプリの中で人が何をしたかを、後で分析できる形で記録します。

## 機能

- **数え方はカタログが持つ。** イベントごとに `kind`（`screen`・`impression`・`interaction`・`outcome`）と `dedup` の範囲（`session`・`install`・`always`）をYAMLで宣言します
- **カタログからSwiftを作る。** `Scripts/analytics-gen.py generate` がアプリのイベントの型を書き出すので、イベントの名前の書き間違いや、宣言していないパラメーターでの送信はできません。文字列で送る方法はありません。ジェネレーターはPython 3だけで動きます
- **重複は1か所で除く。** `DedupingAnalytics` がイベントごとに宣言した範囲を当てるので、呼ぶ側で送ったかどうかを確かめません
- **インプレッションの定義が決まっている。** 面積の50%が1.0秒見えたら数えます。`ImpressionTracker` は時計を持たないので、シミュレーターも実際に待つことも無しに決まりをテストできます
- **SwiftUIから送る。** `.trackScreen(_:dwell:)` と `.trackImpression(_:threshold:dwell:)`（iOS 18以降）。クライアントは `.analytics(_:)` で下のビューに渡します
- **CIでの点検。** `analytics-gen.py audit` が、宣言したのに送っていないイベント・2か所から送っている同じイベント・カタログを通らない送信を見つけます
- **共通のカタログ。** `Schema/common/common.yaml` に、どのアプリにもあるイベント（`first_open`・`paywall_*`・`purchase_completed` など）があります。アプリのカタログは `include: common` と書き、自分の値を `extend:` で足します
- **受け取る側も同じカタログ。** `--json` と `--ts` で、サーバーやダッシュボードが照らし合わせるためのカタログを書き出します
- **自分のサーバーにまとめて送る。** `AnalyticsBatchSink` はイベントをファイルに残し、決まったエンベロープでまとめて送ります。アプリは名前・URL・認可のクロージャを渡します
- **インストールとビルドの扱いを1回で。** `InstallID`・`BuildChannel`（debug・TestFlight・App Store）・`FirstLaunch`（`first_open` を1回だけ送る）・`AnalyticsInternalDevice`（作る側の端末をマークする）
- **覚えているオフのスイッチ。** `AnalyticsSwitch` は計測がオフの間すべてを捨て、その選択を次の起動でも保ち、送る前の物を消します
- **送った物を見る。** `ConsoleAnalytics` は統合ログに書き、`AnalyticsLogViewer` は端末の上でログを見せます。テスト用に `AnalyticsTesting` の `RecordingAnalytics` があります
- **外部の依存なし。** 計測サービスのSDKは入れていません。アダプターはアプリの中の小さな `AnalyticsClient` です

## はじめに

```swift
import AnalyticsCore
import AnalyticsSwiftUI
import SwiftUI

// analytics-gen.py writes this type from your catalog. Written by hand here to stay short.
enum AppEvent: AnalyticsEvent {
    case homeViewed

    var name: String { "home_viewed" }
    var parameters: [String: AnalyticsValue] { [:] }
    var kind: EventKind { .screen }
    var dedup: DedupScope { .always }
}

@main
struct ExampleApp: App {
    // Repeats collapse by each event's declared scope before they reach the console.
    private let analytics = DedupingAnalytics(ConsoleAnalytics())

    var body: some Scene {
        WindowGroup {
            Text("Home")
                .trackScreen(AppEvent.homeViewed)
                .analytics(analytics)
        }
    }
}
```

### サーバーにつなぐ

このパッケージは単体で使えます。サーバーにつなぐときは、このパッケージで送り先を書く代わりに、コネクターのパッケージ [swift-appgrowstack](https://github.com/appgrowstack/swift-appgrowstack) の対応するtrait（SwiftPMのtraits）を有効にします。

## ドキュメント

APIの説明とガイド（Getting Started・Counting Rules・What Not to Send）は、`Sources/*/*.docc` のDocCのカタログです。
XcodeのProduct > Build Documentationで開けます。カタログのファイルの形は [Schema/SCHEMA.md](./Schema/SCHEMA.md)、
エンベロープは [Schema/common/ENVELOPE.md](./Schema/common/ENVELOPE.md) にあります。変更は [CHANGELOG.md](./CHANGELOG.md) にあります。

## 入れ方

```swift
.package(url: "https://github.com/appgrowstack/swift-app-analytics.git", .upToNextMinor(from: "0.4.0"))
```

```swift
.product(name: "AnalyticsSwiftUI", package: "swift-app-analytics")
```

| プロダクト | 中身 | 依存 |
|---|---|---|
| `AnalyticsCore` | イベント・クライアント・数え方・インストールとビルド | Foundation |
| `AnalyticsSwiftUI` | ビューからの送信・端末の上のログの画面 | `AnalyticsCore`・SwiftUI |
| `AnalyticsBatchSink` | 決まったエンベロープで自分のサーバーにまとめて送る | `AnalyticsCore` |
| `AnalyticsTesting` | テスト用のフェイク。リリースするターゲットからはimportしない | `AnalyticsCore` |

## 動く環境

- iOS 17.0+ / macOS 14.0+ / tvOS 17.0+ / watchOS 10.0+ / visionOS 1.0+
- Swift 6.2+
- Python 3（カタログのジェネレーターだけ）

## ライセンス

MIT。[LICENSE](./LICENSE) を見てください。
