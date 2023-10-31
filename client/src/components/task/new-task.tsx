import React, { useState } from "react";
import Modal from "../modal/modal";

import {  useMutation } from "@apollo/client";
import { useAuth } from "../../context/authContext";
import { CREATE_TASK, GET_TASKS } from "../../graphql/queries/task";
import toast from "react-hot-toast";


function CreateItemComponent() {
  const {userId} = useAuth()
  const [showModal, setShowModal] = useState(false);
  const [createTask] = useMutation(CREATE_TASK, {
    onCompleted: () => {
        toast.success('Task added!')
    },
    onError: () => {
        toast.error('Errow while adding new task')
    },
    refetchQueries: [
        {
          query: GET_TASKS,
          variables: {
            userId,
          },
        },
      ],
  });
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')


  const handleSubmit = async () => {
    try {
      setShowModal(false)
      const result = await createTask({ variables: { title, description, userId } });
      
      
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };


  const handleCreate = () => {
    setShowModal(true);
  };

  return (
    <div>
      <button
        className="bg-carelulu-btn block px-3 py-1 text-sm leading-6 text-white rounded-sm h-10 w-32 mt-2"
        onClick={() =>handleCreate()}
      >
        Create Item
      </button>

      {showModal && (
        <Modal
          title="Create Item"
          action="Create"
          content="Create a new item?"
          onConfirm={handleSubmit}
          onClose={() => setShowModal(false)}
          customComponent={
            <form>
              <div >
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Title
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="title"
                            id="title"
                            autoComplete="title"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="title"
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Description
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="desicription"
                          name="desicr"
                          rows={3}
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          }
        />
      )}
    </div>
  );
}

export default CreateItemComponent;
