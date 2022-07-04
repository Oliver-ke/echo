// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';

export async function getRoutes() {
  return {
    routes: {"1":{"path":"/user","layout":false,"id":"1"},"2":{"name":"login","path":"/user/login","file":"@/pages/User/Login/index.tsx","parentId":"1","id":"2"},"3":{"file":"@/pages/404.tsx","parentId":"1","id":"3"},"4":{"name":"Test Page","icon":"table","path":"/test","file":"@/pages/Test.tsx","parentId":"ant-design-pro-layout","id":"4"},"5":{"path":"/welcome","name":"welcome","icon":"smile","file":"@/pages/Welcome.tsx","parentId":"ant-design-pro-layout","id":"5"},"6":{"path":"/admin","name":"admin","icon":"crown","access":"canAdmin","parentId":"ant-design-pro-layout","id":"6"},"7":{"path":"/admin/sub-page","name":"sub-page","icon":"smile","file":"@/pages/Welcome.tsx","parentId":"6","id":"7"},"8":{"file":"@/pages/404.tsx","parentId":"6","id":"8"},"9":{"name":"list.table-list","icon":"table","path":"/list","file":"@/pages/TableList/index.tsx","parentId":"ant-design-pro-layout","id":"9"},"10":{"path":"/","redirect":"/welcome","parentId":"ant-design-pro-layout","id":"10"},"11":{"file":"@/pages/404.tsx","parentId":"ant-design-pro-layout","id":"11"},"ant-design-pro-layout":{"id":"ant-design-pro-layout","path":"/","file":"@/.umi/plugin-layout/Layout.tsx","isLayout":true},"umi/plugin/openapi":{"path":"/umi/plugin/openapi","id":"umi/plugin/openapi","file":"/Users/oliverke/work/echo/frontend/src/.umi/plugin-openapi/openapi.tsx"}},
    routeComponents: {
'1': React.lazy(() => import( './EmptyRoute')),
'2': React.lazy(() => import(/* webpackChunkName: "2" */'@/pages/User/Login/index.tsx')),
'3': React.lazy(() => import(/* webpackChunkName: "3" */'@/pages/404.tsx')),
'4': React.lazy(() => import(/* webpackChunkName: "4" */'@/pages/Test.tsx')),
'5': React.lazy(() => import(/* webpackChunkName: "5" */'@/pages/Welcome.tsx')),
'6': React.lazy(() => import( './EmptyRoute')),
'7': React.lazy(() => import(/* webpackChunkName: "7" */'@/pages/Welcome.tsx')),
'8': React.lazy(() => import(/* webpackChunkName: "8" */'@/pages/404.tsx')),
'9': React.lazy(() => import(/* webpackChunkName: "9" */'@/pages/TableList/index.tsx')),
'10': React.lazy(() => import( './EmptyRoute')),
'11': React.lazy(() => import(/* webpackChunkName: "11" */'@/pages/404.tsx')),
'ant-design-pro-layout': React.lazy(() => import(/* webpackChunkName: "ant_design_pro_layout" */'@/.umi/plugin-layout/Layout.tsx')),
'umi/plugin/openapi': React.lazy(() => import(/* webpackChunkName: "umi_plugin_openapi" */'/Users/oliverke/work/echo/frontend/src/.umi/plugin-openapi/openapi.tsx')),
},
  };
}
