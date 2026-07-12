"use client";

import { useEffect, useMemo, useState } from "react";

const navItems = [
  { id: "about", label: "01 个人介绍" },
  { id: "competencies", label: "02 核心能力" },
  { id: "career", label: "03 十年经历" },
  { id: "experience", label: "04 工作经历" },
  { id: "projects", label: "05 项目与研究" },
  { id: "recognition", label: "06 奖项与认证" },
  { id: "contact", label: "07 联系方式" },
];

const competencies = [
  {
    icon: "AI",
    title: "AI Data Project Management",
    description: "AI 数据项目全生命周期管理",
  },
  {
    icon: "OP",
    title: "Data Operational System Building",
    description: "数据运营体系、流程及平台建设",
  },
  {
    icon: "PE",
    title: "Prompt Engineering",
    description: "基于业务场景设计 Prompt、Copilot 及 AI Workflow",
  },
  {
    icon: "VC",
    title: "Vibe Coding",
    description: "利用 Codex、GPT 等 AI 工具快速构建产品原型及轻量工具",
  },
  {
    icon: "AD",
    title: "Autonomous Driving",
    description: "熟悉自动驾驶数据采集、挖掘、标注、质检及交付流程",
  },
  {
    icon: "CF",
    title: "Cross-functional Collaboration",
    description: "协同算法、产品、平台、运营、供应商及全球团队推进项目",
  },
];

const journey = [
  {
    time: "2016–2020",
    name: "中国地质大学（武汉）",
    role: "地球信息科学与技术",
  },
  {
    time: "2020–2022",
    name: "腾讯地图",
    role: "数据运营工程师",
  },
  {
    time: "2022–2023",
    name: "理想汽车",
    role: "数据标注项目经理",
  },
  {
    time: "2023–2024",
    name: "新加坡国立大学",
    role: "应用地理信息系统",
  },
  {
    time: "2024–2025",
    name: "Momenta / 极氪汽车",
    role: "智能驾驶功能项目经理",
  },
  {
    time: "2025–至今",
    name: "博世",
    role: "数据标注高级项目经理",
  },
];

const workExperience = [
  {
    company: "博世（中国）投资有限公司",
    role: "数据标注高级项目经理 / Platform Owner",
    time: "2025–至今",
    bullets: [
      "负责自动驾驶数据标注项目全生命周期管理，覆盖需求分析、数据生产、质量管理及项目交付，累计支撑国内 Parking Static 及欧洲首个自动驾驶 SOP、OTA 等多个量产项目。",
      "主导国内 Parking Static 数据交付体系建设，建立采集、建图、数据生产、质检及交付全流程数字化管理机制，设计各环节 KPI 看板并持续优化数据有效率、人效等核心指标，保障项目透明、稳定运行，6 个月累计交付 30+ 个需求、40 万+ Units。",
      "统筹欧洲自动驾驶 AI 数据项目交付，协调中国、德国、印度等全球团队及 6 家供应商、500+ 标注人员协同生产，建立海外数据产线及标准化交付流程，累计交付 80 万+ Units，覆盖 12 条生产线。",
      "负责数据运营平台规划与建设，推动项目管理、成本管理、供应商管理及交付管理等核心模块数字化；结合 GPT、CodeX 等 AI 工具设计 AI Workflow、Copilot 及 AI Skills，推动数据运营流程自动化，持续提升团队运营效率。",
      "持续推动数据生产体系优化及协同交付，获得客户及团队高度认可，荣获 Customer Recognition、Innovation Award 及 On Quality Award 等多项奖励。",
    ],
  },
  {
    company: "理想汽车",
    role: "数据标注项目经理",
    time: "2022–2023",
    bullets: [
      "负责数据标注规范及平台需求对接，推动标注规范累计迭代 5 个版本，持续优化平台工具、数据生产流程，提升人工效率约 30%。",
      "负责 FSD Map 及 BEV 静态样本数据生产项目交付，统筹需求分析、生产计划、质量管理及跨团队协同，协调算法、平台开发、运营及采集团队推进项目实施，累计交付 100 万+ Clips 城区数据，支撑静态感知模型持续迭代及无图 NOA 量产。",
    ],
  },
  {
    company: "腾讯地图",
    role: "数据运营工程师",
    time: "2020–2022",
    bullets: [
      "负责 SD Map 路网及点要素数据运营，持续优化生产方案、平台能力及运营流程，通过数据分析及平台迭代降低生产 ROI 约 40%。",
      "主导 Indoor Parking 地图项目从 0 到 1 建设，负责数据生产方案设计、平台需求设计及生产流程规划，3 个月内完成 100+ 个停车场数据交付，支撑BMW SOP 停车场地图功能上线，获得Tencent Good+ Contributor及部门经理及时激励奖。",
    ],
  },
];

type ProjectItem = {
  title: string;
  description: string;
  tags: string[];
  detailType: "github" | "demo" | "onePage";
  href?: string;
  image?: string;
};

const projectItems: ProjectItem[] = [
  {
    title: "Operation Platform",
    description: "负责数据运营平台从需求分析、产品设计到上线落地，基于 Vibe Coding 方式完成平台开发，仅投入约 2 人月实现功能上线。",
    tags: ["Product", "Platform", "Vibe Coding"],
    detailType: "demo",
    href: "https://ai-data-operation-platform-demo.vercel.app",
  },
  {
    title: "AI Data Engine",
    description: "构建 AI Data Engine 方法论，覆盖 Data Foundation、Data Production、Data Operation、Data Platform 等模块，沉淀可复用的 AI 数据生产与运营框架。",
    tags: ["Methodology", "AI Data", "Framework"],
    detailType: "github",
    href: "https://github.com/daniel-bu-98/AI-Data-Engine/blob/main/3.Data%20Operation.md",
  },
  {
    title: "AI Data Operations Skills Library",
    description: "搭建团队 AI Skills Library，沉淀 Prompt、Copilot 与 Workflow，覆盖项目管理、数据运营、知识管理等高频工作场景。",
    tags: ["Prompt", "Workflow", "AI Productivity"],
    detailType: "demo",
    href: "https://chatgpt.com/g/g-6a4b21c4ac048191abd04e3319b33045-rule-format-configuration-copilot",
  },
  {
    title: "Spatial Prior Knowledge for Autonomous Driving Data Mining",
    description: "基于 GIS 空间分析、道路网络与场景先验，设计自动驾驶数据挖掘策略，用于提升 Corner Case 场景发现效率和数据采集有效率。",
    tags: ["Data Mining", "Spatial Computing", "Autonomous Driving"],
    detailType: "onePage",
    image: "/research/scenario-mining-spatial-prior-knowledge.png",
  },
  {
    title: "Navigation Data Production Methodology",
    description: "基于在导航电子地图行业的经验，总结出地图数据的生产策略、核心技术、关键指标以及相应展望，供相关人员参考。",
    tags: ["Methodology", "Map Data", "Knowledge"],
    detailType: "onePage",
    image: "/research/navigation-data-production.png",
  },
  {
    title: "Traffic Light Detection Based on Prior Knowledge",
    description: "基于新加坡热带城市环境，通过深度学习的方法研究城市交通灯检测。使用 YOLOv5m 模型进行训练和测试，并基于路网先验知识优化推理逻辑，检测准确率提高了3%。",
    tags: ["Computer Vision", "YOLOv5m", "研究"],
    detailType: "onePage",
    image: "/research/singapore-traffic-light-detection.png",
  },
];

const recognitions = [
  { name: "业务创新奖", organization: "博世创新与软件开发中心", year: "2026" },
  { name: "交付质量奖", organization: "博世智能驾驶与控制事业部", year: "2026" },
  { name: "客户认可奖", organization: "博世创新与软件开发中心", year: "2025" },
  { name: "年度卓越团队", organization: "博世创新与软件开发中心", year: "2025" },
  { name: "Good+ Contributor", organization: "腾讯地图", year: "2022" },
  { name: "部门经理即时激励奖", organization: "腾讯地图", year: "2021" },
];

const certificates = [
  { name: "FMP（项目管理）", organization: "BOSCH", year: "2026" },
  { name: "Machine Learning", organization: "Coursera - Stanford University Online", year: "2024" },
  { name: "AI Product Manager", organization: "Coursera - Stanford University Online", year: "2024" },
  { name: "IELTS 6.5", organization: "British Council", year: "2023" },
  { name: "Map Data Production Coach", organization: "Tencent Map", year: "2021" },
];

type ModalState = {
  title: string;
  image?: string;
};

function SectionIntro({ label, title, description }: { label: string; title: string; description?: string }) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function ProjectAction({ item, onOpen }: { item: ProjectItem; onOpen: (title: string, image?: string) => void }) {
  if (item.detailType === "onePage") {
    return (
      <button className="detail-link button-reset" type="button" onClick={() => onOpen(item.title, item.image)}>
        One-Page Research
      </button>
    );
  }

  return (
    <a className="detail-link" href={item.href} target="_blank" rel="noreferrer">
      {item.detailType === "demo" ? "打开 Demo" : "查看 GitHub"}
    </a>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [modal, setModal] = useState<ModalState | null>(null);
  const [zoom, setZoom] = useState(1);
  const [portraitMissing, setPortraitMissing] = useState(false);
  const [researchImageMissing, setResearchImageMissing] = useState(false);

  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-20% 0px -58% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    if (!modal) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModal(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [modal]);

  const openModal = (title: string, image?: string) => {
    setZoom(1);
    setResearchImageMissing(false);
    setModal({ title, image });
  };

  return (
    <main>
      <aside className="side-nav" aria-label="页面目录">
        <a className="side-brand" href="#about">
          <strong>BU Renhao</strong>
          <span>AI 数据项目经理</span>
        </a>
        <nav>
          {navItems.map((item) => (
            <a className={activeSection === item.id ? "active" : ""} href={`#${item.id}`} key={item.id}>
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <div className="page-shell">
        <section id="about" className="hero section-block">
          <div className="hero-grid">
            <div>
              <p className="eyebrow">个人作品集</p>
              <h1>BU Renhao</h1>
              <p className="hero-subtitle">
                AI 数据项目经理
                <br />
                自动驾驶数据运营
                <br />
                数据运营体系建设者
              </p>
              <p className="hero-description">
                让复杂的 AI 数据生产，
                <br />
                稳定地交付价值。
              </p>
              <p className="hero-body">
                拥有多年地图、自动驾驶及 AI 数据领域经验，专注于数据项目全生命周期管理、规模化数据生产交付、数据运营体系建设及 AI 工具落地。先后参与腾讯地图、理想汽车、Momenta / 极氪及博世相关项目，持续通过流程、平台与 AI 技术提升数据生产效率和交付质量。
              </p>
            </div>
            <div className="portrait-card" aria-label="个人照片">
              {!portraitMissing ? (
                <img src="/profile/bu-renhao.jpg" alt="BU Renhao 个人照片" onError={() => setPortraitMissing(true)} />
              ) : (
                <div>
                  <span>个人照片待补充</span>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="competencies" className="section-block">
          <SectionIntro label="核心能力" title="连接数据、项目、平台与 AI 的实践能力。" />
          <div className="competency-grid">
            {competencies.map((item) => (
              <article className="competency-card" key={item.title}>
                <span className="competency-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="career" className="section-block">
          <SectionIntro
            label="十年经历"
            title="十年学习与职业路径"
            description="从 GIS 到自动驾驶，再到 AI 数据平台，不断拓展数据工程与项目管理能力。"
          />
          <div className="journey-timeline">
            {journey.map((item) => (
              <article key={item.name}>
                <time>{item.time}</time>
                <h3>{item.name}</h3>
                <p>{item.role}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section-block">
          <SectionIntro
            label="工作经历"
            title="工作经历"
            description="持续围绕 AI 数据生产、平台建设及项目交付展开实践。"
          />
          <div className="experience-list">
            {workExperience.map((item) => (
              <article className="experience-card" key={item.company}>
                <div className="experience-meta">
                  <h3>{item.company}</h3>
                  <p>{item.role}</p>
                </div>
                <div className="experience-detail">
                  <span>{item.time}</span>
                  <ul>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section-block">
          <SectionIntro
            label="项目与研究"
            title="项目与研究"
            description="围绕数据运营平台、AI 数据方法论、AI Workflow 与自动驾驶研究的实践沉淀。"
          />
          <div className="card-grid">
            {projectItems.map((item) => (
              <article className="content-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="tag-row">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <ProjectAction item={item} onOpen={openModal} />
              </article>
            ))}
          </div>
        </section>

        <section id="recognition" className="section-block">
          <SectionIntro label="奖项与认证" title="奖项与认证" />
          <div className="recognition-grid">
            <article>
              <h3>奖项与认可</h3>
              {recognitions.map((item) => (
                <div className="recognition-item" key={`${item.name}-${item.year}`}>
                  <strong>{item.name}</strong>
                  <span>{item.organization}</span>
                  <em>{item.year}</em>
                </div>
              ))}
            </article>
            <article>
              <h3>专业认证</h3>
              {certificates.map((item) => (
                <div className="recognition-item" key={`${item.name}-${item.year}`}>
                  <strong>{item.name}</strong>
                  <span>{item.organization}</span>
                  <em>{item.year}</em>
                </div>
              ))}
            </article>
          </div>
        </section>

        <footer id="contact" className="section-block contact-section">
          <SectionIntro
            label="联系方式"
            title="联系我"
            description="欢迎围绕 AI 数据、自动驾驶、平台建设及 AI 应用进行交流。"
          />
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
      </div>

      {modal ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${modal.title} 研究一页纸`} onClick={() => setModal(null)}>
          <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
            <div className="modal-toolbar">
              <div>
                <p>研究一页纸</p>
                <h3>{modal.title}</h3>
              </div>
              <div className="modal-actions">
                <button type="button" aria-label="缩小" onClick={() => setZoom((current) => Math.max(0.7, current - 0.1))}>-</button>
                <span>{Math.round(zoom * 100)}%</span>
                <button type="button" aria-label="放大" onClick={() => setZoom((current) => Math.min(1.8, current + 0.1))}>+</button>
                <button type="button" onClick={() => setModal(null)}>关闭</button>
              </div>
            </div>
            <div className="research-preview">
              {modal.image && !researchImageMissing ? (
                <img
                  src={modal.image}
                  alt={`${modal.title} 研究一页纸`}
                  onError={() => setResearchImageMissing(true)}
                  style={{ transform: `scale(${zoom})` }}
                />
              ) : (
                <div className="empty-preview" style={{ transform: `scale(${zoom})` }}>
                  <span>研究图片待补充</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
