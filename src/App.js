import {BrowserRouter, Route, Routes} from "react-router-dom";
import {NewsList} from "./pages/NewsList/NewsList";
import {Comments} from "./pages/Comments/Comments";

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<NewsList/>}/>
                <Route path='comments/:id' element={<Comments/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;