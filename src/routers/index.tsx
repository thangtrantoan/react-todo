import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout";

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <MainLayout />
        ),
    },
    {
        path: '/abc',
        element: <>abc</>
    },
    // { path: '*', element: <Navigate to={ROUTE_PATHS.LOGIN.path} replace /> }
]);

export default router;
