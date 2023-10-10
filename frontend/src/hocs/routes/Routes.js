import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'

import { AnimatePresence } from 'framer-motion'
import Error404 from 'containers/errors/Error404'
import Dashboard from 'containers/pages/Dashboard'
import Clientes from 'containers/pages/Clientes'
import Medidores from 'containers/pages/Medidores'

function AnimatedRoutes() {

    const location = useLocation()

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                {/* Error Display*/}
                <Route path="*" element={<Error404 />} />

                {/* Home Display */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/medidores" element={<Medidores />} />

            </Routes>
        </AnimatePresence>
    )
}
export default AnimatedRoutes