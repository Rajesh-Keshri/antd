import React from 'react';
import Link from 'umi/link';

// This is made to map the routes names.
// Example:
// /samplePage -> Sample Page
const routerNames ={
  aeroBoilerplate: 'aeroBoilerplate',
  samplePage: 'Sample Page',
}

const pathRoute = {
  '/sample': '/samplePage',
}

// params comming: route, params, routes, paths
export const itemRender=(route, params, routes) =>{
  const last = routes.indexOf(route) === routes.length - 1;

  let breadCrumbTitle;
  if(typeof routerNames[route.breadcrumbName] === 'function'){
    breadCrumbTitle = routerNames[route.breadcrumbName](route.params);
  }else{
    breadCrumbTitle = routerNames[route.breadcrumbName]
  }

  return (last || route.disableClick) ? (
    <span>{breadCrumbTitle}</span>
  ) : (
    <Link to={pathRoute[route.path] || route.path}>{breadCrumbTitle}</Link>
  );

}
