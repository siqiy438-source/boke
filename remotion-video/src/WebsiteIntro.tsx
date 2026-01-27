import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import IntroScene from "./IntroScene";
import ThemeScene from "./ThemeScene";
import ColumnsScene from "./ColumnsScene";
import OutroScene from "./OutroScene";

// 主视频组件 - 10秒 = 300帧 (30fps)
// 场景分配:
// - IntroScene: 0-90帧 (3秒) - 开场标题
// - ThemeScene: 75-180帧 (3.5秒) - 核心主题
// - ColumnsScene: 165-255帧 (3秒) - 四大专栏
// - OutroScene: 240-300帧 (2秒) - 结尾CTA

export const WebsiteIntro: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 场景1: 开场标题 */}
      <Sequence from={0} durationInFrames={90} premountFor={30}>
        <IntroScene />
      </Sequence>

      {/* 场景2: 核心主题 - 阅读、创业、投资 */}
      <Sequence from={75} durationInFrames={105} premountFor={30}>
        <ThemeScene />
      </Sequence>

      {/* 场景3: 四大专栏展示 */}
      <Sequence from={165} durationInFrames={90} premountFor={30}>
        <ColumnsScene />
      </Sequence>

      {/* 场景4: 结尾 CTA */}
      <Sequence from={240} durationInFrames={60} premountFor={30}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};

export default WebsiteIntro;
