import React from "react";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillDelete,
  AiFillLeftCircle,
} from "react-icons/ai";
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
  index = 0,
  moveToIndex = () => {},
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
            className="font-bold bg-transparent truncate"
            type="text"
            value={board.name}
          />
          <div ref={ref} className="rounded-full relative">
            <button
              onClick={() => {
                setShowOptions(true);
              }}
            >
              <SlOptions className="text-lg" />
            </button>
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
                <button
                  onClick={() => {
                    moveToIndex(board.id, index - 1);
                    setShowOptions(false);
                  }}
                  className="mt-1 px-3 py-2 hover:bg-zinc-900 flex items-center"
                >
                  <AiFillCaretLeft />
                  <p className="ml-1">Move Left</p>
                </button>
                <button
                  onClick={() => {
                    moveToIndex(board.id, index + 1);
                    setShowOptions(false);
                  }}
                  className="mt-1 px-3 py-2 hover:bg-zinc-900 flex items-center"
                >
                  <AiFillCaretRight />
                  <p className="ml-1">Move Right</p>
                </button>
              </div>
            ) : null}
          </div>
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
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex-1 h-full"
          >
            {board.tasks?.map((each, index) => (
              <Draggable key={each.id} draggableId={each.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    index={index}
                    className={`cursor-pointer text-sm bg-black px-2 py-2 mb-2 rounded-md`}
                  >
                    <div className="flex items-start justify-between">
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
  const [data, setData] = React.useState(
    localStorage.getItem("KANBAN")
      ? JSON.parse(localStorage.getItem("KANBAN"))
      : []
  );

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
    let draggedData = null;

    data.forEach((e) => {
      e.tasks.map((e) => {
        if (e.id === result.draggableId) draggedData = e;
      });
    });

    if (
      draggedData &&
      result?.source !== null &&
      result?.destination !== null
    ) {
      let newData = data;

      // REMOVE
      newData = newData.map((e) => {
        if (e.id === result?.source?.droppableId) {
          return {
            ...e,
            tasks: e?.tasks?.filter((e, i) => i !== result?.source?.index),
          };
        } else return e;
      });

      newData = newData.map((e) => {
        if (e.id === result?.destination?.droppableId) {
          return {
            ...e,
            tasks: [
              ...e?.tasks?.slice(0, result?.destination?.index),
              draggedData,
              ...e?.tasks?.slice(result?.destination?.index, e?.tasks.length),
            ],
          };
        } else return e;
      });

      setData(newData);
    }
  };

  const moveToIndex = (id, index) => {
    const targetData = data.find((e) => e.id === id);
    if (!targetData) return;

    let removed = data.filter((e) => e.id !== id);
    console.log(JSON.stringify(removed, null, 4));
    const final = [
      ...removed.slice(0, index),
      targetData,
      ...removed.slice(index, removed.length),
    ];

    setData(final);
  };

  React.useEffect(() => {
    if (!showList) setListName("");
  }, [showList]);

  React.useEffect(() => {
    if (data) localStorage.setItem("KANBAN", JSON.stringify(data));
  }, [data]);

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
        <div className="flex-1 mt-3 min-w-full flex overflow-x-scroll w-full">
          {data?.map((each, index) => (
            <div key={each.id} className="p-2 rounded-md flex flex-col">
              <Board
                moveToIndex={moveToIndex}
                index={index}
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
      </DragDropContext>
    </div>
  );
}
