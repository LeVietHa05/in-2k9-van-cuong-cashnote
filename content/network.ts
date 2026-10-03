import type { Line, Station } from "@/lib/types";

/**
 * NGUỒN DỮ LIỆU DUY NHẤT của mạng lưới.
 * - Thêm bài: thêm 1 station + (nếu đã viết) file content/posts/<slug>.md
 * - Thêm điểm giao: cho slug đó xuất hiện trong routes của nhiều tuyến
 * - Thêm tuyến: thêm 1 object vào `lines`
 */
const s = (
  slug: string,
  title: string,
  long_title: string,
  x: number,
  y: number,
  label: Station["label"],
  summary: string,
  status: Station["status"] = "published",
): Station => ({ slug, title, long_title, summary, x, y, label, status });

export const stations: Record<string, Station> = Object.fromEntries(
  [
    s(
      "banks-intro",
      "Building the next bank",
      "",
      190,
      330,
      "t",
      "", //   "Why banking is being rebuilt from the ground up.",
    ),
    s(
      "reinvented-banking",
      "Reinvented Banking",
      "Three Apps That Basically Reinvented Banking (None of Them Are Banks) ",
      190,
      455,
      "l",
      "In my last post, I talked about the 1.3 billion people still stuck outside the financial system — and the fact that most of them already own a phone. ",
    ),
    s(
      "fintech-asia",
      "Fintech in SEA",
      "Fintech in Southeast Asia Is Playing a Different Game",
      190,
      560,
      "l",
      "Spend a week in Singapore and you'll probably come away convinced that Southeast Asia is becoming one of the world's most exciting fintech markets. ",
    ),
    s(
      "ai-lending",
      "AI lending (no credit score)",
      "The App That'll Loan You Money Without Ever Checking a Credit Score ",
      465,
      330,
      "r",
      "", //The data layer every lender quietly depends on.",
    ),
    s(
      "predicting-crashes",
      "Predicting Market Crashes",
      "Predicting Market Crashes With Data: What Works and What Doesn't",
      465,
      255,
      "r",
      "Every few months, another headline claims that someone has finally figured out how to predict the next market crash.", // "Underwriting without a credit score.",
    ),
    s(
      "data-decisions",
      "Data & Decisions",
      "",
      465,
      180,
      "r",
      "", //   "What models can and can't see coming.",
    ),
    s(
      "scaling-intro",
      "Building & Scaling fintech",
      "",
      700,
      370,
      "r",
      "", //"From first users to millions of accounts.",
    ),
    s(
      "part-they-dont-tell",
      "The part they don't tell you",
      "",
      700,
      455,
      "r",
      "", //"The unglamorous side of building a fintech.",
    ),
    s(
      "fintech-winter",
      "Fintech Winter",
      "The $200B Valuation Collapse: Lessons From the Fintech Winter of 2022-2023",
      700,
      660,
      "r",
      "If you had looked at the fintech industry in late 2021, it would have been difficult to imagine that anything could seriously slow its momentum.", // "Surviving when the funding disappears.",
    ),
    s(
      "policy-future",
      "Policy & Future",
      "",
      380,
      660,
      "l",
      "", // "Regulation as a product constraint.",
    ),
    s(
      "stablecoins",
      "Stablecoins",
      "Stablecoins: The Most Boring Innovation That Could Change Everything",
      380,
      765,
      "r",
      "For years, the conversation around cryptocurrency has been dominated by speculation. ", // "Digital dollars and how they actually work.",
    ),
    s(
      "hidden-rails",
      "The Hidden Rails of the Internet",
      "The Hidden Rails of the Internet: How Money Actually Moves Around the World",
      380,
      870,
      "l",
      "One of the things I find most fascinating about finance is that the systems we depend on every day are usually the ones we think about the least. ", //"The plumbing under every payment.",
    ),
    s(
      "money-future",
      "Reimagining Money",
      "",
      380,
      975,
      "r",
      "", // "Where the money network is heading.",
    ),
  ].map((st) => [st.slug, st]),
);

export const lines: Line[] = [
  {
    id: "reimagining-money",
    name: "Reimagining Money",
    tagline: "Stablecoins, rails and the future of money",
    colors: ["#1e90ff", "#a6f0de"],
    elbow: "h",
    routes: [
      [
        "fintech-asia",
        "policy-future",
        "stablecoins",
        "hidden-rails",
        "money-future",
      ],
    ],
  },
  {
    id: "next-bank",
    name: "Building the Next Bank",
    tagline: "Banking, reinvented",
    colors: ["#c8f27a", "#1fe0d0"],
    elbow: "h",
    routes: [
      ["banks-intro", "reinvented-banking", "fintech-asia"],
      ["reinvented-banking", "part-they-dont-tell"], // nhánh sang tuyến Scaling Fintech
    ],
  },
  {
    id: "scaling-fintech",
    name: "Scaling Fintech",
    tagline: "The part they don't tell you",
    colors: ["#ff8fa3", "#ffb45c"],
    elbow: "v",
    routes: [
      [
        "scaling-intro",
        "part-they-dont-tell",
        "fintech-winter",
        "policy-future",
      ],
    ],
  },
  {
    id: "data-decisions",
    name: "Data & Decisions",
    tagline: "Models, credit and risk",
    colors: ["#ff5fe0", "#ffd9e2"],
    elbow: "h",
    routes: [
      ["banks-intro", "data-decisions", "ai-lending", "predicting-crashes"],
    ],
  },
];
