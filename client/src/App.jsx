import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import HomePage from "./scenes/homePage/index.jsx"
import LoginPage from "./scenes/loginPage/index"
import ProfilePage from "./scenes/profilePage/index"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material"
import { themeSettings } from "./theme"

function App() {
    // grab the state from redux with useSelector, and you have the value to use
    // const mode = useSelector((state) => state.mode)
    const mode = "dark"
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    {/* reset the css with cassbaseline*/}
                    <CssBaseline />
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route
                            path="/profile/:userId"
                            element={<ProfilePage />}
                        />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    )
}

export default App
