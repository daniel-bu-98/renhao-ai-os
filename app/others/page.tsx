import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Others｜BU Renhao",
  description: "独立工具与网站项目，包括旅游线路预订系统演示。",
};

export default function OthersPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="页面导航">
        <Link href="/">返回首页</Link>
        <span>Others</span>
      </nav>
      <header className={styles.heading}>
        <h1>Others</h1>
        <p>工具与独立项目</p>
      </header>
      <article className={styles.project}>
        <img src="/others/travel/assets/images/routes/huangshan.jpg" alt="黄山旅游线路" width={480} height={300} />
        <div>
          <h2>旅游线路预订系统</h2>
          <p>12 条经典路线 · 用户端与管理端</p>
          <p>演示项目，非真实预订服务。数据仅保存在当前浏览器，请勿输入真实个人信息或常用密码。</p>
          <a href="/others/travel">打开项目 <span aria-hidden="true">→</span></a>
        </div>
      </article>
    </main>
  );
}
