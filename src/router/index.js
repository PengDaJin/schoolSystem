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
    path: "/account_information",
    name: "AccountInformation",
    meta: {
      title: "用户信息页面",
      requireAuth: true,
    },
    component: () => import("../views/Account_information.vue"),
    children: [
      {
        path: "/account_information/updateUserInfoPage",
        name: 'UpdateUserInfoPage',
        meta: {
          title: "更改个人信息",
          requireAuth: true
        },
        component: () => import("../components/userAComponents/UpdateUserInfo.vue")
      },
      {
        path: "/account_information/updateUserPwdPage",
        name: 'UpdateUserPwdPage',
        meta: {
          title: "修改密码",
          requireAuth: true,
        },
        component: () => import("../components/userAComponents/UpdateUserPwd.vue")
      },
      {
        path: "/account_information/deleteUserPage",
        name: 'DeleteUserPage',
        meta: {
          title: "注销账户",
          requireAuth: false,
        },
        component: () => import("../components/userAComponents/DeleteUser.vue")
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
