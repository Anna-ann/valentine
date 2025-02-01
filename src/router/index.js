// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Question from '../views/Question.vue'
import PasscodeGame from '../views/PasscodeGame.vue'
import DateSelection from '../views/DateSelection.vue'

const routes = [
    { path: '/', name: 'LandingPage', component: LandingPage },
    { path: '/question', name: 'Question', component: Question },
    { path: '/passcode', name: 'PasscodeGame', component: PasscodeGame },
    { path: '/date', name: 'DateSelection', component: DateSelection },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0, behavior: "smooth" };
        }
    },
});

export default router
