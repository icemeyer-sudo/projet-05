import {RouterProvider} from "react-router-dom";
import {router} from './layout/createBrowserRouter.jsx';

function App() {
    return <RouterProvider router={router}/>
};

export default App;