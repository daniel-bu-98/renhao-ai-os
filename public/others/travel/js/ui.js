(function (global) {
  "use strict";

  function fmtDateTime(iso) {
    const d = new Date(iso);
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
  }

  function money(n) {
    return "¥" + Number(n).toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function stars(rating) {
    return "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));
  }

  function statusClass(status) {
    if (["已支付", "支付成功", "已完成", "已通过", "正常"].includes(status)) return "badge-green";
    if (["待支付", "待审核", "待处理"].includes(status)) return "badge-amber";
    if (["已取消", "支付失败", "已拒绝"].includes(status)) return "badge-red";
    return "badge-blue";
  }

  function escapeHtml(text) {
    return String(text)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function toast(message) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 2200);
  }

  function closeModal(backdrop) {
    backdrop.classList.remove("open");
  }

  function renderClock(clockId, userLabelId, displayName) {
    const clock = document.getElementById(clockId);
    if (!clock) return;
    const p = (n) => String(n).padStart(2, "0");
    const update = () => {
      const d = new Date();
      clock.textContent = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
    };
    update();
    setInterval(update, 1000);
    const userLabel = document.getElementById(userLabelId);
    if (userLabel) userLabel.textContent = displayName;
  }

  function bindNav(renderers) {
    document.querySelectorAll("[data-page]").forEach((btn) => btn.addEventListener("click", () => {
      showPage(btn.dataset.page, renderers);
    }));
  }

  function showPage(name, renderers) {
    document.querySelectorAll(".page-panel").forEach((p) => p.classList.add("hidden"));
    const target = document.getElementById("page-" + name);
    if (target) target.classList.remove("hidden");
    document.querySelectorAll("[data-page]").forEach((btn) => btn.classList.toggle("active", btn.dataset.page === name));
    window.scrollTo({ top: 0 });
    const render = renderers[name];
    if (render) render();
  }

  function bindModalClose() {
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) backdrop.classList.remove("open");
      });
    });
  }

  global.UI = {
    fmtDateTime,
    money,
    stars,
    statusClass,
    escapeHtml,
    toast,
    closeModal,
    renderClock,
    bindNav,
    showPage,
    bindModalClose
  };
})(window);
