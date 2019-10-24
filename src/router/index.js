import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/sent',
    component: () => import('@/views/notification/sent'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }

    ]
  },
  {
    path: '/notification',
    component: Layout,
    redirect: '/notification/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'notifications',
        component: () => import('@/views/notification/index'),
        meta: { title: 'Notification', noCache: true }
      },
      {
        path: '/notification/sent',
        name: 'notification sent',
        component: () => import('@/views/notification/sent'),
        meta: { title: 'Notification', noCache: true }
      },
      {
        path: '/notification/draft',
        name: 'notification draft',
        component: () => import('@/views/notification/draft'),
        meta: { title: 'Notification', noCache: true }
      },
      {
        path: '/notification/trash',
        name: 'notification trash',
        component: () => import('@/views/notification/trash'),
        meta: { title: 'Notification', noCache: true }
      },
      {
        path: '/notification/important',
        name: 'notification important',
        component: () => import('@/views/notification/important'),
        meta: { title: 'Notification', noCache: true }
      },
      {
        path: '/notification/news',
        name: 'notification news',
        component: () => import('@/views/notification/news'),
        meta: { title: 'Notification', noCache: true }
      }

    ]
  },
  // {
  //   path: "/sent",
  //   component: Layout,
  //   redirect: "/notification/sent",
  //   hidden: true,
  //   children: [
  //     {
  //       path: "sent",
  //       name: "sent",
  //       component: () => import("@/views/notification/sent"),
  //       meta: { title: "sent", noCache: true }
  //     },

  //   ]
  // },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  {
    path: '/pdf/presensisiswa',
    component: () => import('@/views/pdf/presensisiswa/index'),
    name: 'pdf presensisiswa',
    hidden: true
  },
  {
    path: '/pdf/nilaisiswa',
    component: () => import('@/views/pdf/nilaisiswa/index'),
    name: 'pdf nilaisiswa',
    hidden: true
  },
  {
    path: '/pdf/penilaianpengajar',
    component: () => import('@/views/pdf/penilaianpengajar/index'),
    name: 'pdf penilaianpengajar',
    hidden: true
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  {
    path: '/akademik',
    component: Layout,
    redirect: '/akademik/kelas',
    name: 'Akademik',
    meta: {
      title: 'Akademik',
      icon: 'nested'
    },
    children: [
      {
        path: 'kelas',
        component: () => import('@/views/akademik/kelas/index'),
        meta: { title: 'Daftar List Kelas', roles: ['Admin'] }
      },
      {
        path: 'materi',
        component: () => import('@/views/akademik/materi/index'),
        meta: { title: 'Daftar List Materi', roles: ['Admin'] }
      },
      {
        path: 'jadwal',
        component: () => import('@/views/akademik/jadwal/index'),
        meta: { title: 'Jadwal', roles: ['Admin'] }
      },
      {
        path: 'instructor',
        component: () => import('@/views/akademik/daftarinstructor/index'),
        meta: { title: 'Daftar Instructor', roles: ['Admin'] }
      },
      {
        path: 'siswa',
        component: () => import('@/views/akademik/daftarsiswa/index'),
        meta: { title: 'Daftar Siswa', roles: ['Admin' || 'Pengajar'] }
      },
      {
        path: 'nilaisiswa',
        component: () => import('@/views/akademik/nilaisiswa/index'),
        meta: { title: 'Nilai Siswa' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/akademik/nilaisiswa/list/index'),
            meta: { title: 'List Nilai Siswa', roles: ['Admin'] }
          },
          {
            path: 'input',
            component: () => import('@/views/akademik/nilaisiswa/input/index'),
            meta: { title: 'Input Nilai Siswa', roles: ['Pengajar'] }
          }
        ]
      },
      {
        path: 'kategorinilaimateri',
        component: () => import('@/views/akademik/kategorinilaimateri/index'),
        meta: { title: 'Kategori Nilai Materi', roles: ['Admin'] }
      },
      {
        path: 'nilaipengajar',
        component: () => import('@/views/akademik/nilaipengajar/index'),
        meta: { title: 'Penilaian Pengajar', roles: ['Admin'] }
      },
      {
        path: 'presensi',
        component: () => import('@/views/akademik/presensi/index'), // Parent router-view
        name: 'presensi',
        meta: { title: 'Presensi' },
        children: [
          {
            path: 'presensi-siswa',
            component: () => import('@/views/akademik/presensi/siswa'),
            name: 'presensi-siswa',
            meta: { title: 'Presensi Siswa', roles: ['Admin'] }
          },
          {
            path: 'presensi-pengajar',
            component: () => import('@/views/akademik/presensi/pengajar'),
            name: 'presensi-pengajar',
            meta: { title: 'Presensi Pengajar', roles: ['Admin'] }
          },
          {
            path: 'buatkodepresensi',
            component: () => import('@/views/akademik/presensi/buatkode'),
            nama: 'buatkodepresensi',
            meta: { title: 'Buat Kode Presensi', roles: ['Pengajar'] }
          },
          {
            path: 'inputpresensi',
            component: () => import('@/views/akademik/presensi/inputpresensi'),
            nama: 'inputpresensi',
            meta: { title: 'Input Presensi', roles: ['Peserta'] }
          }
        ]
      },
      {
        path: 'broadcasting',
        component: () => import('@/views/akademik/broadcast/index'),
        meta: { title: 'Broadcasting', roles: ['Admin'] }
      }
    ]
  },
  {
    path: '/masterdata',
    component: Layout,
    redirect: '/masterdata/menu1',
    name: 'MasterData',
    meta: {
      title: 'Master Data',
      icon: 'nested',
      roles: ['Admin']
    },
    children: [
      {
        path: 'masterbatch',
        component: () => import('@/views/masterdata/masterbatch/index'),
        meta: { title: 'Master Batch' }
      },
      {
        path: 'masterkelas',
        component: () => import('@/views/masterdata/masterkelas/index'),
        meta: { title: 'Master Kelas' }
      },
      {
        path: 'masterkelastipe',
        component: () => import('@/views/masterdata/masterkelastipe/index'),
        meta: { title: 'Master Kelas Tipe' }
      },
      {
        path: 'kategorinilai',
        component: () => import('@/views/masterdata/kategorinilai/index'),
        meta: { title: 'Master Kategori Nilai' }
      },
      {
        path: 'nilaihuruf',
        component: () => import('@/views/masterdata/nilaihuruf/index'),
        meta: { title: 'Master Nilai Huruf' }
      },
      {
        path: 'ruang',
        component: () => import('@/views/masterdata/ruang/index'),
        meta: { title: 'Master Ruang' }
      },
      {
        path: 'sesi',
        component: () => import('@/views/masterdata/sesi/index'),
        meta: { title: 'Master Sesi' }
      },
      {
        path: 'day',
        component: () => import('@/views/masterdata/hari/index'),
        meta: { title: 'Daftar Hari' }
      },
      {
        path: 'notifkategori',
        component: () => import('@/views/masterdata/notifkategori/index'),
        meta: { title: 'Notif Kategori' }
      },
      {
        path: 'status',
        component: () => import('@/views/masterdata/status/index'),
        meta: { title: 'Master Status' }
      },
      {
        path: 'tahunakademik',
        component: () => import('@/views/masterdata/tahunakademik/index'),
        meta: { title: 'Master Tahun Akademik' }
      }
    ]
  },
  {
    path: '/institute',
    component: Layout,
    redirect: '/user/menu1',
    name: 'institute',
    meta: {
      title: 'Institute Management',
      icon: 'nested',
      roles: ['Admin']
    },
    children: [
      {
        path: 'profilinstitusi',
        component: () => import('@/views/manajemeninstitusi/profilinstitusi/index'),
        meta: { title: 'Institute Management' }
      },
      {
        path: 'listinstitusi',
        component: () =>
          import('@/views/manajemeninstitusi/listinstitusi/index'),
        meta: { title: 'Company List' }
      }
    ]
  },
  {
    path: '/manajemenuser',
    component: Layout,
    redirect: '/user/menu1',
    name: 'manajemenuser',
    meta: {
      title: 'User Management',
      icon: 'nested',
      roles: ['Admin']
    },
    children: [
      {
        name: 'manajemen user',
        path: 'user',
        component: () => import('@/views/manajemenuser/userlist/index'),
        meta: { title: 'User' }
      },
      {
        name: 'manajemen level',
        path: 'level',
        component: () => import('@/views/manajemenuser/akseslevel/index'),
        meta: { title: 'Access Level' }
      }
    ]
  },

  {
    path: '/report',
    component: Layout,
    redirect: '/report/menu1',
    name: 'report',
    meta: {
      title: 'Report',
      icon: 'nested',
      roles: ['Admin']
    },
    children: [
      {
        name: 'report nilai siswa',
        path: 'nilaisiswa',
        component: () => import('@/views/report/nilaisiswa/index'),
        meta: { title: 'Nilai Siswa' }
      },
      {
        name: 'report presensi siswa',
        path: 'presensisiswa',
        component: () => import('@/views/report/presensisiswa/index'),
        meta: { title: 'Presensi Siswa' }
      },
      {
        name: 'report penilaian pengajar',
        path: 'penilaian pengajar',
        component: () => import('@/views/report/penilaianpengajar/index'),
        meta: { title: 'Penilaian Pengajar' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
