import React, { useState } from "react";
import Modal from "../modal/modal";

import { useMutation } from "@apollo/client";
import { useAuth } from "../../context/authContext";
import { DELETE_TASK, GET_TASKS } from "../../graphql/queries/task";
import toast from "react-hot-toast";

interface IProps {
  noteId: string;
}


function DeleteItemComponent({ noteId }: IProps) {
  const [showModal, setShowModal] = useState(false);
  const { userId } = useAuth();
  const [deleteTask, { loading: deleteLoading }] = useMutation(DELETE_TASK, {
    
    onCompleted: () => {
        toast.success('Task successfully deleted.')
    },
    refetchQueries: [
      {
        query: GET_TASKS,
        variables: {
          userId,
        },
      },
    ],
    onError: (err) => {
       toast.error('Error on deleting task')
    },
  });

  const handleDelete = () => {
    
    deleteTask({
      variables: {
        userId,
        noteId,
      },
    });
    setShowModal(false);
  };

  return (
    <div>
      <button
        className="block px-3 py-1 text-sm leading-6 text-gray-900"
        onClick={() => setShowModal(true)}
      >
        Delete Item
      </button>

      {showModal && (
        <Modal
          title="Delete Item"
          action="Delete"
          content="Are you sure you want to delete this item?"
          onConfirm={handleDelete}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default DeleteItemComponent;
