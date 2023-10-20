import React from "react";
import {
  BsCheck,
  BsClock,
  BsClockFill,
  BsFillHeartFill,
  BsPlus,
  BsTextParagraph,
} from "react-icons/bs";
import {
  BiArrowToTop,
  BiCaretLeft,
  BiCaretRight,
  BiCheckbox,
  BiCheckboxChecked,
  BiEdit,
  BiHeart,
  BiSortDown,
  BiSortUp,
  BiTask,
} from "react-icons/bi";

import {
  AiFillCloseCircle,
  AiFillDelete,
  AiFillHeart,
  AiOutlineDelete,
  AiOutlineHeart,
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { IoMdClose, IoMdCloseCircle, IoMdHeartDislike } from "react-icons/io";
import { GrStatusCriticalSmall } from "react-icons/gr";
import { format, formatDistance } from "date-fns";
import {
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  useReactTable,
  getSortedRowModel,
  SortingState,
  PaginationState,
  getPaginationRowModel,
  sortingFns,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from "@tanstack/react-table";
import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import ShortUniqueId from "short-unique-id";
import useFavorites from "../../hooks/useFavorites";

export default function Tasks() {
  const [tasks, setTasks] = React.useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );

  const { randomUUID } = new ShortUniqueId({ length: 10 });

  const [userName, setUserName] = React.useState("Benzigar");
  const [showPopUp, setShowPopUp] = React.useState(false);

  const [previewTask, setPreviewTask] = React.useState(false);

  const { favorites, addToFavorites, ifFavorite, removeFavorite } =
    useFavorites();

  const [selectedIds, setSelectedIds] = React.useState([]);

  const defaultValue = {
    checkStatus: false,
    date: new Date(),
    task: "",
    description: "",
    status: "ON-GOING",
    developedBy: "",
    updatedAt: new Date(),
    assignee: "",
  };

  const [globalFilter, setGlobalFilter] = React.useState("");
  const [task, setTask] = React.useState(defaultValue);

  const fuzzySort = (rowA, rowB, columnId) => {
    let dir = 0;
    if (rowA.columnFiltersMeta[columnId]) {
      dir = compareItems(
        rowA.columnFiltersMeta[columnId]?.itemRank ?? Infinity,
        rowB.columnFiltersMeta[columnId]?.itemRank ?? Infinity
      );
    }
    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
  };

  const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
      itemRank,
    });
    return itemRank.passed;
  };

  const columnHelper = createColumnHelper();
  const [sorting, setSorting] = React.useState([]);

  const columns = [
    columnHelper.accessor("id", {
      header: "No",
      cell: (info) => (
        <p title={info.getValue()} className="max-w-[20px] truncate">
          {info.getValue() || "-"}
        </p>
      ),
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => (
        <p title={info.getValue()} className="w-[120px] truncate">
          {format(new Date(info.getValue()), "dd-MMM hh:mm a")}
        </p>
      ),
    }),
    columnHelper.accessor("task", {
      header: "Task Name",
      cell: (info) => (
        <p title={info.getValue()} className="w-[200px] truncate">
          {info.getValue() || "-"}
        </p>
      ),
    }),
    // columnHelper.accessor("description", {
    //   header: "Description",
    //   cell: (info) => (
    //     <p title={info.getValue()} className="w-[80px] truncate">
    //       {info.getValue() || "-"}
    //     </p>
    //   ),
    // }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <p title={info.getValue()} className="w-[100px] truncate">
          {info.getValue() === "ON-GOING" ? "On-going" : "Completed"}
        </p>
      ),
    }),
    columnHelper.accessor("developedBy", {
      header: "Developed By",
      cell: (info) => (
        <p title={info.getValue()} className="max-w-[100px] truncate">
          {info.getValue() || "-"}
        </p>
      ),
    }),
    columnHelper.accessor("updatedAt", {
      header: "Last Updated",
      cell: (info) => (
        <p title={info.getValue()} className="max-w-[150px] truncate">
          {formatDistance(new Date(), new Date(info.getValue()))} ago
        </p>
      ),
    }),
    columnHelper.accessor("assignee", {
      header: "Assignee",
      cell: (info) => (
        <p className="max-w-[100px] truncate">{info.getValue() || "-"}</p>
      ),
    }),
    // columnHelper.accessor("action", {
    //   header: "Action",
    //   cell: (info) => (
    //     <div className="text-xl flex items-center">
    //       <button
    //         className="mr-2"
    //         onClick={() => {
    //           if (tasks.find((e) => e.id === info.row.getValue("id"))) {
    //             setTask(tasks.find((e) => e.id === info.row.getValue("id")));
    //             setShowPopUp(true);
    //           }
    //         }}
    //       >
    //         <BiEdit />
    //       </button>
    //       <button
    //         className="bg-red-700 hover:bg-red-800 rounded-full p-1"
    //         onClick={() => {
    //           const id = tasks.find(
    //             (e) => e.id === info.row.getValue("id")
    //           )?.id;
    //           if (
    //             tasks.find((e) => e.id === info.row.getValue("id")) &&
    //             window.confirm("Are you to sure to delete ? ")
    //           )
    //             setTasks(tasks.filter((each) => each.id !== id));
    //         }}
    //       >
    //         <AiFillDelete />
    //       </button>
    //     </div>
    //   ),
    // }),
    columnHelper.accessor("uniqueId", {
      header: "",
      // cell: null,
      cell: (info) => (
        <button
          className="max-w-[50px]"
          onClick={() => {
            if (ifFavorite(info.getValue())) removeFavorite(info.getValue());
            else addToFavorites(info.getValue());
          }}
        >
          {ifFavorite(info.getValue()) ? (
            <AiFillHeart className="text-2xl text-red-500" />
          ) : (
            <AiOutlineHeart className="text-2xl opacity-50" />
          )}
        </button>
      ),
    }),
  ];

  const reactTable = useReactTable({
    data: tasks,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
      sorting: [
        {
          id: "date",
          desc: true,
        },
      ],
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
  });

  const addTask = async (e) => {
    e?.preventDefault();
    if (!task.task) return alert("Task name is required");
    if (task.id) {
      setTasks((tasks) =>
        tasks.map((t) =>
          t.id === task.id
            ? {
                ...task,
                updatedAt: new Date(),
              }
            : t
        )
      );
    } else
      setTasks((tasks) => [
        ...tasks,
        {
          id: tasks[tasks.length - 1]
            ? tasks.sort((a, b) => a.id - b.id)?.[tasks.length - 1]?.id + 1
            : 1,
          // uniqueId : randomUUID(),
          checkStatus: false,
          date: new Date(),
          task: task.task,
          description: task.description,
          status: task.status,
          developedBy: task.developedBy,
          updatedAt: new Date(),
          assignee: task.assignee,
        },
      ]);
    setTask(defaultValue);
    setShowPopUp(false);
  };

  const getHeaderWidth = (id) => {
    if (id === "id") return "10px";
    if (id === "date") return "120px";
    if (id === "task") return "200px";
    if (id === "description") return "100px";
    if (id === "status") return "120px";
    if (id === "developedBy") return "60px";
    if (id === "updatedAt") return "90px";
    if (id === "assignee") return "100px";
    if (id === "uniqueId") return "80px";
    return "auto";
  };

  React.useEffect(() => {
    if (tasks) localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const isDate = (str) => {
    const regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
    return regex.test(str);
  };

  React.useEffect(() => {
    if (tasks) {
      const newTaskWithId = tasks.map((each) =>
        each.uniqueId ? each : { ...each, uniqueId: randomUUID() }
      );
      if (JSON.stringify(newTaskWithId) !== JSON.stringify(tasks))
        setTasks(newTaskWithId);
    }
  }, [tasks]);

  React.useEffect(() => {
    if (previewTask)
      setTasks(
        tasks.map((e) =>
          e.uniqueId === previewTask.uniqueId
            ? { ...previewTask, updatedAt: new Date() }
            : e
        )
      );
  }, [previewTask]);

  React.useEffect(() => {
    const takeAction = (e) => {
      if (e.key === "Escape") {
        setPreviewTask(false);
        setShowPopUp(false);
        setTask(defaultValue);
      }
    };

    document.addEventListener("keydown", takeAction);
    return () => {
      document.removeEventListener("keydown", takeAction);
    };
  }, []);

  React.useEffect(() => {
    reactTable.setSorting([
      {
        id: "date",
        desc: true,
      },
    ]);
  }, []);

  return (
    <div className="container mx-auto">
      {previewTask ? (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 text-white flex justify-center items-end lg:items-center overflow-y-scroll">
          <div className="h-[80vh] lg:min-h-[80vh] rounded-md w-full lg:w-[60vw] bg-zinc-900 flex flex-col">
            <div className="flex items-center p-4 pb-2 px-3 lg:px-5 justify-between">
              <div className="flex-1 flex items-center">
                <BiTask className="text-3xl" />
                <input
                  onChange={(e) => {
                    setPreviewTask({
                      ...previewTask,
                      task: e.target.value,
                    });
                  }}
                  type="text"
                  value={previewTask.task}
                  className="w-full bg-transparent focus:outline-none text-white ml-2"
                />
              </div>
              <button
                className="hover:bg-black rounded-full p-2"
                onClick={() => {
                  setPreviewTask(false);
                }}
              >
                <IoMdClose className="text-white text-2xl" />
              </button>
            </div>
            <div className="overflow-y-scroll flex flex-wrap px-3 lg:px-5 pb-5">
              <div className="w-full lg:w-3/5 text-xl mr-4">
                <div className="flex">
                  <div className="bg-zinc-800 items-center text-xs flex px-2 py-1 rounded-full">
                    <BsClock className="text-sm" />
                    <p className="ml-1">
                      {format(new Date(previewTask.date), "dd-MMM hh:mm a")}
                    </p>
                  </div>
                </div>
                <div className="mt-4 w-full flex text-sm">
                  <BsTextParagraph className="text-3xl" />
                  <div className="w-full flex flex-col">
                    <p className="ml-2">Description</p>
                  </div>
                </div>
                <textarea
                  rows={5}
                  onChange={(e) => {
                    setPreviewTask({
                      ...previewTask,
                      description: e.target.value,
                    });
                  }}
                  placeholder="Add detailed description"
                  value={previewTask.description}
                  className="mt-2 w-full bg-zinc-800 rounded-md px-4 py-4 focus:outline-none text-sm"
                  type="text"
                />
                <div className="mt-4 w-full flex text-sm">
                  <GrStatusCriticalSmall className="text-xl" />
                  <div className="flex flex-col">
                    <p className="ml-2">Status</p>
                  </div>
                </div>
                <select
                  onChange={(e) => {
                    setPreviewTask({
                      ...previewTask,
                      status: e.target.value,
                    });
                  }}
                  className="bg-zinc-800 focus:outline-none px-2 py-2 rounded-md mt-2 text-sm"
                  name=""
                  id=""
                  value={previewTask.status}
                >
                  <option value="COMPLETED">Completed</option>
                  <option value="ON-GOING">On-Going</option>
                </select>
              </div>
              <div className="mt-3 lg:m-0 flex-1 text-sm">
                <p className="text-sm">Developed By</p>
                <input
                  onChange={(e) => {
                    setPreviewTask({
                      ...previewTask,
                      developedBy: e.target.value,
                    });
                  }}
                  placeholder="Mention Name.."
                  value={previewTask.developedBy}
                  className="w-full bg-zinc-800 flex items-center px-3 py-2 rounded-md mt-2"
                ></input>
                <p className="mt-4 text-sm">Assignee</p>
                <input
                  onChange={(e) => {
                    setPreviewTask({
                      ...previewTask,
                      assignee: e.target.value,
                    });
                  }}
                  placeholder="Mention Name.."
                  value={previewTask.assignee}
                  className="w-full bg-zinc-800 flex items-center px-3 py-2 rounded-md mt-2"
                ></input>
                <p className="mt-4 text-sm">Other Options</p>
                <button
                  onClick={() => {
                    if (ifFavorite(previewTask.uniqueId))
                      removeFavorite(previewTask.uniqueId);
                    else addToFavorites(previewTask.uniqueId);
                  }}
                  className="w-full bg-zinc-800 flex items-center px-3 py-2 rounded-md mt-2"
                >
                  {ifFavorite(previewTask.uniqueId) ? (
                    <BsFillHeartFill className="mr-2" />
                  ) : (
                    <BiHeart className="mr-2" />
                  )}
                  {ifFavorite(previewTask.uniqueId) ? (
                    <p>Remove from Favorites</p>
                  ) : (
                    <p>Add to Favorites</p>
                  )}
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure to delete ? ")) {
                      setTasks(
                        tasks.filter((e) => e.uniqueId !== previewTask.uniqueId)
                      );
                      setPreviewTask(false);
                    }
                  }}
                  className="w-full bg-zinc-800 flex items-center px-3 py-2 rounded-md mt-2"
                >
                  <AiOutlineDelete className="mr-2" />
                  <p>Delete</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {showPopUp ? (
        <div className="fixed inset-0 bg-black z-50 bg-opacity-75 flex justify-center items-end lg:items-center">
          <form
            onSubmit={addTask}
            className="border-2 border-zinc-800 flex flex-col justify-between bg-zinc-800 rounded-md overflow-hidden w-full lg:w-[50vw] lg:h-[80vh]"
          >
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-4 py-4 bg-zinc-900">
                <div className="flex items-center">
                  <BiTask className="text-xl mr-2" />
                  <h1 className="font-bold">Add new Task</h1>
                </div>
                <button>
                  <AiFillCloseCircle
                    onClick={() => {
                      setTask(defaultValue);
                      setShowPopUp(false);
                    }}
                    className="text-2xl"
                  />
                </button>
              </div>
              <div className="flex flex-col flex-1 overflow-y-scroll p-3 text-sm px-5">
                <p>Enter Task Name : </p>
                <input
                  onChange={(e) => {
                    setTask({
                      ...task,
                      task: e.target.value,
                    });
                  }}
                  value={task.task}
                  className="bg-zinc-900 rounded-md px-3 py-2 mt-2"
                  placeholder="Task Name."
                  type="text"
                  name=""
                  id=""
                  autoFocus
                />
                <p className="mt-4">Enter Description : </p>
                <textarea
                  onChange={(e) => {
                    setTask({
                      ...task,
                      description: e.target.value,
                    });
                  }}
                  value={task.description}
                  rows={5}
                  className="bg-zinc-900 rounded-md px-3 py-2 mt-2"
                  placeholder="Description."
                  type="text"
                  name=""
                  id=""
                />
                {/* <p className="mt-4">Developed by : </p>
              <input
                onChange={(e) => {
                  setTask({
                    ...task,
                    developedBy: e.target.value,
                  });
                }}
                value={task.developedBy}
                className="focus:outline-none bg-zinc-900 rounded-md px-3 py-2 mt-2"
                placeholder="Task Name."
                type="text"
                name=""
                id=""
              /> */}
                {/* <p className="mt-4">Assignee : </p>
              <input
                onChange={(e) => {
                  setTask({
                    ...task,
                    assignee: e.target.value,
                  });
                }}
                value={task.assignee}
                className="focus:outline-none bg-zinc-900 rounded-md px-3 py-2 mt-2"
                placeholder="Task Name."
                type="text"
                name=""
                id=""
              /> */}
                <p className="mt-4">Status : </p>
                <select
                  onChange={(e) => {
                    setTask({
                      ...task,
                      status: e.target.value,
                    });
                  }}
                  value={task.status}
                  className="bg-zinc-900 rounded-md px-3 py-2 mt-2"
                  placeholder="Task Name."
                  type="text"
                  name=""
                  id=""
                >
                  <option value="ON-GOING">Ongoing</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end items-center p-4">
              <button className="bg-white font-bold mt-3 rounded-full py-2 text-black px-3 text-xs">
                {task.id ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
      <div className="mt-5 flex items-center w-full justify-between px-4 lg:p-0">
        <div>
          <div className="flex items-center font-bold text-lg lg:text-2xl">
            <BiTask className="mr-2" />
            <h1>Tasks List</h1>
          </div>
        </div>
        <button
          onClick={() => {
            setShowPopUp(!showPopUp);
          }}
          className="bg-white text-black hover:bg-zinc-300 flex items-center px-2 py-1 rounded-full font-bold text-xs"
        >
          <BsPlus className="text-2xl" />
          <p>Add Task</p>
        </button>
      </div>
      <div className="mt-5 flex lg:items-center lg:justify-between px-3 lg:p-0">
        <div className="w-full lg:w-auto">
          <input
            onChange={(e) => {
              setGlobalFilter(e.target.value);
            }}
            value={globalFilter}
            className="w-full md:w-auto flex-1 bg-zinc-800 text-sm text-white px-5 py-2 rounded-full"
            placeholder="Search..."
            type="text"
          />
        </div>
        <div className="w-full flex justify-end">
          <div className="rounded-full flex items-center bg-zinc-800">
            <button
              onClick={() => reactTable.previousPage()}
              style={{
                opacity: reactTable.getCanPreviousPage() ? 1 : 0.5,
              }}
              disabled={!reactTable.getCanPreviousPage()}
              className="p-2 text-xl hover:bg-black"
            >
              <BiCaretLeft className="text-xl" />
            </button>
            <p className="border-x-2 border-black font-bold text-xs p-2">
              {reactTable.getState().pagination.pageIndex + 1} of{" "}
              {reactTable.getPageCount()}
            </p>
            <button
              style={{
                opacity: reactTable.getCanNextPage() ? 1 : 0.5,
              }}
              onClick={() => reactTable.nextPage()}
              disabled={!reactTable.getCanNextPage()}
              className="p-2 text-xl hover:bg-black"
            >
              <BiCaretRight />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 rounded-md overflow-hidden mt-5 text-sm mx-3 lg:mx-0">
        <div className="w-full overflow-x-scroll">
          <table cellPadding={10} className="w-full">
            <thead class="bg-zinc-800">
              {reactTable.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{
                        width: getHeaderWidth(header.id),
                      }}
                    >
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "flex items-center cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        <p className="truncate">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </p>
                        {{
                          asc: <BiSortDown className="mr-1 text-lg" />,
                          desc: <BiSortUp className="mr-1 text-lg" />,
                        }[header.column.getIsSorted()] ?? (
                          <BiSortUp className="mr-1 text-lg opacity-0" />
                        )}
                      </div>
                    </th>
                  ))}
                  {/* <th></th> */}
                </tr>
              ))}
            </thead>
            <tbody>
              {reactTable.getRowModel().rows.map((row) => (
                <tr
                  className="hover:bg-zinc-800 border-b-2 border-black"
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className="cursor-pointer"
                      onClick={() => {
                        if (
                          cell.getValue() !== undefined &&
                          !cell.id.includes("uniqueId")
                        ) {
                          setPreviewTask(
                            tasks.find(
                              (e) => e.uniqueId === row.getValue("uniqueId")
                            )
                          );
                        }
                      }}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                  {/* <td
                    onClick={() => {
                      if (ifFavorite(row.getValue("uniqueId")))
                        removeFavorite(row.getValue("uniqueId"))
                      else addToFavorites(row.getValue("uniqueId"))
                    }}
                  >
                    
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {favorites
        ?.map((each) => tasks.find((e) => e.uniqueId === each))
        ?.filter((e) => e?.id)?.length > 0 ? (
        <div className="mt-5 flex items-center w-full justify-between px-5 lg:px-2">
          <div>
            <div className="flex items-center font-bold text-lg lg:text-2xl">
              <BiHeart className="mr-2" />
              <h1>
                Favorite List (
                {
                  favorites
                    ?.map((each) => tasks.find((e) => e.uniqueId === each))
                    ?.filter((e) => e?.id)?.length
                }
                )
              </h1>
            </div>
          </div>
        </div>
      ) : null}
      <div className="mt-3 mb-5 flex w-full flex-wrap">
        {favorites
          .map((each) => tasks.find((e) => e.uniqueId === each))
          ?.filter((e) => e?.id)
          ?.reverse()
          // ?.sort((a, b) => a.id - b.id)
          ?.map((each) => (
            <div className="w-full lg:w-1/4 p-2 lg:p-2 flex flex-col">
              <button className="bg-gradient-to-br from-zinc-900 to-zinc-900 text-left hover:bg-zinc-700 transition-all duration-300 p-3 lg:px-5 rounded-md flex-1">
                <div className="border-b-2 pb-2 border-black flex justify-between items-center">
                  <h1
                    title={each.task}
                    className="font-bold text-sm w-full truncate"
                  >
                    {each.task}
                  </h1>
                  <button
                    onClick={() => {
                      removeFavorite(each.uniqueId);
                    }}
                  >
                    <IoMdCloseCircle />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="flex items-center text-xs opacity-75">
                    <BsClockFill className="mr-1" />
                    <p title={each.date} className="w-[120px] truncate">
                      {format(new Date(each.date), "dd-MMM hh:mm a")}
                    </p>
                  </p>
                  <p
                    className="text-xs bg-black px-2 py-1 rounded-full"
                    style={{
                      backgroundColor:
                        each.status === "COMPLETED" ? "green" : undefined,
                    }}
                  >
                    {each.status === "ON-GOING" ? "OnGoing" : "Completed"}
                  </p>
                </div>
              </button>
            </div>
          ))}
      </div>
      {/* {selectedIds?.length > 0 ? (
        <div className="flex items-center m-4 lg:m-0">
          <button
            onClick={() => {
              if (window.confirm("Are you sure to delete all ? ")) {
                setTasks((tasks) =>
                  tasks.filter((e) => !selectedIds.includes(e.id))
                );
                setSelectedIds([]);
              }
            }}
            className="font-bold text-xs flex items-center bg-red-500 hover:bg-red-800 rounded-full py-1 px-2"
          >
            <AiFillDelete className="text-sm mr-1" />
            <p>Delete Selected</p>
          </button>
        </div>
      ) : null} */}
    </div>
  );
}
