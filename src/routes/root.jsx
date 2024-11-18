/* eslint-disable react-refresh/only-export-components */
import { Outlet, redirect } from "react-router-dom";

import { getContacts, createContact } from "../actions/contacts";
import Sidebar from "../components/Sidebar";

export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts, q };
}

export default function Root() {

    return (
        <>
            <Sidebar />
            <div
                id="detail"
                className={
                    navigation.state === "loading" ? "loading" : ""
                }
            >
                <Outlet />
            </div>
        </>
    );
}
