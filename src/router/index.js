import Vue from "vue";
import VueRouter from "vue-router";
import Friends from "@/components/Friends/Friends";
import Home from "@/components/Home";
import Meetups from "@/components/Meetup/Meetups";
import CreateMeetup from "@/components/Meetup/CreateMeetup";
import Meetup from "@/components/Meetup/Meetup";
import Profile from "@/components/User/Profile";
import Signup from "@/components/User/Signup";
import Signin from "@/components/User/Signin";
import AuthGuard from "./auth-guard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/meetups",
    name: "Meetups",
    component: Meetups
  },
  {
    path: "/meetup/new",
    name: "CreateMeetups",
    component: CreateMeetup,
    beforeEnter: AuthGuard
  },
  {
    path: "/meetups/:id",
    name: "Meetup",
    props: true,
    component: Meetup
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: AuthGuard
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin
  },
  {
    path: "/friends",
    name: "Friends",
    component: Friends
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
