import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import User from "../components/inforMation/user.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    meta: {
      title: "登录页面",
    },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/Home",
    name: "Home",
    meta: {
      title: "Home/Index",
      requireAuth: true
    },
    component: Home,
    redirect: '/inforMation/user',
    children: [{ path: '/inforMation/user', component: User }]
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录页面",
    },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/home",
    name: "home",
    meta: {
      title: "首页",
      requireAuth: true,
    },
    component: () => import("../views/Home.vue"),
    children: [
      // ---------- 便捷校园 开始 ----------
      {
        path: "/convenientCampus/roomap",
        name: 'roomap',
        meta: {
          title: "教室预约",
          requireAuth: true
        },
        component: () => import("../components/convenientCampus/roomap.vue")
      },
      {
        path: "/convenientCampus/timeinfo",
        name: 'timeinfo',
        meta: {
          title: "学校课程时间",
          requireAuth: true
        },
        component: () => import("../components/convenientCampus/timeinfo.vue")
      },
      // ---------- 便捷校园 结束 ----------
      // ---------- 综合信息 开始 ----------
      {
        path: "/inforMation/user",
        name: 'user',
        meta: {
          title: "用户信息列表",
          requireAuth: true
        },
        component: () => import("../components/inforMation/user.vue")
      },
      {
        path: "/inforMation/lessoninfo",
        name: 'lessoninfo',
        meta: {
          title: "课程信息",
          requireAuth: true
        },
        component: () => import("../components/inforMation/lessoninfo.vue")
      },
      {
        path: "/inforMation/classinfo",
        name: 'classinfo',
        meta: {
          title: "班级信息",
          requireAuth: true
        },
        component: () => import("../components/inforMation/classinfo.vue")
      },
      {
        path: "/inforMation/roominfo",
        name: 'roominfo',
        meta: {
          title: "教室信息",
          requireAuth: true
        },
        component: () => import("../components/inforMation/roominfo.vue")
      },
      // ---------- 综合信息 结束 ----------
      // ---------- 个人信息 开始 ----------
      {
        path: "/userInfo/updateUser",
        name: 'UpdateUserInfoPage',
        meta: {
          title: "修改信息",
          requireAuth: true
        },
        component: () => import("../components/userInfo/UpdateUserInfo.vue")
      },
      {
        path: "/userInfo/updatePassword",
        name: 'UpdateUserPwdPage',
        meta: {
          title: "修改密码",
          requireAuth: true,
        },
        component: () => import("../components/userInfo/UpdateUserPwd.vue")
      },
      {
        path: "/userInfo/deleteUser",
        name: 'DeleteUserPage',
        meta: {
          title: "注销账户",
          requireAuth: false,
        },
        component: () => import("../components/userInfo/DeleteUser.vue")
      }
      // ---------- 个人信息 结束 ----------
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
