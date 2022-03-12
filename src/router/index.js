import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: { name: "Home" },
  },
  {
    path: "/Home",
    name: "Home",
    meta: {
      title: "Home/Index",
      requireAuth: true
    },
    component: Home,
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
    path: "/user",
    name: "UserInfo",
    meta: {
      title: "用户信息页面",
      requireAuth: true,
    },
    component: () => import("../views/User.vue"),
    children: [
      {
        path: "/user/list",
        name: 'UserListPage',
        meta: {
          title: "用户信息列表",
          requireAuth: true
        },
        component: () => import("../components/userManager/user.vue")
      },
      {
        path: "/user/updateUser",
        name: 'UpdateUserInfoPage',
        meta: {
          title: "更改个人信息",
          requireAuth: true
        },
        component: () => import("../components/userInfo/UpdateUserInfo.vue")
      },
      {
        path: "/user/updatePassword",
        name: 'UpdateUserPwdPage',
        meta: {
          title: "修改密码",
          requireAuth: true,
        },
        component: () => import("../components/userInfo/UpdateUserPwd.vue")
      },
      {
        path: "/user/deleteUser",
        name: 'DeleteUserPage',
        meta: {
          title: "注销账户",
          requireAuth: false,
        },
        component: () => import("../components/userInfo/DeleteUser.vue")
      }
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
