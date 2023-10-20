import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDetectClickOutside } from "react-detect-click-outside";

import { BsFillKanbanFill, BsPlus } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import ShortUniqueId from "short-unique-id";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Board = ({
  board = {},
  deleteBoard = () => {},
  addToBoardTask = () => {},
  updateToBoardTask = () => {},
}) => {
  const { randomUUID } = new ShortUniqueId({ length: 10 });
  const [showAdd, setShowAdd] = React.useState(false);
  const [text, setText] = React.useState("");
  const [showOptions, setShowOptions] = React.useState(false);
  const ref = useDetectClickOutside({
    onTriggered: () => {
      if (showOptions) setShowOptions(false);
    },
  });

  React.useEffect(() => {
    if (!showAdd) setText("");
  }, [showAdd]);

  const addTask = () => {
    addToBoardTask(board.id, {
      id: randomUUID(),
      task: text,
      createdAt: new Date(),
    });
    setText("");
    // setShowAdd(false);
  };

  const excapeKey = (e) => {
    if (e.key === "Escape") {
      setShowAdd(false);
      setShowOptions(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("keyup", excapeKey);
    return () => {
      document.removeEventListener("keyup", excapeKey);
    };
  }, []);

  return (
    <div className="cursor-pointer text-sm w-[200px] bg-zinc-800 rounded-md p-2 flex-1 flex flex-col">
      <div className="px-2 p-2">
        <div className="flex items-center justify-between">
          <input
            onChange={(e) => {
              updateToBoardTask(board.id, {
                ...board,
                name: e.target.value,
              });
            }}
            className="bg-transparent truncate"
            type="text"
            value={board.name}
          />
          <button
            onClick={() => {
              setShowOptions(true);
            }}
            ref={ref}
            className="rounded-full relative"
          >
            <SlOptions className="text-lg" />
            {showOptions ? (
              <div className="text-xs w-[200px] z-30 absolute left-0 bg-black rounded-md shadow-xl shadow-zinc-800 flex flex-col">
                <h1 className="text-center mt-4">Options</h1>
                <button
                  onClick={() => {
                    deleteBoard(board.id);
                  }}
                  className="mt-1 px-3 py-2 hover:bg-zinc-900 flex items-center"
                >
                  <AiFillDelete />
                  <p className="ml-1">Delete</p>
                </button>
              </div>
            ) : null}
          </button>
        </div>
      </div>
      {showAdd ? (
        <div className="mb-3">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            type="text"
            placeholder="Start typing..."
            autoFocus
            name=""
            className="bg-black rounded-md focus:outline-none px-3 py-2 text-sm w-full"
            id=""
          />
          <div className="text-xs mt-2 flex items-center">
            <button className="bg-white rounded-sm px-2 py-1 text-black">
              Save
            </button>
            <button
              className="ml-2"
              onClick={() => {
                setShowAdd(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            setShowAdd(true);
          }}
          className="mb-2 text-sm opacity-75 hover:bg-black py-2 rounded-md px-2 flex items-center"
        >
          <BsPlus className="text-xl" />
          <p>Add a card</p>
        </button>
      )}
      <Droppable droppableId={board.id} className="mt-2 flex flex-col">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {board.tasks?.map((each, index) => (
              <Draggable key={each.id} draggableId={each.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    index={index}
                    className="cursor-pointer text-sm bg-black px-2 py-2 mb-2 rounded-md"
                  >
                    <div className="flex items-center justify-between">
                      <p>{each.task}</p>
                      <button
                        onClick={() => {
                          updateToBoardTask(board.id, {
                            ...board,
                            tasks: board?.tasks?.filter(
                              (e) => e.id !== each.id
                            ),
                          });
                        }}
                      >
                        <AiFillDelete className="opacity-75 hover:opacity-100" />
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default function Kanban() {
  const { randomUUID } = new ShortUniqueId({ length: 10 });
  const [data, setData] = React.useState([]);

  const [listName, setListName] = React.useState("");
  const [showList, setShowList] = React.useState(
    data.length === 0 ? true : false
  );

  const addToList = () => {
    setData([
      ...data,
      {
        id: randomUUID(),
        name: listName,
        tasks: [],
      },
    ]);
    setListName("");
  };

  const addTaskToBoard = (id, task) => {
    setData(
      data.map((e) => (e.id === id ? { ...e, tasks: [task, ...e.tasks] } : e))
    );
  };

  const excapeKey = (e) => {
    if (e.key === "Escape") setShowList(false);
  };

  const onDragEnd = (result) => {
    const newItems = data?.find(
      (e) => e.id === result.source.droppableId
    )?.tasks;
    if (
      newItems &&
      result?.source?.index !== undefined &&
      result?.destination?.index !== undefined
    ) {
      const [removed] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, removed);
      setData(
        data.map((e) =>
          e.id === result.source.droppableId ? { ...e, tasks: newItems } : e
        )
      );
    }
  };

  React.useEffect(() => {
    if (!showList) setListName("");
  }, [showList]);

  React.useEffect(() => {
    document.addEventListener("keyup", excapeKey);
    return () => {
      document.removeEventListener("keyup", excapeKey);
    };
  }, []);

  return (
    <div className="flex flex-col flex-1 mt-5 container mx-auto">
      <div className="px-3 flex items-center text-xl font-bold">
        <BsFillKanbanFill className="mr-2" />
        <h1>Kanban Demo</h1>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable direction="horizontal" droppableId={"ROOT"}>
          {(provided) => (
            <div
              className="flex-1 mt-3 min-w-full flex overflow-x-scroll w-full"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data?.map((each, index) => (
                <Draggable key={each.id} draggableId={each.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      index={index}
                      key={each.id}
                      className="p-2 rounded-md flex flex-col"
                    >
                      <Board
                        deleteBoard={(id) => {
                          setData(data.filter((e) => e.id !== id));
                        }}
                        board={each}
                        addToBoardTask={addTaskToBoard}
                        updateToBoardTask={(id, task) => {
                          setData(data.map((e) => (e.id === id ? task : e)));
                        }}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              <div className="p-2 rounded-md flex flex-col">
                <div className="text-sm w-[200px] bg-zinc-900 rounded-md p-2 flex-1 flex flex-col">
                  {showList ? (
                    <div className="flex-1">
                      <input
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addToList();
                            // setShowList(false);
                          }
                        }}
                        onChange={(e) => {
                          setListName(e.target.value);
                        }}
                        value={listName}
                        type="text"
                        placeholder="Start typing..."
                        autoFocus
                        name=""
                        className="bg-black rounded-md focus:outline-none px-3 py-2 text-sm w-full"
                        id=""
                      />
                      <div className="text-xs mt-2 flex items-center">
                        <button className="bg-white rounded-sm px-2 py-1 text-black">
                          Save
                        </button>
                        <button
                          className="ml-2"
                          onClick={() => {
                            setShowList(false);
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setShowList(true);
                      }}
                      className="text-sm opacity-75 hover:bg-black py-2 rounded-md px-2 flex items-center"
                    >
                      <BsPlus className="text-xl" />
                      <p>Add another list</p>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
