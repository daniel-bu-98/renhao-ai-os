(function () {
  "use strict";

  const Store = window.TravelStore;
  const Auth = window.TravelAuth;
  const UI = window.UI;

  function user() {
    return Auth.currentSession();
  }

  function userProfile() {
    const db = Store.getData();
    const session = user();
    if (!session) return null;
    const account = db.accounts.find((a) => a.username === session.username || a.displayName === session.displayName);
    if (account && account.userId) {
      const userById = db.users.find((u) => Number(u.id) === Number(account.userId));
      if (userById) return userById;
    }
    return db.users.find((u) =>
      Number(u.id) === Number(session.id) ||
      u.username === session.displayName ||
      u.username === session.username
    ) || null;
  }

  function currentUserId() {
    const profile = userProfile();
    return profile ? Number(profile.id) : undefined;
  }

  function renderRoutes() {
    const dest = document.getElementById("filterDest")?.value || "";
    const days = document.getElementById("filterDays")?.value || "";
    const min = Number(document.getElementById("filterMin")?.value || 0);
    const max = Number(document.getElementById("filterMax")?.value || 999999);
    const keyword = (document.getElementById("filterKeyword")?.value || "").trim().toLowerCase();

    const list = Store.getData().routes.filter((r) => {
      if (dest && r.city !== dest) return false;
      if (days === "1" && !/2天|1天/.test(r.days)) return false;
      if (days === "2" && !/3天|4天/.test(r.days)) return false;
      if (days === "3" && !/5天|6天/.test(r.days)) return false;
      if (days === "4" && !/8天|7天/.test(r.days)) return false;
      if (r.price < min || r.price > max) return false;
      if (keyword && !(`${r.name}${r.city}${r.tags.join("")}${r.description}`.toLowerCase().includes(keyword))) return false;
      return true;
    });

    const wrap = document.getElementById("routesGrid");
    if (!list.length) {
      wrap.innerHTML = `<div class="empty"><div class="empty-icon">🗺️</div><h3>暂无符合条件的线路</h3></div>`;
      return;
    }

    wrap.innerHTML = list.map((r) => `
      <article class="route-card">
        <div class="route-cover" style="background-image:url('${r.cover}')">
          <span class="route-tag">${UI.escapeHtml(r.city)}</span>
          <span class="price-chip">${UI.money(r.price)} 起</span>
        </div>
        <div class="route-body">
          <h3>${UI.escapeHtml(r.name)}</h3>
          <div class="route-meta">
            <span>${UI.escapeHtml(r.days)}</span>
            <span>⭐ ${r.rating}分</span>
            <span>余位 ${r.remaining}</span>
          </div>
          <div class="route-meta">${r.tags.map((t) => `<span class="badge badge-blue">${UI.escapeHtml(t)}</span>`).join("")}</div>
          <p class="muted" style="margin:0;font-size:13px;line-height:1.6">${UI.escapeHtml(r.description)}</p>
          <div class="route-foot">
            <button class="btn btn-outline btn-sm" data-action="route-detail" data-id="${r.id}">查看详情</button>
            <button class="btn btn-primary btn-sm" data-action="book" data-id="${r.id}">立即预订</button>
          </div>
        </div>
      </article>
    `).join("");
  }

  function renderOrders() {
    const status = document.getElementById("orderStatus")?.value || "";
    const keyword = (document.getElementById("orderKeyword")?.value || "").trim().toLowerCase();
    const list = Store.userOrders(currentUserId()).filter((o) => {
      if (status && o.status !== status) return false;
      if (keyword && !(`${o.no}${o.route}`.toLowerCase().includes(keyword))) return false;
      return true;
    });
    const wrap = document.getElementById("ordersBody");
    if (!list.length) {
      wrap.innerHTML = `<tr><td colspan="8"><div class="empty">暂无订单</div></td></tr>`;
      return;
    }
    wrap.innerHTML = list.map((o) => `
      <tr>
        <td class="mono">${UI.escapeHtml(o.no)}</td>
        <td>${UI.escapeHtml(o.route)}</td>
        <td>${UI.escapeHtml(o.schedule)}</td>
        <td>${o.people}人</td>
        <td class="money">${UI.money(o.amount)}</td>
        <td><span class="badge ${UI.statusClass(o.status)}">${UI.escapeHtml(o.status)}</span></td>
        <td>${UI.fmtDateTime(o.time)}</td>
        <td>
          ${o.status === "待支付" ? `<button class="btn btn-success btn-sm" data-action="pay-order" data-no="${o.no}">支付</button> <button class="btn btn-danger btn-sm" data-action="cancel-order" data-no="${o.no}">取消</button>` : ""}
        </td>
      </tr>
    `).join("");
  }

  function renderComments() {
    const keyword = (document.getElementById("commentKeyword")?.value || "").trim().toLowerCase();
    const list = Store.userComments(currentUserId()).filter((c) => !keyword || `${c.route}${c.content}`.toLowerCase().includes(keyword));
    const wrap = document.getElementById("commentsBody");
    if (!list.length) {
      wrap.innerHTML = `<tr><td colspan="6"><div class="empty">暂无评论</div></td></tr>`;
      return;
    }
    wrap.innerHTML = list.map((c) => `
      <tr>
        <td>${c.id}</td>
        <td>${UI.escapeHtml(c.route)}</td>
        <td>${UI.stars(c.rating)} ${c.rating}</td>
        <td>${UI.escapeHtml(c.content)}</td>
        <td><span class="badge ${UI.statusClass(c.status)}">${UI.escapeHtml(c.status)}</span></td>
        <td>${UI.fmtDateTime(c.time)}</td>
      </tr>
    `).join("");
  }

  function openRouteDetail(id) {
    const r = Store.routeById(id);
    if (!r) return;
    document.getElementById("detailImage").style.backgroundImage = `url('${r.cover}')`;
    document.getElementById("detailName").textContent = r.name;
    document.getElementById("detailMeta").innerHTML = `
      <span>${UI.escapeHtml(r.from)}出发</span>
      <span>${UI.escapeHtml(r.days)}</span>
      <span>${UI.stars(r.rating)} ${r.rating}分</span>
    `;
    document.getElementById("detailPrice").textContent = UI.money(r.price);
    document.getElementById("detailRemaining").textContent = `${r.remaining} 位`;
    document.getElementById("detailDescription").textContent = r.description;
    document.getElementById("detailHighlights").innerHTML = (r.highlights || []).map((h) => `<span class="badge badge-blue">${UI.escapeHtml(h)}</span>`).join("");
    document.getElementById("detailIncludes").innerHTML = (r.includes || []).map((item) => `<span class="badge badge-green">${UI.escapeHtml(item)}</span>`).join("");
    document.getElementById("routeDetailModal").classList.add("open");
    document.getElementById("detailBook").dataset.id = r.id;
  }

  function openBookModal(id) {
    const r = Store.routeById(id);
    if (!r) return;
    document.getElementById("bookRouteName").textContent = r.name;
    document.getElementById("bookRouteMeta").textContent = `${r.days} · ${r.city}`;
    document.getElementById("bookPrice").textContent = UI.money(r.price);
    document.getElementById("peopleCount").textContent = 1;
    document.getElementById("bookTotal").textContent = UI.money(r.price);
    const scheduleSel = document.getElementById("bookSchedule");
    if (scheduleSel) {
      scheduleSel.innerHTML = (r.schedules || []).map((s) => `<option>${UI.escapeHtml(s)}</option>`).join("");
    }
    document.getElementById("bookModal").dataset.routeId = r.id;
    document.getElementById("bookModal").classList.add("open");
  }

  function submitBooking() {
    const routeId = document.getElementById("bookModal").dataset.routeId;
    const r = Store.routeById(routeId);
    if (!r) return;
    const people = Number(document.getElementById("peopleCount").textContent);
    const schedule = document.getElementById("bookSchedule")?.value || (r.schedules || [])[0] || "近期成团";
    const method = document.querySelector("[data-method].btn-primary")?.dataset.method || "微信支付";
    const order = Store.createOrder({
      routeId,
      user: userProfile()?.username || user().displayName,
      people,
      schedule,
      method,
      amount: r.price * people
    });
    if (!order) return;
    document.getElementById("bookModal").classList.remove("open");
    document.getElementById("paymentOrderNo").textContent = order.no;
    document.getElementById("paymentAmount").textContent = UI.money(order.amount);
    document.getElementById("paymentModal").classList.add("open");
  }

  function submitPayment() {
    const no = document.getElementById("paymentOrderNo").textContent.trim();
    const method = document.querySelector("#paymentMethods [data-method].btn-primary")?.dataset.method || "微信支付";
    const payment = Store.payOrder(no, method, currentUserId());
    if (payment) {
      document.getElementById("paymentModal").classList.remove("open");
      UI.toast("支付成功，已生成订单");
      UI.showPage("orders", renderers);
    }
  }

  function payExistingOrder(no) {
    const order = Store.findOrderByNo(no, currentUserId());
    if (!order) {
      UI.toast("只能操作自己的订单");
      return;
    }
    document.getElementById("paymentOrderNo").textContent = order.no;
    document.getElementById("paymentAmount").textContent = UI.money(order.amount);
    document.getElementById("paymentModal").classList.add("open");
  }

  function cancelExistingOrder(no) {
    if (Store.cancelOrder(no, currentUserId())) {
      UI.toast("订单已取消");
      renderOrders();
    } else {
      UI.toast("只能取消自己的待支付订单");
    }
  }

  function openCommentModal() {
    const select = document.getElementById("newCommentRoute");
    if (select && select.options.length <= 1) {
      select.innerHTML = '<option value="">请选择线路</option>' +
        Store.getData().routes.map((r) => `<option value="${r.id}">${UI.escapeHtml(r.name)}</option>`).join("");
    }
    document.getElementById("commentModal").classList.add("open");
  }

  function addNewComment() {
    const routeId = document.getElementById("newCommentRoute").value;
    const rating = Number(document.getElementById("newCommentRating").value);
    const content = document.getElementById("newCommentContent").value;
    if (!routeId || !content.trim()) {
      UI.toast("请选择线路并填写评论内容");
      return;
    }
    const comment = Store.addComment({
      user: userProfile()?.username || user().displayName,
      routeId,
      rating,
      content
    });
    if (comment) {
      document.getElementById("newCommentContent").value = "";
      document.getElementById("commentModal").classList.remove("open");
      UI.toast("评论已提交，等待管理员审核");
      renderComments();
    }
  }

  function bindActions() {
    document.addEventListener("click", (e) => {
      const el = e.target.closest("[data-action]");
      if (!el) return;
      const action = el.dataset.action;
      if (action === "route-detail") openRouteDetail(el.dataset.id);
      if (action === "book") openBookModal(el.dataset.id);
      if (action === "close-modal") UI.closeModal(el.closest(".modal-backdrop"));
      if (action === "people-minus") changePeople(-1);
      if (action === "people-plus") changePeople(1);
      if (action === "choose-method") chooseMethod(el.dataset.method);
      if (action === "submit-booking") submitBooking();
      if (action === "submit-payment") submitPayment();
      if (action === "pay-order") payExistingOrder(el.dataset.no);
      if (action === "cancel-order") cancelExistingOrder(el.dataset.no);
      if (action === "open-comment") openCommentModal();
      if (action === "submit-comment") addNewComment();
    });

    document.querySelectorAll(".filter-round").forEach((input) => {
      input.addEventListener("input", (e) => {
        const page = e.target.closest(".page-panel")?.id || "routes";
        if (page === "page-routes") renderRoutes();
        if (page === "page-orders") renderOrders();
        if (page === "page-comments") renderComments();
      });
    });

    const resetBtn = document.getElementById("resetRoutes");
    if (resetBtn) resetBtn.addEventListener("click", () => {
      ["filterDest", "filterDays", "filterMin", "filterMax", "filterKeyword"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      });
      renderRoutes();
    });

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) logoutBtn.addEventListener("click", () => {
      Auth.logout();
      window.location.href = "index.html";
    });
  }

  function changePeople(n) {
    const routeId = document.getElementById("bookModal").dataset.routeId;
    const r = Store.routeById(routeId);
    if (!r) return;
    const current = Number(document.getElementById("peopleCount").textContent);
    const next = Math.max(1, Math.min(r.remaining, current + n));
    document.getElementById("peopleCount").textContent = next;
    document.getElementById("bookTotal").textContent = UI.money(r.price * next);
  }

  function chooseMethod(method) {
    document.querySelectorAll("[data-method]").forEach((btn) => {
      btn.classList.toggle("btn-primary", btn.dataset.method === method);
      btn.classList.toggle("btn-outline", btn.dataset.method !== method);
    });
  }

  const renderers = {
    routes: renderRoutes,
    orders: renderOrders,
    comments: renderComments
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (!Auth.requireLogin() || !Auth.hasRole("user", "guest")) {
      window.location.href = "index.html";
      return;
    }
    Store.load();
    UI.renderClock("clock", "currentUser", userProfile()?.username || user().displayName);
    UI.bindNav(renderers);
    UI.bindModalClose();
    bindActions();
    UI.showPage("routes", renderers);
  });
})();
