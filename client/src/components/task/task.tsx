import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@apollo/client";
import { useAuth } from "../../context/authContext";
import NewTask from "./new-task";
import DeleteItemComponent from "./delete-task";
import { GET_TASKS } from "../../graphql/queries/task";


export default function Task() {
  const { userId } = useAuth();


  const { loading, error, data } = useQuery(GET_TASKS, {
    variables: { userId },
  });

  useEffect(() => { }, [data]);



  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <NewTask />
      <div
        role="list"
        className="divide-y divide-gray-100 flex items-center flex-col justify-center content-center w-[70vw] "
      >
        {data.tasks.map((task: any) => (
          <li
            key={task.id}
            className="flex w-full justify-between gap-x-10 py-5"
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-lg font-semibold leading-6 text-gray-900">
                  <a href={task.href} className="hover:underline">
                    {task.title}
                  </a>
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  <a
                    href={`mailto:${task.email}`}
                    className="truncate hover:underline"
                  >
                    {task.description}
                  </a>
                </p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{task.createdDate}</p>
              {task.lastSeen && (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Created at <time dateTime={task.createdDate} />
                </p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-x-6">
              <Menu as="div" className="relative flex-none">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <DeleteItemComponent noteId={task.id} />
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}
