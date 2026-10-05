(function (global) {
  "use strict";

  const STORAGE_KEY = "travel-preview-v5";
  const LEGACY_KEY = "travel-preview-v1";
  const SESSION_KEY = "travel-session-v2";
  const DAY_MS = 24 * 60 * 60 * 1000;

  function daysAgo(n, hourOffset) {
    const d = new Date(Date.now() - n * DAY_MS);
    if (hourOffset) d.setHours(d.getHours() - hourOffset);
    return d.toISOString();
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function seedData() {
    return {
      version: 2,
      accounts: [
        { id: 101, username: "admin", password: "123456", displayName: "管理员", role: "admin", portal: "admin", userId: null },
        { id: 102, username: "demo", password: "123456", displayName: "爱旅游", role: "user", portal: "user", userId: 1 }
      ],
      users: [
        { id: 1, username: "爱旅游", sex: "女", age: 28, phone: "13800001234", email: "lili@example.com", status: "正常", role: "普通用户" },
        { id: 2, username: "小清", sex: "女", age: 31, phone: "13900005678", email: "xiaoqing@example.com", status: "正常", role: "普通用户" },
        { id: 3, username: "晴空万里", sex: "男", age: 35, phone: "13600007890", email: "qingkong@example.com", status: "正常", role: "普通用户" },
        { id: 4, username: "河", sex: "男", age: 26, phone: "13500001122", email: "he@example.com", status: "正常", role: "普通用户" }
      ],
      routes: [
        {
          id: 1,
          name: "黄山经典三日游",
          city: "黄山",
          from: "上海",
          days: "3天2晚",
          price: 1280,
          rating: 4.8,
          reviews: 128,
          remaining: 12,
          cover: "assets/images/routes/huangshan.jpg",
          tags: ["山岳风光", "观日出", "奇松怪石"],
          schedules: ["10月12日 07:30", "10月18日 08:00", "10月25日 07:30"],
          description: "黄山四大绝景：奇松、怪石、云海、温泉。登光明顶看日出，游始信峰和西海大峡谷。",
          highlights: ["迎客松", "光明顶日出", "西海大峡谷", "宏村徽派古村"],
          includes: ["往返高铁二等座", "山顶酒店一晚", "黄山门票与索道", "专业导游"]
        },
        {
          id: 2,
          name: "杭州西湖诗画四日游",
          city: "杭州西湖",
          from: "北京",
          days: "4天3晚",
          price: 1680,
          rating: 4.7,
          reviews: 210,
          remaining: 18,
          cover: "assets/images/routes/xihu.jpg",
          tags: ["湖光", "园林", "亲子"],
          schedules: ["10月18日 08:00", "10月25日 08:00"],
          description: "环西湖游览苏堤、断桥、雷峰塔，漫步河坊街，体验龙井问茶。",
          highlights: ["苏堤春晓", "断桥残雪", "雷峰夕照", "龙井茶园"],
          includes: ["西湖游船", "龙井村品茶", "湖滨酒店", "杭帮菜晚宴"]
        },
        {
          id: 3,
          name: "张家界峰林探险五日游",
          city: "张家界",
          from: "广州",
          days: "5天4晚",
          price: 2380,
          rating: 4.5,
          reviews: 173,
          remaining: 9,
          cover: "assets/images/routes/zhangjiajie.jpg",
          tags: ["峰林", "玻璃桥", "探险"],
          schedules: ["10月20日 09:00", "10月27日 09:00"],
          description: "武陵源三千奇峰、金鞭溪徒步、天门山玻璃栈道和天子山索道。",
          highlights: ["袁家界", "金鞭溪", "天门山玻璃栈道", "天子山索道"],
          includes: ["森林公园门票", "百龙天梯", "玻璃栈道", "山脚特色酒店"]
        },
        {
          id: 4,
          name: "九寨沟童话世界六日游",
          city: "九寨沟",
          from: "成都",
          days: "6天5晚",
          price: 3280,
          rating: 4.9,
          reviews: 96,
          remaining: 7,
          cover: "assets/images/routes/jiuzhaigou.jpg",
          tags: ["自然", "海子", "深度"],
          schedules: ["10月22日 07:00", "10月29日 07:00"],
          description: "五彩池、长海、珍珠滩瀑布深度游览，含黄龙景区。",
          highlights: ["五花海", "长海", "珍珠滩瀑布", "黄龙五彩池"],
          includes: ["九寨沟两日门票", "黄龙门票", "藏式民宿", "景区环保车"]
        },
        {
          id: 5,
          name: "丽江古城慢旅行五日",
          city: "丽江古城",
          from: "深圳",
          days: "5天4晚",
          price: 2180,
          rating: 4.7,
          reviews: 151,
          remaining: 15,
          cover: "assets/images/routes/lijiang.jpg",
          tags: ["古城", "雪山", "慢旅行"],
          schedules: ["10月21日 10:30", "10月28日 10:30"],
          description: "丽江古城、玉龙雪山、束河古镇，含雪山索道和两晚特色客栈。",
          highlights: ["四方街", "玉龙雪山", "束河古镇", "蓝月谷"],
          includes: ["雪山索道", "印象丽江演出", "特色客栈", "纳西风味餐"]
        },
        {
          id: 6,
          name: "桂林漓江山水四日游",
          city: "桂林山水",
          from: "武汉",
          days: "4天3晚",
          price: 1580,
          rating: 4.6,
          reviews: 132,
          remaining: 20,
          cover: "assets/images/routes/guilin.jpg",
          tags: ["漓江", "亲子", "游船"],
          schedules: ["10月24日 08:30", "10月31日 08:30"],
          description: "漓江游船、阳朔骑行、遇龙河竹筏，尽享喀斯特山水。",
          highlights: ["漓江竹筏", "阳朔西街", "遇龙河", "十里画廊骑行"],
          includes: ["漓江游船", "阳朔自行车", "遇龙河竹筏", "阳朔精品酒店"]
        },
        {
          id: 7,
          name: "西安兵马俑历史三日游",
          city: "西安兵马俑",
          from: "南京",
          days: "3天2晚",
          price: 1380,
          rating: 4.8,
          reviews: 219,
          remaining: 11,
          cover: "assets/images/routes/xian.jpg",
          tags: ["历史", "古城", "美食"],
          schedules: ["10月19日 07:40", "10月26日 07:40"],
          description: "兵马俑、华清宫、城墙骑行和回民街美食，深度感受古都西安。",
          highlights: ["秦始皇兵马俑", "华清宫", "西安城墙", "回民街"],
          includes: ["兵马俑门票", "华清宫门票", "城墙骑行", "羊肉泡馍体验"]
        },
        {
          id: 8,
          name: "北京长城经典五日游",
          city: "北京长城",
          from: "上海",
          days: "5天4晚",
          price: 2680,
          rating: 4.9,
          reviews: 186,
          remaining: 14,
          cover: "assets/images/routes/changcheng.jpg",
          tags: ["长城", "故宫", "文化"],
          schedules: ["10月16日 07:20", "10月23日 07:20"],
          description: "八达岭长城、故宫、颐和园、天坛，感受千年都城气韵。",
          highlights: ["八达岭长城", "故宫博物院", "颐和园", "天坛祈年殿"],
          includes: ["长城缆车", "故宫门票", "市区四星酒店", "烤鸭宴"]
        },
        {
          id: 9,
          name: "西藏布达拉宫朝圣七日游",
          city: "拉萨",
          from: "成都",
          days: "7天6晚",
          price: 4980,
          rating: 4.8,
          reviews: 76,
          remaining: 6,
          cover: "assets/images/routes/potala.jpg",
          tags: ["高原", "藏地", "人文"],
          schedules: ["10月25日 09:20", "11月08日 09:20"],
          description: "布达拉宫、大昭寺、羊卓雍措和八廓街，开启雪域圣城之旅。",
          highlights: ["布达拉宫", "大昭寺", "八廓街", "羊卓雍措"],
          includes: ["布达拉宫门票", "高原反应应对包", "藏式酒店", "全程氧气保障"]
        },
        {
          id: 10,
          name: "稻城亚丁秘境六日游",
          city: "稻城亚丁",
          from: "成都",
          days: "6天5晚",
          price: 3980,
          rating: 4.7,
          reviews: 88,
          remaining: 8,
          cover: "assets/images/routes/yading.jpg",
          tags: ["雪山", "秘境", "徒步"],
          schedules: ["10月17日 09:00", "10月24日 09:00"],
          description: "仙乃日、央迈勇、夏诺多吉三座神山，牛奶海与五色海深度徒步。",
          highlights: ["仙乃日神山", "央迈勇", "牛奶海", "五色海"],
          includes: ["亚丁两日门票", "景区观光车", "专业领队", "徒步装备"]
        },
        {
          id: 11,
          name: "福建土楼客家四日游",
          city: "福建土楼",
          from: "厦门",
          days: "4天3晚",
          price: 1880,
          rating: 4.6,
          reviews: 94,
          remaining: 17,
          cover: "assets/images/routes/tulou.jpg",
          tags: ["世遗", "客家", "建筑"],
          schedules: ["10月20日 08:10", "10月27日 08:10"],
          description: "永定土楼、南靖云水谣、田螺坑土楼群，感受客家围屋生活。",
          highlights: ["承启楼", "云水谣古镇", "田螺坑土楼群", "土楼夜宿"],
          includes: ["土楼门票", "土楼民宿一晚", "客家宴", "讲解服务"]
        },
        {
          id: 12,
          name: "新疆喀纳斯湖光五日游",
          city: "喀纳斯",
          from: "乌鲁木齐",
          days: "5天4晚",
          price: 4580,
          rating: 4.9,
          reviews: 67,
          remaining: 10,
          cover: "assets/images/routes/kanas.jpg",
          tags: ["湖泊", "秋色", "远方"],
          schedules: ["10月19日 09:30", "10月26日 09:30"],
          description: "喀纳斯湖、禾木村、神仙湾和月亮湾，遇见北疆秋日童话。",
          highlights: ["喀纳斯湖", "禾木村", "神仙湾", "月亮湾"],
          includes: ["喀纳斯门票", "景区区间车", "禾木木屋", "图瓦风味晚餐"]
        }
      ],
      orders: [
        { no: "TR20261001001", userId: 1, user: "爱旅游", routeId: 1, route: "黄山经典三日游", schedule: "10月12日 07:30", people: 2, amount: 2560, status: "已支付", time: daysAgo(3, 2) },
        { no: "TR20261002002", userId: 2, user: "小清", routeId: 2, route: "杭州西湖诗画四日游", schedule: "10月18日 08:00", people: 1, amount: 1680, status: "待支付", time: daysAgo(2, 1) },
        { no: "TR20261003003", userId: 3, user: "晴空万里", routeId: 3, route: "张家界峰林探险五日游", schedule: "10月20日 09:00", people: 3, amount: 7140, status: "已完成", time: daysAgo(6, 4) },
        { no: "TR20261004004", userId: 4, user: "河", routeId: 5, route: "丽江古城慢旅行五日", schedule: "11月02日 10:30", people: 2, amount: 4360, status: "待支付", time: daysAgo(1, 6) },
        { no: "TR20261005005", userId: 1, user: "爱旅游", routeId: 6, route: "桂林漓江山水四日游", schedule: "11月08日 08:30", people: 3, amount: 4740, status: "已取消", time: daysAgo(5, 3) }
      ],
      payments: [
        { id: "PAY10021", orderNo: "TR20261001001", user: "爱旅游", method: "微信支付", amount: 2560, status: "支付成功", time: daysAgo(3, 1), txn: "wx20261001182001" },
        { id: "PAY10022", orderNo: "TR20261003003", user: "晴空万里", method: "支付宝", amount: 7140, status: "支付成功", time: daysAgo(6, 3), txn: "ali20261003090111" },
        { id: "PAY10023", orderNo: "TR20261002002", user: "小清", method: "银行卡", amount: 1680, status: "待支付", time: daysAgo(2, 1), txn: "-" },
        { id: "PAY10024", orderNo: "TR20261005005", user: "爱旅游", method: "微信支付", amount: 4740, status: "已退款", time: daysAgo(5, 2), txn: "wx20261005110012" }
      ],
      comments: [
        { id: 1, userId: 1, user: "爱旅游", routeId: 5, route: "丽江古城慢旅行五日", rating: 5, content: "行程安排合理，客栈很有特色，玉龙雪山体验很好。", status: "已通过", time: daysAgo(2, 3) },
        { id: 2, userId: 2, user: "小清", routeId: 2, route: "杭州西湖诗画四日游", rating: 4, content: "酒店位置好，行程轻松，适合带父母出行。", status: "已通过", time: daysAgo(5, 1) },
        { id: 3, userId: 3, user: "王五", routeId: 6, route: "桂林漓江山水四日游", rating: 5, content: "漓江景色很美，孩子玩得很开心，导游照顾周到。", status: "待审核", time: daysAgo(1, 4) },
        { id: 4, userId: 4, user: "赵六", routeId: 7, route: "西安兵马俑历史三日游", rating: 4, content: "历史讲解很专业，回民街晚餐时间稍微有点短。", status: "待审核", time: daysAgo(1, 2) },
        { id: 5, userId: 1, user: "爱旅游", routeId: 4, route: "九寨沟童话世界六日游", rating: 5, content: "水色太漂亮了，两日游览很尽兴，酒店也干净。", status: "已通过", time: daysAgo(7, 5) }
      ]
    };
  }

  function migrateLegacy() {
    // v5 直接使用新版种子数据，不再把旧版演示缓存迁移成与新路线不匹配的数据。
    return;
  }

  let data = null;

  function load() {
    migrateLegacy();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        const base = seedData();
        data = Object.assign(base, saved);
        data.accounts = base.accounts;
        const baseRoutes = base.routes;
        data.routes = (Array.isArray(saved.routes) ? saved.routes : baseRoutes).map((savedRoute) => {
          const route = baseRoutes.find((r) => Number(r.id) === Number(savedRoute.id)) || {};
          return Object.assign({}, route, savedRoute, {
            tags: Array.isArray(savedRoute.tags) ? savedRoute.tags : route.tags || [],
            schedules: Array.isArray(savedRoute.schedules) && savedRoute.schedules.length
              ? savedRoute.schedules
              : route.schedules || []
          });
        });
        const users = Array.isArray(saved.users) ? saved.users : base.users;
        data.users = users.map((savedUser) => {
          const baseUser = base.users.find((u) => Number(u.id) === Number(savedUser.id)) || {};
          return Object.assign({}, baseUser, savedUser);
        });
        data.orders = (Array.isArray(saved.orders) ? saved.orders : base.orders).map((savedOrder) => {
          const route = baseRoutes.find((r) => Number(r.id) === Number(savedOrder.routeId)) || {};
          const user = data.users.find((u) => u.username === savedOrder.user) || {};
          return Object.assign({}, route, savedOrder, {
            userId: Number(savedOrder.userId) || Number(user.id) || null,
            routeId: Number(savedOrder.routeId) || route.id || null,
            route: savedOrder.route || route.name || "未知线路"
          });
        });
        data.comments = (Array.isArray(saved.comments) ? saved.comments : base.comments).map((savedComment) => {
          const route = baseRoutes.find((r) => Number(r.id) === Number(savedComment.routeId)) || {};
          const user = data.users.find((u) => u.username === savedComment.user) || {};
          return Object.assign({}, route, savedComment, {
            userId: Number(savedComment.userId) || Number(user.id) || null,
            routeId: Number(savedComment.routeId) || route.id || null,
            route: savedComment.route || route.name || "未知线路"
          });
        });
        ["users", "routes", "orders", "payments", "comments"].forEach((key) => {
          if (!Array.isArray(data[key])) data[key] = base[key];
        });
      } else {
        data = seedData();
        save();
      }
    } catch (e) {
      data = seedData();
    }
    return data;
  }

  function ensure() {
    return data || load();
  }

  function save() {
    if (data) localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function reset() {
    data = seedData();
    save();
    Store._resetData = data;
    return data;
  }

  function nextId(list) {
    return list.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
  }

  function orderNo() {
    return "TR" + String(Date.now()).slice(-10);
  }

  function routeById(id) {
    return ensure().routes.find((r) => Number(r.id) === Number(id));
  }

  function createOrder({ routeId, user, people, schedule, method, amount }) {
    const db = ensure();
    const route = routeById(routeId);
    if (!route) return null;
    const userId = Auth.currentUserId();
    const no = orderNo();
    db.orders.unshift({
      no,
      userId,
      user,
      routeId: route.id,
      route: route.name,
      schedule,
      people,
      amount,
      status: "待支付",
      method,
      time: new Date().toISOString()
    });
    route.remaining = Math.max(0, route.remaining - people);
    save();
    return db.orders[0];
  }

  function findByNo(no) {
    return ensure().orders.find((o) => o.no === no);
  }

  function payOrder(no, method, userId) {
    const db = ensure();
    const order = userId ? findOrderByNo(no, userId) : findByNo(no);
    if (!order || order.status !== "待支付") return null;
    order.status = "已支付";
    order.method = method;
    const payment = {
      id: "PAY" + String(Date.now()).slice(-7),
      orderNo: order.no,
      user: order.user,
      method,
      amount: order.amount,
      status: "支付成功",
      time: new Date().toISOString(),
      txn: "demo" + String(Date.now()).slice(-10)
    };
    db.payments.unshift(payment);
    save();
    return payment;
  }

  function cancelOrder(no, userId) {
    const db = ensure();
    const order = userId ? findOrderByNo(no, userId) : findByNo(no);
    if (!order || order.status !== "待支付") return false;
    order.status = "已取消";
    const route = routeById(order.routeId);
    if (route) route.remaining = Math.min(route.remaining + order.people, 999);
    save();
    return true;
  }

  function completeOrder(no) {
    const order = findByNo(no);
    if (!order || order.status !== "已支付") return false;
    order.status = "已完成";
    save();
    return true;
  }

  function refundPayment(paymentId) {
    const db = ensure();
    const payment = db.payments.find((p) => p.id === paymentId);
    if (!payment) return false;
    payment.status = "已退款";
    const order = findByNo(payment.orderNo);
    if (order && order.status !== "已取消") {
      order.status = "已取消";
      const route = routeById(order.routeId);
      if (route) route.remaining = Math.min(route.remaining + order.people, 999);
    }
    save();
    return true;
  }

  function addComment({ user, routeId, rating, content }) {
    const db = ensure();
    const route = routeById(routeId);
    if (!route || !content.trim()) return null;
    const comment = {
      id: nextId(db.comments),
      userId: Auth.currentUserId(),
      user,
      routeId: route.id,
      route: route.name,
      rating,
      content: content.trim(),
      status: "待审核",
      time: new Date().toISOString()
    };
    db.comments.unshift(comment);
    save();
    return comment;
  }

  function setCommentStatus(id, status) {
    const db = ensure();
    const comment = db.comments.find((c) => Number(c.id) === Number(id));
    if (!comment) return false;
    comment.status = status;
    save();
    return true;
  }

  function addUser({ username, sex, age, phone, email }) {
    const db = ensure();
    const user = {
      id: nextId(db.users),
      username,
      sex,
      age,
      phone,
      email,
      status: "正常",
      role: "普通用户"
    };
    db.users.push(user);
    save();
    return user;
  }

  function stats() {
    const db = ensure();
    const paid = db.orders.filter((o) => o.status === "已支付" || o.status === "已完成");
    const revenue = paid.reduce((sum, o) => sum + Number(o.amount), 0);
    return {
      routes: db.routes.length,
      orders: db.orders.length,
      revenue,
      users: db.users.length,
      pendingComments: db.comments.filter((c) => c.status === "待审核").length
    };
  }

  const Auth = {
    currentSession() {
      try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        if (!raw) return null;
        const stored = JSON.parse(raw);
        const account = ensure().accounts.find((a) => a.username === stored.username) || {};
        const session = Object.assign({}, stored, {
          id: account.userId !== undefined ? account.userId : (account.id !== undefined ? account.id : stored.id),
          username: account.username || stored.username,
          displayName: account.displayName || stored.displayName,
          role: account.role || stored.role,
          portal: account.portal || stored.portal || (account.role === "admin" ? "admin" : "user")
        });
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        return session;
      } catch (e) {
        return null;
      }
    },
    login(username, password) {
      const account = ensure().accounts.find((a) => a.username === username && a.password === password);
      if (!account) return null;
      const session = {
        id: account.userId ?? account.id,
        username: account.username,
        displayName: account.displayName || account.username,
        role: account.role,
        portal: account.portal || (account.role === "admin" ? "admin" : "user")
      };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    },
    logout() {
      sessionStorage.removeItem(SESSION_KEY);
    },
    requireLogin() {
      if (!this.currentSession()) {
        window.location.href = "index.html";
        return false;
      }
      return true;
    },
    hasRole(...roles) {
      const session = this.currentSession();
      return !!session && roles.includes(session.role);
    },
    currentUserId() {
      const session = this.currentSession();
      if (session && session.id) return session.id;
      const account = ensure().accounts.find((a) => a.username === (session && session.username));
      return account ? account.id : null;
    }
  };

  const Store = {
    STORAGE_KEY,
    load,
    save,
    reset,
    getData: ensure,
    stats,
    routeById,
    createOrder,
    findByNo,
    payOrder,
    cancelOrder,
    completeOrder,
    refundPayment,
    addComment,
    setCommentStatus,
    addUser,
    userOrders(userId) {
      return ensure().orders.filter((o) => !userId || Number(o.userId) === Number(userId));
    },
    userComments(userId) {
      return ensure().comments.filter((c) => !userId || Number(c.userId) === Number(userId));
    },
    findOrderByNo(no, userId) {
      return ensure().orders.find((o) => o.no === no && (!userId || Number(o.userId) === Number(userId)));
    }
  };

  global.TravelStore = Store;
  global.TravelAuth = Auth;
})(window);
