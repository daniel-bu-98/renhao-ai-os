import type { Metadata } from "next";
import CareerContent from "./CareerContent";

export const metadata: Metadata = {
  title: "职业｜BU Renhao",
  description:
    "BU Renhao 的 AI 数据与自动驾驶职业经历，涵盖核心能力、职业时间线、工作经历、项目与研究、奖项认证及联系方式。",
};

export default function CareerPage() {
  return <CareerContent />;
}
