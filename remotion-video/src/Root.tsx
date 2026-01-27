import { Composition } from "remotion";
import { WebsiteIntro } from "./WebsiteIntro";

// 手机视频格式: 9:16 (1080x1920)
// 时长: 10秒 = 300帧 (30fps)

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="WebsiteIntro"
      component={WebsiteIntro}
      durationInFrames={300}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
