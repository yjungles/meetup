import store from "../store";

export default (to, from, next) => {
    var user = store.getters.user;
    if (user) {
        next();
    } else {
        next('/signin');
    }
}