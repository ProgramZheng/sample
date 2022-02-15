import { RouteRecordRaw } from 'vue-router';

//Frontend
import Error404 from 'pages/Error404.vue'
import FrontMainLayout from 'layouts/front/MainLayout.vue'
import Index from 'pages/Index.vue'
import JavascriptTimestamp from 'pages/javascript/Timestamp.vue'
import JavascriptDate from 'pages/javascript/Date.vue'
//go-language-repository
import GoLanguageRepositoryMainLayout from 'layouts/front/go/language-repository/MainLayout.vue'
import GoLanguageRepositoryLogin from 'pages/go/language-repository/Login.vue'
import GoLanguageRepositoryIndex from 'pages/go/language-repository/Index.vue'
import GoLanguageRepositoryDictionary from 'pages/go/language-repository/Dictionary.vue'
import { goLanguageRepositoryAuth } from './middlewares'

//go-base
import AdminGoBaseMainLayout from 'layouts/admin/go/base/MainLayout.vue'
import AdminGoBaseIndex from 'pages/admin/go/base/Index.vue'
import AdminGoBaseLogin from 'pages/admin/go/base/Login.vue'

//node-messaging-socket
import NodeMessagingSocketMainLayout from 'layouts/front/node/messaging-socket/MainLayout.vue'
import NodeMessagingSocketRegister from 'pages/node/messaging-socket/Register.vue'
import NodeMessagingSocketRegisterAwaitingVerification from 'pages/node/messaging-socket/RegisterAwaitingVerification.vue'
import NodeMessagingSocketRegisterEmailValidate from 'src/pages/node/messaging-socket/RegisterEmailValidate.vue'
import NodeMessagingSocketLogin from 'pages/node/messaging-socket/Login.vue'
import NodeMessagingSocketIndex from 'pages/node/messaging-socket/Index.vue'
import NodeMessagingSocketChat from 'pages/node/messaging-socket/Chat.vue'
import { nodeMessagingSocketAuth } from './middlewares'

//laravel-base
import AdminPhpLaravelBaseMainLayout from 'layouts/admin/php/laravel-base/MainLayout.vue'
import AdminPhpLaravelBaseIndex from 'pages/admin/php/laravel-base/Index.vue'
import AdminPhpLaravelBaseLogin from 'pages/admin/php/laravel-base/Login.vue'
// import { laravelBaseAdminAuth } from './middlewares'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: FrontMainLayout,
    children: [
      {
        path: '',
        name: 'index',
        component: Index
      },
      {
        path: 'javascript/timestamp',
        name: 'javascript.timestamp',
        component: JavascriptTimestamp
      },
      {
        path: 'javascript/date',
        name: 'javascript.date',
        component: JavascriptDate
      },
      {
        path: 'go/language-repository/login',
        name: 'go.language-repository.login',
        component: GoLanguageRepositoryLogin
      },
      //node messaging socket
      {
        path: 'node/messaging-socket/register',
        name: 'node.messaging-socket.register',
        component: NodeMessagingSocketRegister
      },
      {
        path: 'node/messaging-socket/register/awaiting_verification',
        name: 'node.messaging-socket.register.awaiting_verification',
        component: NodeMessagingSocketRegisterAwaitingVerification
      },
      {
        path: 'node/messaging-socket/register/email_validate',
        name: 'node.messaging-socket.register.email_validate',
        component: NodeMessagingSocketRegisterEmailValidate
      },
      {
        path: 'node/messaging-socket/login',
        name: 'node.messaging-socket.login',
        component: NodeMessagingSocketLogin
      },
      {
        path: '/go/language-repository',
        component: GoLanguageRepositoryMainLayout,
        meta: {
          middlewares: [goLanguageRepositoryAuth]
        },
        children: [
          {
            path: '',
            name: 'go.language-repository.index',
            component: GoLanguageRepositoryIndex,
          },
          {
            path: 'dictionary',
            name: 'go.language-repository.dictionary',
            component: GoLanguageRepositoryDictionary
          }
        ]
      },
      {
        path: '/node/messaging-socket',
        component: NodeMessagingSocketMainLayout,
        meta: {
          middlewares: [nodeMessagingSocketAuth]
        },
        children: [
          {
            path: '',
            name: 'node.messaging-socket.index',
            component: NodeMessagingSocketIndex,
          },
          {
            path: 'chat',
            name: 'node.messaging-socket.chat',
            component: NodeMessagingSocketChat,
          }
        ]
      },
    ],
  },

  //go
  {
    path: '/admin/go/base/login',
    name: 'admin.go.base.login',
    component: AdminGoBaseLogin
  },
  {
    path: '/admin/go/base',
    name: 'admin.go.base',
    component: AdminGoBaseMainLayout,
    meta: {
      // middlewares: [goBaseAdminAuth]
    },
    children: [
      {
        path: '',
        name: 'admin.go.base.index',
        component: AdminGoBaseIndex
      }
    ]
  },

  //php
  {
    path: '/admin/php/laravel-base/login',
    name: 'admin.php.laravel-base.login',
    component: AdminPhpLaravelBaseLogin
  },
  {
    path: '/admin/php/laravel-base',
    component: AdminPhpLaravelBaseMainLayout,
    meta: {
      // middlewares: [laravelBaseAdminAuth]
    },
    children: [
      {
        path: '',
        name: 'admin.php.laravel-base.index',
        component: AdminPhpLaravelBaseIndex,

      }
    ]
  },
  
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: Error404,
  },
];

export default routes;
