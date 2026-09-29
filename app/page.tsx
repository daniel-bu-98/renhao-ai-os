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
    </main>
  );
}
