# swift-app-analytics

Analytics events for Swift apps that declare how they are counted, so the rule lives in the event's definition instead of at each call site.

[Japanese](./README.ja.md)

![Swift](https://img.shields.io/badge/Swift-6.2-orange.svg)
![Platforms](https://img.shields.io/badge/Platforms-iOS%2017%20%7C%20macOS%2014%20%7C%20tvOS%2017%20%7C%20watchOS%2010%20%7C%20visionOS%201-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

This is not diagnostic logging. It records what people did in the app, in a shape you can analyse
later.

## Features

- **The catalog owns the counting rule.** Each event declares its `kind` (`screen`, `impression`,
  `interaction`, `outcome`) and its `dedup` scope (`session`, `install`, `always`) in YAML
- **Swift generated from the catalog.** `Scripts/analytics-gen.py generate` writes the app's event
  type, so an event cannot be misspelled or sent with undeclared parameters. There is no
  string-based send. The generator runs on Python 3 alone
- **Deduplication enforced in one place.** `DedupingAnalytics` applies each event's declared scope,
  so call sites never check whether they already sent it
- **Impressions with a fixed definition.** 50% of the area, visible for 1.0 second.
  `ImpressionTracker` holds no clock, so the rule is tested without a simulator or real waiting
- **Firing from SwiftUI.** `.trackScreen(_:dwell:)` and `.trackImpression(_:threshold:dwell:)`
  (iOS 18+), with the client handed down by `.analytics(_:)`
- **A CI audit.** `analytics-gen.py audit` finds events that are declared but never sent, the same
  event sent from two places, and sends that bypass the catalog
- **A shared common catalog.** `Schema/common/common.yaml` holds the events every app has
  (`first_open`, `paywall_*`, `purchase_completed`, …). An app catalog says `include: common` and
  adds its own values with `extend:`
- **The same catalog for the receiver.** `--json` and `--ts` write the catalog for a server or a
  dashboard to check against
- **Batches to your own server.** `AnalyticsBatchSink` keeps events in a file and sends them in
  batches in a fixed envelope. The app gives it a name, a URL and an authorization closure
- **The install and the build, done once.** `InstallID`, `BuildChannel` (debug, TestFlight, App
  Store), `FirstLaunch` (sends `first_open` once) and `AnalyticsInternalDevice` (marks the makers'
  own devices)
- **An off switch that remembers.** `AnalyticsSwitch` drops everything while measurement is off,
  keeps that choice across launches, and erases what was waiting to be sent
- **Seeing what was sent.** `ConsoleAnalytics` writes to the unified log, `AnalyticsLogViewer` shows
  the log on the device, and `AnalyticsTesting` has `RecordingAnalytics` for tests
- **No external dependencies.** Vendor SDKs are not bundled; an adapter is a small
  `AnalyticsClient` in your app

## Quick Start

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

### Connecting to a server

The package works on its own. To connect it to a server, enable the matching trait of the connector package [swift-appgrowstack](https://github.com/appgrowstack/swift-appgrowstack) (SwiftPM traits) instead of wiring a server here.

## Documentation

The API reference and the guides (Getting Started, Counting Rules, What Not to Send) are the DocC
catalogs under `Sources/*/*.docc`. Open them in Xcode with Product > Build Documentation. The
catalog file format is [Schema/SCHEMA.md](./Schema/SCHEMA.md) (in Japanese), and the envelope is
[Schema/common/ENVELOPE.md](./Schema/common/ENVELOPE.md). Changes are listed in
[CHANGELOG.md](./CHANGELOG.md).

## Installation

```swift
.package(url: "https://github.com/appgrowstack/swift-app-analytics.git", .upToNextMinor(from: "0.5.0"))
```

```swift
.product(name: "AnalyticsSwiftUI", package: "swift-app-analytics")
```

| Product | Contents | Depends on |
|---|---|---|
| `AnalyticsCore` | Events, clients, counting rules, install and build | Foundation |
| `AnalyticsSwiftUI` | Firing from views, the on-device log viewer | `AnalyticsCore`, SwiftUI |
| `AnalyticsBatchSink` | Batches in the fixed envelope to your own server | `AnalyticsCore` |
| `AnalyticsTesting` | Test doubles. Do not import it from a shipping target | `AnalyticsCore` |

## Requirements

- iOS 17.0+ / macOS 14.0+ / tvOS 17.0+ / watchOS 10.0+ / visionOS 1.0+
- Swift 6.2+
- Python 3, for the catalog generator only

## License

MIT. See [LICENSE](./LICENSE).
