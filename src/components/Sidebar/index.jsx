/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react';
import {
  useNavigation,
  useLoaderData,
  Form,
  NavLink,
  useSubmit,
} from 'react-router-dom';

function NavTab(params) {
  const { children, path } = params;

  return (
    <NavLink
      to={path}
      className={({ isActive, isPending }) =>
        isActive ? 'active' : isPending ? 'pending' : ''
      }
    >
      {children}
    </NavLink>
  );
}

export default function Sidebar() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  useEffect(() => {
    document.getElementById('q').value = q;
  }, [q]);

  return (
    <nav id="sidebar">
      <h1>React Router Contacts</h1>
      <div>
        <Form id="search-form" role="search">
          <input
            id="q"
            aria-label="Search contacts"
            placeholder="Search"
            type="search"
            name="q"
            defaultValue={q}
            className={searching ? 'loading' : ''}
            onChange={(event) => {
              const isFirstSearch = q == null;
              submit(event.currentTarget.form, {
                replace: !isFirstSearch,
              });
            }}
          />
          <div id="search-spinner" aria-hidden hidden={!searching} />
          <div className="sr-only" aria-live="polite"></div>
        </Form>
        <Form method="post">
          <button type="submit">New</button>
        </Form>
      </div>
      <nav>
        <ul>
          <li>
            <NavTab path={`/`}>Home</NavTab>
          </li>
          <li>
            <NavTab path={`/products`}>Products</NavTab>
            <hr style={{ borderTop: '1px solid lightgrey' }} />
          </li>
          {contacts.length ? (
            <>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavTab path={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </NavTab>
                </li>
              ))}
            </>
          ) : (
            <li>
              <i>No contacts</i>
            </li>
          )}
        </ul>
      </nav>
    </nav>
  );
}
