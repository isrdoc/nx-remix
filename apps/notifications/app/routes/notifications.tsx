import { redirect, json } from '@remix-run/node';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import {
  useLoaderData,
  Form,
  useSubmit,
  useTransition,
} from '@remix-run/react';

import { Divider } from '@nx-remix/divider';

import { db } from './notifications.server';
import type { Notification } from './notifications.types';
import rootStyles from '../root.styles';

// Use to demo call to express service with notifications
// Run: yarn nx serve apps/notifications-service
// const API = 'http://localhost:5001'

type LoaderData = { notifications: Notification[] };

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const typeSearchQuery = search.get('type');

  // Imitate slow network/server
  // await new Promise((resolve) => setTimeout(resolve, 2000))

  // Use to demo call to express service with notifications
  // const searchResponse = await fetch(`${API}/search?type=${search.get('type') || ''}`)
  // const notifications = await searchResponse.json()

  const allNotifications = (await db.notification.findMany(
    {}
  )) as Notification[];
  let filteredNotifications = !typeSearchQuery
    ? ([] as Notification[])
    : allNotifications.filter((notification) =>
        notification.type.includes(typeSearchQuery.toUpperCase())
      );

  const notifications = typeSearchQuery
    ? filteredNotifications
    : allNotifications;
  const data: LoaderData = { notifications };
  return json(data);
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const typeSearchQuery = form.get('type');
  return redirect(`/notifications?type=${typeSearchQuery}`);
};

export default function Notifications() {
  const { notifications } = useLoaderData<LoaderData>();
  const submit = useSubmit();
  const transition = useTransition();

  function handleChange(event: React.FormEvent<HTMLFormElement>) {
    submit(event.currentTarget, { replace: true });
  }

  return (
    <div className={classes['notifications__container']}>
      <h2 className={classes['notifications__title']}>Notifications</h2>

      <Divider />

      <Form
        className={classes['notifications__search-form']}
        method="post"
        action="/notifications"
        onChange={handleChange}
      >
        <input
          className={classes['notifications__search-input']}
          type="text"
          name="type"
          placeholder="Type to filter events"
        />
      </Form>
      {transition.submission && <div>Searching...</div>}
      {notifications.map((notification) => (
        <div key={notification.id}>{JSON.stringify(notification)}</div>
      ))}
    </div>
  );
}

const classes = {
  ['notifications__container']: `notifications__container
  ${rootStyles['page-px']} py-6`,

  ['notifications__title']: `notifications__title
  text-green-500 font-bold text-2xl`,

  ['notifications__search-form']: `notifications__search-form`,

  ['notifications__search-input']: `notifications__search-input`,
};
