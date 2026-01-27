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

// 场景3: 四大专栏展示
const ColumnsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const columns = [
    { icon: "🧠", title: "思维认知", color: "#8B5CF6" },
    { icon: "🚀", title: "创业实战", color: "#F97316" },
    { icon: "📈", title: "财富投资", color: "#10B981" },
    { icon: "📚", title: "阅读笔记", color: "#3B82F6" },
  ];

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.gradientStart} 0%, ${COLORS.gradientEnd} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
        padding: 60,
      }}
    >
      {/* 标题 */}
      <h2
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.slate900,
          marginBottom: 60,
          opacity: titleOpacity,
        }}
      >
        四大专栏
      </h2>

      {/* 专栏卡片网格 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
          width: "100%",
          maxWidth: 900,
        }}
      >
        {columns.map((column, index) => {
          const delay = 15 + index * 12;
          const cardSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 15 },
          });

          const cardOpacity = interpolate(
            frame,
            [delay, delay + 12],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          return (
            <div
              key={column.title}
              style={{
                background: COLORS.white,
                borderRadius: 24,
                padding: 40,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                opacity: cardOpacity,
                transform: `scale(${cardSpring})`,
                boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
              }}
            >
              <span style={{ fontSize: 56 }}>{column.icon}</span>
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: column.color,
                }}
              >
                {column.title}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export default ColumnsScene;
