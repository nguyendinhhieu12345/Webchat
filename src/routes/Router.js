// Layouts

// Pages
import { ConfigRouter } from '~/config';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Chat from '~/pages/Chat';
// Public routes
const publicRoutes = [
    { path: ConfigRouter.Home, component: Home },
    { path: ConfigRouter.Login, component: Login },
    { path: ConfigRouter.Chat, component: Chat },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
