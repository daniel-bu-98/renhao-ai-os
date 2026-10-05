import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="home-page">
      <header className="home-header">
        <span>BU Renhao</span>
        <nav aria-label="主导航">
          <Link href="/" aria-current="page">首页</Link>
          <Link href="/career">职业</Link>
          <Link href="/others">Others</Link>
          <a href="#contact">联系方式</a>
        </nav>
      </header>

      <section className="home-intro" aria-labelledby="home-title">
        <Image className="home-portrait" src="/profile/bu-renhao.jpg" alt="BU Renhao" width={96} height={96} />
        <p className="eyebrow">个人空间</p>
        <h1 id="home-title">BU Renhao</h1>
        <p className="home-description">专注 AI 数据与自动驾驶，也在这里为职业之外的记录留一处空间。</p>
      </section>

      <section className="home-directions" aria-label="内容方向">
        <Link className="home-direction home-career" href="/career">
          <h2>职业</h2>
          <p>经历、项目与研究</p>
          <span>进入职业页 <span aria-hidden="true">→</span></span>
        </Link>
        {["学术", "生活", "兴趣"].map((name) => (
          <div className="home-direction" key={name}>
            <h2>{name}</h2>
            <p>待补充</p>
          </div>
        ))}
      </section>
      <footer id="contact" className="section-block contact-section">
        <div className="section-intro">
          <p className="eyebrow">联系方式</p>
          <h2>联系我</h2>
          <p>欢迎围绕 AI 数据、自动驾驶、平台建设及 AI 应用进行交流。</p>
        </div>
        <div className="contact-grid">
          <a href="weixin://">微信号:Joey_98_</a>
          <a
            href="https://www.feishu.cn/invitation/page/add_contact/?token=290hf233-b8d8-4275-97e8-d810b4084f0d&unique_id=aEyt6_MsojUxZK0GcxT_og=="
            target="_blank"
            rel="noreferrer"
          >
            飞书 · 个人主页链接
          </a>
          <a href="mailto:burenhao@gmail.com">Email · burenhao@gmail.com</a>
          <a href="https://github.com/daniel-bu-98" target="_blank" rel="noreferrer">
            GitHub · daniel-bu-98
          </a>
        </div>
      </footer>
    </main>
  );
}
