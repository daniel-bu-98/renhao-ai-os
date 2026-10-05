(function () {
  "use strict";

  const Store = window.TravelStore;
  const Auth = window.TravelAuth;
  const UI = window.UI;
  const db = () => Store.getData();

  function renderDashboard() {
    const s = Store.stats();
    document.getElementById("statRoutes").textContent = s.routes;
    document.getElementById("statOrders").textContent = s.orders;
    document.getElementById("statRevenue").textContent = "¥" + s.revenue.toLocaleString("zh-CN");
    document.getElementById("statUsers").textContent = s.users;
    document.getElementById("statPendingComments").textContent = s.pendingComments;

    const recent = [...db().orders].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);
    document.getElementById("recentOrders").innerHTML = recent.map((o) => `
      <tr>
        <td class="mono">${UI.escapeHtml(o.no)}</td>
        <td>${UI.escapeHtml(o.user)}</td>
        <td>${UI.escapeHtml(o.route)}</td>
        <td>${UI.escapeHtml(o.schedule)}</td>
        <td>${o.people}人</td>
        <td class="money">${UI.money(o.amount)}</td>
        <td><span class="badge ${UI.statusClass(o.status)}">${UI.escapeHtml(o.status)}</span></td>
      </tr>
    `).join("");

    const topRoutes = [...db().routes].sort((a, b) => b.rating - a.rating).slice(0, 4);
    document.getElementById("topRoutes").innerHTML = topRoutes.map((r) => `
      <div class="card list-card route-item">
        <div class="user-line">
          <div class="avatar">${UI.escapeHtml(r.city.slice(0, 1))}</div>
          <div>
            <div style="font-weight:800">${UI.escapeHtml(r.name)}</div>
            <div class="muted" style="font-size:13px">${UI.stars(r.rating)} ${r.rating}分 · ${r.city}</div>
          </div>
        </div>
      </div>
    `).join("");
  }

  function renderOrders() {
    const status = document.getElementById("orderStatus")?.value || "";
    const keyword = (document.getElementById("orderKeyword")?.value || "").trim().toLowerCase();
    const list = db().orders.filter((o) => {
      if (status && o.status !== status) return false;
      if (keyword && !(`${o.user}${o.no}${o.route}`.toLowerCase().includes(keyword))) return false;
      return true;
    });
    const wrap = document.getElementById("ordersBody");
    if (!list.length) {
      wrap.innerHTML = `<tr><td colspan="9"><div class="empty">暂无订单</div></td></tr>`;
      return;
    }
    wrap.innerHTML = list.map((o) => `
      <tr>
        <td class="mono">${UI.escapeHtml(o.no)}</td>
        <td>${UI.escapeHtml(o.user)}</td>
        <td>${UI.escapeHtml(o.route)}</td>
        <td>${UI.escapeHtml(o.schedule)}</td>
        <td>${o.people}人</td>
        <td class="money">${UI.money(o.amount)}</td>
        <td><span class="badge ${UI.statusClass(o.status)}">${UI.escapeHtml(o.status)}</span></td>
        <td>${UI.fmtDateTime(o.time)}</td>
        <td>
          ${o.status === "待支付" ? `<button class="btn btn-success btn-sm" data-action="pay-order" data-no="${o.no}">支付</button> <button class="btn btn-danger btn-sm" data-action="cancel-order" data-no="${o.no}">取消</button>` : ""}
          ${o.status === "已支付" ? `<button class="btn btn-primary btn-sm" data-action="complete-order" data-no="${o.no}">完成</button>` : ""}
        </td>
      </tr>
    `).join("");
  }

  function renderPayments() {
    const status = document.getElementById("payStatus")?.value || "";
    const method = document.getElementById("payMethod")?.value || "";
    const list = db().payments.filter((p) => {
      if (status && p.status !== status) return false;
      if (method && p.method !== method) return false;
      return true;
    });
    const wrap = document.getElementById("paymentsBody");
    if (!list.length) {
      wrap.innerHTML = `<tr><td colspan="8"><div class="empty">暂无支付记录</div></td></tr>`;
      return;
    }
    wrap.innerHTML = list.map((p) => `
      <tr>
        <td class="mono">${UI.escapeHtml(p.id)}</td>
        <td class="mono">${UI.escapeHtml(p.orderNo)}</td>
        <td>${UI.escapeHtml(p.user)}</td>
        <td>${UI.escapeHtml(p.method)}</td>
        <td class="money">${UI.money(p.amount)}</td>
        <td><span class="badge ${UI.statusClass(p.status)}">${UI.escapeHtml(p.status)}</span></td>
        <td>${UI.fmtDateTime(p.time)}</td>
        <td>
          ${p.status === "支付成功" ? `<button class="btn btn-danger btn-sm" data-action="refund" data-id="${p.id}">退款</button>` : ""}
        </td>
      </tr>
    `).join("");
  }

  function renderComments() {
    const status = document.getElementById("commentStatus")?.value || "";
    const keyword = (document.getElementById("commentKeyword")?.value || "").trim().toLowerCase();
    const list = db().comments.filter((c) => {
      if (status && c.status !== status) return false;
      if (keyword && !(`${c.user}${c.route}${c.content}`.toLowerCase().includes(keyword))) return false;
      return true;
    });
    const wrap = document.getElementById("commentsBody");
    if (!list.length) {
      wrap.innerHTML = `<tr><td colspan="7"><div class="empty">暂无评论</div></td></tr>`;
      return;
    }
    wrap.innerHTML = list.map((c) => `
      <tr>
        <td>${c.id}</td>
        <td>${UI.escapeHtml(c.user)}</td>
        <td>${UI.escapeHtml(c.route)}</td>
        <td>${UI.stars(c.rating)} ${c.rating}</td>
        <td>${UI.escapeHtml(c.content)}</td>
        <td><span class="badge ${UI.statusClass(c.status)}">${UI.escapeHtml(c.status)}</span></td>
        <td>
          ${c.status === "待审核" ? `<button class="btn btn-success btn-sm" data-action="approve-comment" data-id="${c.id}">通过</button> <button class="btn btn-danger btn-sm" data-action="reject-comment" data-id="${c.id}">拒绝</button>` : ""}
        </td>
      </tr>
    `).join("");
  }

  function renderUsers() {
    const keyword = (document.getElementById("userKeyword")?.value || "").trim().toLowerCase();
    const list = db().users.filter((u) => !keyword || `${u.username}${u.phone}${u.email}`.toLowerCase().includes(keyword));
    const wrap = document.getElementById("usersBody");
    if (!list.length) {
      wrap.innerHTML = `<tr><td colspan="6"><div class="empty">暂无用户</div></td></tr>`;
      return;
    }
    wrap.innerHTML = list.map((u) => `
      <tr>
        <td>${u.id}</td>
        <td>
          <div class="user-line">
            <div class="avatar">${UI.escapeHtml(u.username.slice(0, 1))}</div>
            <strong>${UI.escapeHtml(u.username)}</strong>
          </div>
        </td>
        <td>${UI.escapeHtml(u.sex)} · ${u.age}岁</td>
        <td class="mono">${UI.escapeHtml(u.phone)}</td>
        <td>${UI.escapeHtml(u.email)}</td>
        <td><span class="badge ${UI.statusClass(u.status)}">${UI.escapeHtml(u.status)}</span></td>
      </tr>
    `).join("");
  }

  function openPayment(no) {
    const order = Store.findByNo(no);
    if (!order) return;
    document.getElementById("paymentOrderNo").textContent = order.no;
    document.getElementById("paymentAmount").textContent = UI.money(order.amount);
    document.getElementById("paymentModal").classList.add("open");
  }

  function bindActions() {
    document.addEventListener("click", (e) => {
      const el = e.target.closest("[data-action]");
      if (!el) return;
      const action = el.dataset.action;
      if (action === "close-modal") UI.closeModal(el.closest(".modal-backdrop"));
      if (action === "pay-order") openPayment(el.dataset.no);
      if (action === "cancel-order") {
        if (Store.cancelOrder(el.dataset.no)) {
          UI.toast("订单已取消");
          renderOrders();
        }
      }
      if (action === "complete-order") {
        if (Store.completeOrder(el.dataset.no)) {
          UI.toast("订单已完成");
          renderOrders();
        }
      }
      if (action === "submit-payment") {
        const no = document.getElementById("paymentOrderNo").textContent.trim();
        if (Store.payOrder(no, "管理员代付")) {
          document.getElementById("paymentModal").classList.remove("open");
          UI.toast("支付成功");
          renderOrders();
        }
      }
      if (action === "refund") {
        if (Store.refundPayment(el.dataset.id)) {
          UI.toast("退款已处理");
          renderPayments();
        }
      }
      if (action === "approve-comment") setCommentStatus(el.dataset.id, "已通过");
      if (action === "reject-comment") setCommentStatus(el.dataset.id, "已拒绝");
      if (action === "open-user") document.getElementById("userModal").classList.add("open");
      if (action === "submit-user") addUser();
    });

    document.querySelectorAll(".filter-round").forEach((input) => {
      input.addEventListener("input", (e) => {
        const page = e.target.closest(".page-panel")?.id || "dashboard";
        if (page === "page-dashboard") renderDashboard();
        if (page === "page-orders") renderOrders();
        if (page === "page-payments") renderPayments();
        if (page === "page-comments") renderComments();
        if (page === "page-users") renderUsers();
      });
    });

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) logoutBtn.addEventListener("click", () => {
      Auth.logout();
      window.location.href = "index.html";
    });
  }

  function setCommentStatus(id, status) {
    if (Store.setCommentStatus(id, status)) {
      UI.toast(status === "已通过" ? "评论已通过" : "评论已拒绝");
      renderComments();
    }
  }

  function addUser() {
    const username = document.getElementById("newUserName").value.trim();
    const sex = document.getElementById("newUserSex").value;
    const age = document.getElementById("newUserAge").value.trim();
    const phone = document.getElementById("newUserPhone").value.trim();
    const email = document.getElementById("newUserEmail").value.trim();
    if (!username || !age || !phone || !email) {
      UI.toast("请填写完整用户信息");
      return;
    }
    Store.addUser({ username, sex, age: Number(age), phone, email });
    document.getElementById("userModal").classList.remove("open");
    ["newUserName", "newUserAge", "newUserPhone", "newUserEmail"].forEach((id) => document.getElementById(id).value = "");
    renderUsers();
    UI.toast("用户已添加");
  }

  const renderers = {
    dashboard: renderDashboard,
    orders: renderOrders,
    payments: renderPayments,
    comments: renderComments,
    users: renderUsers
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (!Auth.requireLogin() || !Auth.hasRole("admin")) {
      window.location.href = "index.html";
      return;
    }
    Store.load();
    UI.renderClock("clock", "currentUser", Auth.currentSession().displayName);
    UI.bindNav(renderers);
    UI.bindModalClose();
    bindActions();
    UI.showPage("dashboard", renderers);
  });
})();
