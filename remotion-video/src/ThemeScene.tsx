import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/NotoSansSC";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const COLORS = {
  brandOrange: "#F97316",
  amber: "#F59E0B",
  slate900: "#0F172A",
  slate700: "#334155",
  slate400: "#94A3B8",
  white: "#FFFFFF",
  gradientStart: "#FFF7ED",
  gradientEnd: "#EFF6FF",
};

// 场景2: 核心主题展示
const ThemeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headingY = interpolate(frame, [0, 20], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 三个主题词的动画
  const themes = ["阅读", "创业", "投资"];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.gradientStart} 0%, ${COLORS.gradientEnd} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
      }}
    >
      {/* 标题 */}
      <div
        style={{
          opacity: headingOpacity,
          transform: `translateY(${headingY}px)`,
          marginBottom: 80,
        }}
      >
        <h2
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.slate700,
            margin: 0,
          }}
        >
          记录
        </h2>
      </div>

      {/* 三个主题词 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 40,
          alignItems: "center",
        }}
      >
        {themes.map((theme, index) => {
          const delay = 20 + index * 15;
          const themeSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12 },
          });

          const themeOpacity = interpolate(
            frame,
            [delay, delay + 15],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          return (
            <div
              key={theme}
              style={{
                opacity: themeOpacity,
                transform: `scale(${themeSpring})`,
              }}
            >
              <span
                style={{
                  fontSize: 80,
                  fontWeight: 900,
                  background: `linear-gradient(135deg, ${COLORS.brandOrange} 0%, ${COLORS.amber} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {theme}
              </span>
            </div>
          );
        })}
      </div>

      {/* 底部文字 */}
      <p
        style={{
          fontSize: 36,
          color: COLORS.slate700,
          marginTop: 80,
          opacity: interpolate(frame, [70, 90], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        的底层思考
      </p>
    </AbsoluteFill>
  );
};

export default ThemeScene;
