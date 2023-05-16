import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import HomePage from "./scenes/homePage/index.jsx"
import LoginPage from "./scenes/loginPage/index"
import ProfilePage from "./scenes/profilePage/index"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material"
import { themeSettings } from "./theme"
import Navbar from "./scenes/navbar/index.jsx"

function App() {
    // grab the state from redux with useSelector, and you have the value to use
    const mode = useSelector((state) => state.mode)
    // const mode = "dark"
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
    // check if auth
    const isAuth = Boolean(useSelector((state) => state.token))

    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <Navbar />
                    {/* reset the css with cassbaseline*/}
                    <CssBaseline />
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route
                            path="/home"
                            element={
                                isAuth ? <HomePage /> : <Navigate to="/" />
                            }
                        />
                        <Route
                            path="/profile/:userId"
                            element={
                                isAuth ? <ProfilePage /> : <Navigate to="/" />
                            }
                        />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    )
}

export default App
