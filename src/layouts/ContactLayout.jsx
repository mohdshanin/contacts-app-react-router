import { Outlet } from "react-router-dom";

export default function ContactLayout() {
    return (
        <div>
            <header>
                <h2 style={{ borderBottom: '1px solid #ccc', padding: '0 0 1rem 1rem' }}>Contact Details</h2>
            </header>
            <main style={{ padding: '2rem 4rem' }}>
                <Outlet /> {/* Renders the child route content */}
            </main>
        </div>
    );
}
