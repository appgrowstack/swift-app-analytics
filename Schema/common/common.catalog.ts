// このファイルは analytics-gen.py が書き出しています。手で編集しないでください。
// 元は analytics.yaml。**先にそちらを直してから生成する。**

export const CATALOG_VERSION = 3 as const;
export const INCLUDES = [] as const;

export const FirstOpenKind = ["fresh", "upgraded"] as const;
export type FirstOpenKind = (typeof FirstOpenKind)[number];
export const ScreenName = ["onboarding", "paywall", "settings", "whats_new"] as const;
export type ScreenName = (typeof ScreenName)[number];
export const TapTarget = ["close", "continue", "purchase", "restore", "review", "share"] as const;
export type TapTarget = (typeof TapTarget)[number];
export const OnboardingStep = ["paywall"] as const;
export type OnboardingStep = (typeof OnboardingStep)[number];
export const SignInProvider = ["apple", "google", "anonymous", "email", "other"] as const;
export type SignInProvider = (typeof SignInProvider)[number];
export const SignInSource = ["onboarding", "settings", "gate"] as const;
export type SignInSource = (typeof SignInSource)[number];
export const PaywallSource = ["onboarding", "settings", "limit"] as const;
export type PaywallSource = (typeof PaywallSource)[number];
export const PaywallLoadResult = ["ok", "unavailable"] as const;
export type PaywallLoadResult = (typeof PaywallLoadResult)[number];
export const PaywallSection = ["benefits", "plans", "comparison"] as const;
export type PaywallSection = (typeof PaywallSection)[number];
export const PlanPeriod = ["yearly", "monthly", "weekly", "lifetime"] as const;
export type PlanPeriod = (typeof PlanPeriod)[number];
export const PurchaseResult = ["purchased", "cancelled", "pending", "failed"] as const;
export type PurchaseResult = (typeof PurchaseResult)[number];
export const PaywallCloseResult = ["purchased", "restored", "dismissed"] as const;
export type PaywallCloseResult = (typeof PaywallCloseResult)[number];
export const PaywallCloseVia = ["close_button", "later", "continue_free", "auto", "swipe_down"] as const;
export type PaywallCloseVia = (typeof PaywallCloseVia)[number];
export const RestoreSource = ["paywall", "settings"] as const;
export type RestoreSource = (typeof RestoreSource)[number];
export const RestoreResult = ["restored", "nothing_to_restore", "failed"] as const;
export type RestoreResult = (typeof RestoreResult)[number];
export const ReviewMomentName = ["after_whats_new"] as const;
export type ReviewMomentName = (typeof ReviewMomentName)[number];
export const WhatsNewCloseVia = ["close_button", "finished", "swipe_down"] as const;
export type WhatsNewCloseVia = (typeof WhatsNewCloseVia)[number];
export const CampaignSide = ["treatment", "holdout"] as const;
export type CampaignSide = (typeof CampaignSide)[number];
export const CampaignSkipReason = ["busy", "lower_priority", "missing_locale", "image_not_ready", "fact_unavailable", "withdrawn"] as const;
export type CampaignSkipReason = (typeof CampaignSkipReason)[number];
export const CampaignRejectReason = ["parse_error", "schema_too_new", "invalid", "unknown_placement", "unknown_action", "unknown_asset", "unknown_fact", "unknown_operator", "unknown_target", "missing_value", "unknown_value", "type_mismatch"] as const;
export type CampaignRejectReason = (typeof CampaignRejectReason)[number];
export const CampaignTapTarget = ["action", "link"] as const;
export type CampaignTapTarget = (typeof CampaignTapTarget)[number];
export const CampaignDismissVia = ["secondary", "close_button", "swipe_down", "outside"] as const;
export type CampaignDismissVia = (typeof CampaignDismissVia)[number];
export const CampaignActionResult = ["completed", "failed", "cancelled"] as const;
export type CampaignActionResult = (typeof CampaignActionResult)[number];
export const LinkOpenedKind = ["short", "store_page"] as const;
export type LinkOpenedKind = (typeof LinkOpenedKind)[number];

export const EVENTS = {
  first_open: {
    kind: "outcome", dedup: "install", origin: "common", sentBy: "package",
    parameters: {
      kind: { type: "enum", origin: "common", values: FirstOpenKind, extensible: true },
    },
  },
  internal_device: {
    kind: "outcome", dedup: "install", origin: "common", sentBy: "package",
    parameters: {},
  },
  screen_viewed: {
    kind: "screen", dedup: "always", origin: "common", sentBy: "app",
    parameters: {
      screen: { type: "enum", origin: "common", values: ScreenName, extensible: true },
    },
  },
  tapped: {
    kind: "interaction", dedup: "always", origin: "common", sentBy: "app",
    parameters: {
      target: { type: "enum", origin: "common", values: TapTarget, extensible: true },
      screen: { type: "enum", origin: "common", values: ScreenName, extensible: true },
    },
  },
  onboarding_step: {
    kind: "screen", dedup: "always", origin: "common", sentBy: "app",
    parameters: {
      step: { type: "enum", origin: "common", values: OnboardingStep, extensible: true },
      index: { type: "count", origin: "common" },
    },
  },
  onboarding_completed: {
    kind: "outcome", dedup: "install", origin: "common", sentBy: "app",
    parameters: {},
  },
  signed_in: {
    kind: "outcome", dedup: "always", origin: "common", sentBy: "app",
    parameters: {
      provider: { type: "enum", origin: "common", values: SignInProvider, extensible: true },
      source: { type: "enum", origin: "common", values: SignInSource, extensible: true },
    },
  },
  experiment_assigned: {
    kind: "outcome", dedup: "install", origin: "common", sentBy: "app",
    parameters: {
      experiment: { type: "token", origin: "common", pattern: "[a-z0-9_]{1,40}", maxLength: 64 },
      arm: { type: "token", origin: "common", pattern: "[a-z0-9_]{1,40}", maxLength: 64 },
    },
  },
  paywall_shown: {
    kind: "impression", dedup: "always", origin: "common", sentBy: "app",
    parameters: {
      source: { type: "enum", origin: "common", values: PaywallSource, extensible: true },
      pw_id: { type: "token", origin: "common", pattern: "[a-f0-9]{8}", maxLength: 64 },
      nth: { type: "bucket", origin: "common", edges: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], values: ["0", "1_1", "2_2", "3_3", "4_4", "5_5", "6_6", "7_7", "8_8", "9_9", "10_10", "11_plus"] },
    },
  },
  paywall_loaded: {
    kind: "outcome", dedup: "always", origin: "common", sentBy: "app",
    parameters: {
      source: { type: "enum", origin: "common", values: PaywallSource, extensible: true },
      pw_id: { type: "token", origin: "common", pattern: "[a-f0-9]{8}", maxLength: 64 },
      result: { type: "enum", origin: "common", values: PaywallLoadResult, extensible: true },
      load_s: { type: "number", origin: "common" },
    },
  },
  paywall_scrolled: {
    kind: "impression", dedup: "always", origin: "common", sentBy: "app",
    parameters: {
      source: { type: "enum", origin: "common", values: PaywallSource, extensible: true },
      pw_id: { type: "token", origin: "common", pattern: "[a-f0-9]{8}", maxLength: 64 },
      section: { type: "enum", origin: "common", values: PaywallSection, extensible: true },
    },
  },
  paywall_plan_selected: {
    kind: "interaction", dedup: "always", origin: "common", sentBy: "app",
    parameters: {
      source: { type: "enum", origin: "common", values: PaywallSource, extensible: true },
      pw_id: { type: "token", origin: "common", pattern: "[a-f0-9]{8}", maxLength: 64 },
      to: { type: "enum", origin: "common", values: PlanPeriod, extensible: true },
    },
  },
  paywall_purchase_tapped: {
    kind: "interaction", dedup: "always", origin: "common", sentBy: "app",
    parameters: {
      source: { type: "enum", origin: "common", values: PaywallSource, extensible: true },
      pw_id: { type: "token", origin: "common", pattern: "[a-f0-9]{8}", maxLength: 64 },
      product: { type: "enum", origin: "common", values: PlanPeriod, extensible: true },
      open_s: { type: "count", origin: "common" },
    },
  },
  paywall_purchase_result: {
    kind: "outcome", dedup: "always", origin: "common", sentBy: "app",
    parameters: {
      source: { type: "enum", origin: "common", values: PaywallSource, extensible: true },
      pw_id: { type: "token", origin: "common", pattern: "[a-f0-9]{8}", maxLength: 64 },
      product: { type: "enum", origin: "common", values: PlanPeriod, extensible: true },
      result: { type: "enum", origin: "common", values: PurchaseResult, extensible: true },
      sheet_s: { type: "count", origin: "common" },
    },
  },
  paywall_backgrounded: {
    kind: "outcome", dedup: "always", origin: "common", sentBy: "app",
    parameters: {
      source: { type: "enum", origin: "common", values: PaywallSource, extensible: true },
      pw_id: { type: "token", origin: "common", pattern: "[a-f0-9]{8}", maxLength: 64 },
      open_s: { type: "count", origin: "common" },
    },
  },
  paywall_closed: {
    kind: "outcome", dedup: "always", origin: "common", sentBy: "app",
    parameters: {
      source: { type: "enum", origin: "common", values: PaywallSource, extensible: true },
      pw_id: { type: "token", origin: "common", pattern: "[a-f0-9]{8}", maxLength: 64 },
      result: { type: "enum", origin: "common", values: PaywallCloseResult, extensible: true },
      via: { type: "enum", origin: "common", values: PaywallCloseVia, extensible: true },
      product: { type: "enum", origin: "common", optional: true, values: PlanPeriod, extensible: true },
      open_s: { type: "count", origin: "common" },
    },
  },
  purchase_completed: {
    kind: "outcome", dedup: "always", origin: "common", sentBy: "app",
    parameters: {
      source: { type: "enum", origin: "common", values: PaywallSource, extensible: true },
      pw_id: { type: "token", origin: "common", pattern: "[a-f0-9]{8}", maxLength: 64 },
      product: { type: "enum", origin: "common", values: PlanPeriod, extensible: true },
    },
  },
  restore_completed: {
    kind: "outcome", dedup: "always", origin: "common", sentBy: "app",
    parameters: {
      source: { type: "enum", origin: "common", values: RestoreSource, extensible: true },
      result: { type: "enum", origin: "common", values: RestoreResult, extensible: true },
    },
  },
  review_requested: {
    kind: "outcome", dedup: "always", origin: "common", sentBy: "app",
    parameters: {
      moment: { type: "enum", origin: "common", values: ReviewMomentName, extensible: true },
    },
  },
  whats_new_shown: {
    kind: "impression", dedup: "always", origin: "common", sentBy: "app",
    parameters: {
      release: { type: "token", origin: "common", pattern: "[0-9]{1,3}(\\.[0-9]{1,3}){1,2}", maxLength: 64 },
    },
  },
  whats_new_closed: {
    kind: "outcome", dedup: "always", origin: "common", sentBy: "app",
    parameters: {
      release: { type: "token", origin: "common", pattern: "[0-9]{1,3}(\\.[0-9]{1,3}){1,2}", maxLength: 64 },
      page: { type: "count", origin: "common" },
      pages: { type: "count", origin: "common" },
      via: { type: "enum", origin: "common", values: WhatsNewCloseVia, extensible: true },
    },
  },
  campaign_eligible: {
    kind: "outcome", dedup: "always", origin: "common", sentBy: "sdk",
    parameters: {
      campaign: { type: "token", origin: "common", pattern: "_set|_invalid|[a-z0-9-]{3,40}", maxLength: 64 },
      set_version: { type: "count", origin: "common" },
      trigger: { type: "token", origin: "common", pattern: "[a-z0-9_]{1,40}", maxLength: 64 },
      side: { type: "enum", origin: "common", values: CampaignSide, extensible: false },
    },
  },
  campaign_skipped: {
    kind: "outcome", dedup: "always", origin: "common", sentBy: "sdk",
    parameters: {
      campaign: { type: "token", origin: "common", pattern: "_set|_invalid|[a-z0-9-]{3,40}", maxLength: 64 },
      set_version: { type: "count", origin: "common" },
      trigger: { type: "token", origin: "common", pattern: "[a-z0-9_]{1,40}", maxLength: 64 },
      reason: { type: "enum", origin: "common", values: CampaignSkipReason, extensible: false },
    },
  },
  campaign_rejected: {
    kind: "outcome", dedup: "always", origin: "common", sentBy: "sdk",
    parameters: {
      campaign: { type: "token", origin: "common", pattern: "_set|_invalid|[a-z0-9-]{3,40}", maxLength: 64 },
      set_version: { type: "count", origin: "common" },
      reason: { type: "enum", origin: "common", values: CampaignRejectReason, extensible: false },
    },
  },
  campaigns_stale: {
    kind: "outcome", dedup: "always", origin: "common", sentBy: "sdk",
    parameters: {
      set_version: { type: "count", origin: "common" },
      hours: { type: "count", origin: "common" },
    },
  },
  campaign_shown: {
    kind: "impression", dedup: "always", origin: "common", sentBy: "sdk",
    parameters: {
      campaign: { type: "token", origin: "common", pattern: "_set|_invalid|[a-z0-9-]{3,40}", maxLength: 64 },
      set_version: { type: "count", origin: "common" },
      trigger: { type: "token", origin: "common", pattern: "[a-z0-9_]{1,40}", maxLength: 64 },
      placement: { type: "token", origin: "common", pattern: "[a-z0-9_]{1,40}", maxLength: 64 },
    },
  },
  campaign_tapped: {
    kind: "interaction", dedup: "always", origin: "common", sentBy: "sdk",
    parameters: {
      campaign: { type: "token", origin: "common", pattern: "_set|_invalid|[a-z0-9-]{3,40}", maxLength: 64 },
      set_version: { type: "count", origin: "common" },
      trigger: { type: "token", origin: "common", pattern: "[a-z0-9_]{1,40}", maxLength: 64 },
      target: { type: "enum", origin: "common", values: CampaignTapTarget, extensible: false },
    },
  },
  campaign_dismissed: {
    kind: "interaction", dedup: "always", origin: "common", sentBy: "sdk",
    parameters: {
      campaign: { type: "token", origin: "common", pattern: "_set|_invalid|[a-z0-9-]{3,40}", maxLength: 64 },
      set_version: { type: "count", origin: "common" },
      trigger: { type: "token", origin: "common", pattern: "[a-z0-9_]{1,40}", maxLength: 64 },
      via: { type: "enum", origin: "common", values: CampaignDismissVia, extensible: false },
    },
  },
  campaign_action_completed: {
    kind: "outcome", dedup: "always", origin: "common", sentBy: "sdk",
    parameters: {
      campaign: { type: "token", origin: "common", pattern: "_set|_invalid|[a-z0-9-]{3,40}", maxLength: 64 },
      set_version: { type: "count", origin: "common" },
      trigger: { type: "token", origin: "common", pattern: "[a-z0-9_]{1,40}", maxLength: 64 },
      action: { type: "token", origin: "common", pattern: "[a-z0-9_]{1,40}", maxLength: 64 },
      result: { type: "enum", origin: "common", values: CampaignActionResult, extensible: false },
    },
  },
  app_updated: {
    kind: "outcome", dedup: "always", origin: "common", sentBy: "sdk",
    parameters: {
      from_version: { type: "token", origin: "common", pattern: "[0-9]+(\\.[0-9]+){1,2}", maxLength: 64 },
      to_version: { type: "token", origin: "common", pattern: "[0-9]+(\\.[0-9]+){1,2}", maxLength: 64 },
    },
  },
  link_opened: {
    kind: "outcome", dedup: "always", origin: "common", sentBy: "sdk",
    parameters: {
      kind: { type: "enum", origin: "common", values: LinkOpenedKind, extensible: false },
      target: { type: "token", origin: "common", optional: true, pattern: "[a-z][a-z0-9-]{1,63}", maxLength: 64 },
      campaign: { type: "token", origin: "common", optional: true, pattern: "[a-z0-9_-]{1,64}", maxLength: 64 },
      code: { type: "token", origin: "common", optional: true, pattern: "[A-Za-z0-9]{8}|[A-Za-z0-9]{16}|[a-z0-9][a-z0-9-]{1,39}", maxLength: 64 },
    },
  },
} as const;

export type EventName = keyof typeof EVENTS;
export const EVENT_NAMES = Object.keys(EVENTS) as EventName[];
export const COMMON_EVENT_NAMES = ["first_open", "internal_device", "screen_viewed", "tapped", "onboarding_step", "onboarding_completed", "signed_in", "experiment_assigned", "paywall_shown", "paywall_loaded", "paywall_scrolled", "paywall_plan_selected", "paywall_purchase_tapped", "paywall_purchase_result", "paywall_backgrounded", "paywall_closed", "purchase_completed", "restore_completed", "review_requested", "whats_new_shown", "whats_new_closed", "campaign_eligible", "campaign_skipped", "campaign_rejected", "campaigns_stale", "campaign_shown", "campaign_tapped", "campaign_dismissed", "campaign_action_completed", "app_updated", "link_opened"] as const satisfies readonly EventName[];
export type CommonEventName = (typeof COMMON_EVENT_NAMES)[number];

/** 出来事ごとの `props` の型。生成した Swift は引数を全部埋めて送る（`?` の付いた任意の引数は、値が無ければ載らない）。 */
export interface EventProps {
  first_open: { kind: FirstOpenKind };
  internal_device: Record<string, never>;
  screen_viewed: { screen: ScreenName };
  tapped: { target: TapTarget; screen: ScreenName };
  onboarding_step: { step: OnboardingStep; index: number };
  onboarding_completed: Record<string, never>;
  signed_in: { provider: SignInProvider; source: SignInSource };
  experiment_assigned: { experiment: string; arm: string };
  paywall_shown: { source: PaywallSource; pw_id: string; nth: "0" | "1_1" | "2_2" | "3_3" | "4_4" | "5_5" | "6_6" | "7_7" | "8_8" | "9_9" | "10_10" | "11_plus" };
  paywall_loaded: { source: PaywallSource; pw_id: string; result: PaywallLoadResult; load_s: number };
  paywall_scrolled: { source: PaywallSource; pw_id: string; section: PaywallSection };
  paywall_plan_selected: { source: PaywallSource; pw_id: string; to: PlanPeriod };
  paywall_purchase_tapped: { source: PaywallSource; pw_id: string; product: PlanPeriod; open_s: number };
  paywall_purchase_result: { source: PaywallSource; pw_id: string; product: PlanPeriod; result: PurchaseResult; sheet_s: number };
  paywall_backgrounded: { source: PaywallSource; pw_id: string; open_s: number };
  paywall_closed: { source: PaywallSource; pw_id: string; result: PaywallCloseResult; via: PaywallCloseVia; product?: PlanPeriod; open_s: number };
  purchase_completed: { source: PaywallSource; pw_id: string; product: PlanPeriod };
  restore_completed: { source: RestoreSource; result: RestoreResult };
  review_requested: { moment: ReviewMomentName };
  whats_new_shown: { release: string };
  whats_new_closed: { release: string; page: number; pages: number; via: WhatsNewCloseVia };
  campaign_eligible: { campaign: string; set_version: number; trigger: string; side: CampaignSide };
  campaign_skipped: { campaign: string; set_version: number; trigger: string; reason: CampaignSkipReason };
  campaign_rejected: { campaign: string; set_version: number; reason: CampaignRejectReason };
  campaigns_stale: { set_version: number; hours: number };
  campaign_shown: { campaign: string; set_version: number; trigger: string; placement: string };
  campaign_tapped: { campaign: string; set_version: number; trigger: string; target: CampaignTapTarget };
  campaign_dismissed: { campaign: string; set_version: number; trigger: string; via: CampaignDismissVia };
  campaign_action_completed: { campaign: string; set_version: number; trigger: string; action: string; result: CampaignActionResult };
  app_updated: { from_version: string; to_version: string };
  link_opened: { kind: LinkOpenedKind; target?: string; campaign?: string; code?: string };
}
