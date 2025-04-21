import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index('routes/home.tsx'),
  route('post/:postId', './routes/post.tsx'),
  // route('mypage', './routes/mypage/index.tsx', [
  //   route('account', './routes/mypage/account.tsx'),
  //   route('settings', './routes/mypage/settings.tsx'),
  // ]),
  ...prefix('mypage', [
    index('./routes/mypage/index.tsx'),
    layout('./routes/mypage/layout.tsx', [
      route('account', './routes/mypage/account.tsx'),
      route('settings', './routes/mypage/settings.tsx'),
    ])
  ])
] satisfies RouteConfig
