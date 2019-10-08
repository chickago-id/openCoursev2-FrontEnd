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
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/akademik',
    component: Layout,
    redirect: '/akademik/menu1',
    name: 'Akademik',
    meta: {
      title: 'Akademik',
      icon: 'nested'
    },
    children: [
      {
        path: 'materi',
        component: () => import('@/views/akademik/materi/index'),
        meta: { title: 'Daftar Materi' }
      },
      {
        path: 'nilaisiswa',
        component: () => import('@/views/akademik/nilaisiswa/index'),
        meta: { title: 'Nilai Siswa' }
      },
      {
        path: 'kategorinilaimateri',
        component: () => import('@/views/masterdata/kategorinilaimateri/index'),
        meta: { title: 'Kategori Nilai Materi' }
      },
      {
        path: 'nilaipengajar',
        component: () => import('@/views/akademik/nilaipengajar/index'),
        meta: { title: 'Penilaian Pengajar' }
      },
      {
        path: 'presensi',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'presensi',
        meta: { title: 'Presensi' },
        children: [
          {
            path: 'presensi-siswa',
            component: () => import('@/views/akademik/presensi/siswa/index'),
            name: 'Nilaihurufcategory',
            meta: { title: 'Presensi Siswa' }
          },
          {
            path: 'presensi-pengajar',
            component: () => import('@/views/akademik/presensi/pengajar/index'),
            name: 'nilaihuruf',
            meta: { title: 'Presensi Pengajar' }
          }
        ]
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
      icon: 'nested'
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
        path: 'kategorinilai',
        component: () => import('@/views/masterdata/kategorinilai/index'),
        meta: { title: 'Master Kategori Nilai' }
      },
      {
        path: 'nilaihuruf',
        component: () => import('@/views/masterdata/nilaihuruf/index'),
        meta: { title: 'Master Nilai Huruf' }
      },
      /* {
        path: 'nilaihuruf',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'nilaihuruf',
        meta: { title: 'Master Nilai Huruf', icon: 'nested' },
        children: [
          {
            path: 'nilaihurufsubject',
            component: () => import('@/views/masterdata/nilaihuruf/category/index'),
            name: 'Nilaihurufcategory',
            meta: { title: 'Huruf Category', icon: 'nested' }
          },
          {
            path: 'nilaihuruf',
            component: () => import('@/views/masterdata/nilaihuruf/index'),
            name: 'nilaihuruf',
            meta: { title: 'Nilai Huruf', icon: 'nested' }
          }
        /* {
            path: 'nilaihuruf',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Nilai Huruf' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }]
            }
        ]
      }, */
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
    name: 'report',
    meta: {
      title: 'Institute Management',
      icon: 'nested'
    },
    children: [
      {
        path: 'institute',
   //     component: () => import('@/views/masterdata/institute/index'),
        meta: { title: 'Institute Management' }
      },
      {
        path: 'company',
      //  component: () => import('@/views/masterdata/company/index'),
        meta: { title: 'Company List' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/menu1',
    name: 'report',
    meta: {
      title: 'User Management',
      icon: 'nested'
    },
    children: [
      {
        path: 'user',
  //      component: () => import('@/views/user/index'),
        meta: { title: 'User' }
      },
      {
        path: 'level',
        component: () => import('@/views/masterdata/level/index'),
        meta: { title: 'Access Level' }
      }
    ]
  },

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
    path: '/report',
    component: Layout,
    redirect: '/masterdata/menu1',
    name: 'report',
    meta: {
      title: 'Report',
      icon: 'nested'
    },
    children: [
      {
        path: 'report1',
        component: () => import('@/views/masterdata/nilaihuruf/index'),
        meta: { title: 'Report #1' }
      },
      {
        path: 'report2',
        component: () => import('@/views/masterdata/nilaihuruf/index'),
        meta: { title: 'Report #2' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
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
