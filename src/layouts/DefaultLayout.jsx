import { Outlet, useLocation } from 'react-router-dom'

function DefaultLayout() {
    let location = useLocation();
    const { pathname } = location;

    let headerName = pathname.replace('/', '')
    headerName = headerName.slice(0, 1).toUpperCase() + headerName.slice(1, pathname.length)


    return (
        <>
            <header>
                <h2 style={{ borderBottom: '1px solid #ccc', padding: '0 0 1rem 1rem' }}>{headerName || 'Home'}</h2>
            </header>
            <main style={{ padding: '2rem 4rem' }}>
                <Outlet /> {/* Renders the child route content */}
            </main>
        </>
    )
}

export default DefaultLayout