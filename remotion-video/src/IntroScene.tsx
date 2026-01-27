import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/NotoSansSC";

// 加载中文字体
const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

// 颜色配置
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

// 场景1: 开场标题
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const titleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [15, 35], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [35, 55], [0, 1], {
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
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: 160,
          height: 160,
          borderRadius: 40,
          background: `linear-gradient(135deg, #60A5FA 0%, #34D399 100%)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${logoScale})`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          marginBottom: 60,
        }}
      >
        <span
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: COLORS.white,
          }}
        >
          思
        </span>
      </div>

      {/* 标题 */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: COLORS.slate900,
            margin: 0,
            letterSpacing: -2,
          }}
        >
          思奇的创业笔记
        </h1>
      </div>

      {/* 副标题 */}
      <p
        style={{
          fontSize: 36,
          color: COLORS.slate700,
          marginTop: 30,
          opacity: subtitleOpacity,
        }}
      >
        一个年轻创业者的长期成长笔记
      </p>
    </AbsoluteFill>
  );
};

export default IntroScene;
