import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Route components
import EduConnectLanding from './components/EduConnectLanding.vue'
import TeacherDashboard from './components/teacherdash/TeacherDashboard.vue'
import StudentDashboard from './components/studentdash/StudentDashboard.vue'
import AdminDashboard from './components/admindash/AdminDashboard.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: EduConnectLanding
    },
    {
      path: '/teacher',
      component: TeacherDashboard
    },
    {
      path: '/student',
      component: StudentDashboard
    },
    {
      path: '/admin',
      component: AdminDashboard
    }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')