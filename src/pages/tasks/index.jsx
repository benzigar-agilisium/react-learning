import React from "react";
import { BsCheck, BsPlus } from "react-icons/bs";
import {
  BiArrowToTop,
  BiCaretLeft,
  BiCaretRight,
  BiCheckbox,
  BiCheckboxChecked,
  BiEdit,
  BiSortDown,
  BiSortUp,
  BiTask,
} from "react-icons/bi";
import {
  AiFillCloseCircle,
  AiFillDelete,
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { format } from "date-fns";
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

export default function Tasks() {
  const [tasks, setTasks] = React.useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );

  const [userName, setUserName] = React.useState("Benzigar");
  const [showPopUp, setShowPopUp] = React.useState(false);

  const [selectedIds, setSelectedIds] = React.useState([]);

  const defaultValue = {
    checkStatus: false,
    date: new Date(),
    task: "",
    description: "",
    status: "ON-GOING",
    developedBy: "Benzigar",
    updatedAt: new Date(),
    assignee: "Benzigar",
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
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => (
        <p title={info.getValue()} className="max-w-[150px] truncate">
          {format(new Date(info.getValue()), "dd, MMM : hh:mm a")}
        </p>
      ),
    }),
    columnHelper.accessor("task", {
      header: "Task Name",
      cell: (info) => (
        <p title={info.getValue()} className="max-w-[150px] truncate">
          {info.getValue() || "-"}
        </p>
      ),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => (
        <p title={info.getValue()} className="max-w-[150px] truncate">
          {info.getValue() || "-"}
        </p>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <p title={info.getValue()} className="max-w-[150px] truncate">
          {info.getValue() === "ON-GOING" ? "On-going" : "Done"}
        </p>
      ),
    }),
    columnHelper.accessor("developedBy", {
      header: "Developed By",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("updatedAt", {
      header: "Updated At",
      cell: (info) => (
        <p title={info.getValue()} className="max-w-[150px] truncate">
          {format(new Date(info.getValue()), "dd, MMM : hh:mm a")}
        </p>
      ),
    }),
    columnHelper.accessor("assignee", {
      header: "Assignee",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("action", {
      header: "Action",
      cell: (info) => (
        <div className="text-xl flex items-center">
          <button
            className="mr-2"
            onClick={() => {
              if (tasks.find((e) => e.id === info.row.getValue("id"))) {
                setTask(tasks.find((e) => e.id === info.row.getValue("id")));
                setShowPopUp(true);
              }
            }}
          >
            <BiEdit />
          </button>
          <button
            className="bg-red-700 hover:bg-red-800 rounded-full p-1"
            onClick={() => {
              const id = tasks.find(
                (e) => e.id === info.row.getValue("id")
              )?.id;
              if (
                tasks.find((e) => e.id === info.row.getValue("id")) &&
                window.confirm("Are you to sure to delete ? ")
              )
                setTasks(tasks.filter((each) => each.id !== id));
            }}
          >
            <AiFillDelete />
          </button>
        </div>
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

  React.useEffect(() => {
    if (tasks) localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const isDate = (str) => {
    const regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
    return regex.test(str);
  };

  return (
    <div className="container mx-auto">
      {showPopUp ? (
        <div className="fixed inset-0 bg-black z-50 bg-opacity-75 flex justify-center items-end lg:items-center">
          <form
            onSubmit={addTask}
            className="border-2 border-zinc-800 flex flex-col bg-zinc-800 rounded-md overflow-hidden w-full lg:w-[50vw] lg:h-[80vh]"
          >
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
              <p className="mt-4">Developed by : </p>
              <input
                onChange={(e) => {
                  setTask({
                    ...task,
                    developedBy: e.target.value,
                  });
                }}
                value={task.developedBy}
                className="bg-zinc-900 rounded-md px-3 py-2 mt-2"
                placeholder="Task Name."
                type="text"
                name=""
                id=""
              />
              <p className="mt-4">Assignee : </p>
              <input
                onChange={(e) => {
                  setTask({
                    ...task,
                    assignee: e.target.value,
                  });
                }}
                value={task.assignee}
                className="bg-zinc-900 rounded-md px-3 py-2 mt-2"
                placeholder="Task Name."
                type="text"
                name=""
                id=""
              />
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
              <div className="flex justify-end items-center">
                <button className="bg-white font-bold mt-3 rounded-full py-2 text-black px-3 text-xs">
                  {task.id ? "Update" : "Add"}
                </button>
              </div>
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
      <div className="bg-zinc-900 rounded-md overflow-hidden mt-5 text-sm overflow-x-scroll mx-3 lg:mx-0">
        <table cellPadding={10} className="w-full">
          <thead class="bg-zinc-800">
            {reactTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th></th>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "flex items-center cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {{
                        asc: <BiSortDown className="mr-1 text-lg" />,
                        desc: <BiSortUp className="mr-1 text-lg" />,
                      }[header.column.getIsSorted()] ?? null}
                      <p>
                        {" "}
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </p>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {reactTable.getRowModel().rows.map((row) => (
              <tr
                className="hover:bg-zinc-800 border-b-2 border-black"
                key={row.id}
              >
                <td
                  onClick={() => {
                    if (selectedIds.includes(row.getValue("id")))
                      setSelectedIds(
                        selectedIds.filter(
                          (each) => each !== row.getValue("id")
                        )
                      );
                    else setSelectedIds([...selectedIds, row.getValue("id")]);
                  }}
                >
                  <button>
                    {selectedIds.includes(row.getValue("id")) ? (
                      <BiCheckboxChecked className="text-2xl" />
                    ) : (
                      <BiCheckbox className="text-2xl opacity-50" />
                    )}
                  </button>
                </td>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="my-20"></div>
      <div className="bg-zinc-900 rounded-md overflow-hidden mt-5 text-sm overflow-x-scroll">
        <table cellPadding={10} className="w-full">
          <thead class="bg-zinc-800">
            <tr>
              <th>
                <button
                  onClick={() => {
                    if (selectedIds.length === tasks.length) setSelectedIds([]);
                    else setSelectedIds(tasks.map((e) => e.id));
                  }}
                >
                  {selectedIds.length === tasks.length ? (
                    <BiCheckboxChecked className="text-2xl" />
                  ) : (
                    <BiCheckbox className="text-2xl opacity-50" />
                  )}
                </button>
              </th>
              <th>No</th>
              <th>Date</th>
              <th>Task name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Developed By</th>
              <th>Updated At</th>
              <th>Assignee</th>
              <th>Action</th>
            </tr>
          </thead>
          {tasks
            // .map((e, i) => ({ ...e, id: i + 1 }))
            .sort((a, b) => b.id - a.id)
            ?.map((e, i) => (
              <tr
                // onClick={() => {
                //   setTasks((tasks) =>
                //     tasks.map((each) =>
                //       e.id === each.id
                //         ? { ...each, checkStatus: !each.checkStatus }
                //         : each
                //     )
                //   );
                // }}
                className="hover:bg-zinc-800 border-b-2 border-black"
              >
                <td
                  onClick={() => {
                    if (selectedIds.includes(e.id))
                      setSelectedIds(
                        selectedIds.filter((each) => each !== e.id)
                      );
                    else setSelectedIds([...selectedIds, e.id]);
                  }}
                >
                  <button>
                    {selectedIds.includes(e.id) ? (
                      <BiCheckboxChecked className="text-2xl" />
                    ) : (
                      <BiCheckbox className="text-2xl opacity-50" />
                    )}
                  </button>
                </td>
                <td>{e.id}</td>
                <td className="min-w-[150px]">
                  {format(new Date(e.date), "dd, MMM : hh:mm a")}
                </td>
                <td>
                  <p title={e.task} className="max-w-[150px] truncate">
                    {e.task || "-"}
                  </p>
                </td>
                <td>
                  <p title={e.description} className="max-w-[120px] truncate">
                    {e.description || "-"}
                  </p>
                </td>
                <td className="min-w-[100px]">
                  {e.status === "ON-GOING" ? "On-going" : "Done"}
                </td>
                <td>{e.developedBy}</td>
                <td className="min-w-[150px]">
                  {e.updatedAt
                    ? format(new Date(e.updatedAt), "dd, MMM : hh:mm a")
                    : ""}
                </td>
                <td>{e.assignee}</td>
                <td>
                  <div className="text-xl flex items-center">
                    <button
                      className="mr-2"
                      onClick={() => {
                        setTask(e);
                        setShowPopUp(true);
                      }}
                    >
                      <BiEdit />
                    </button>
                    <button
                      className="bg-red-700 hover:bg-red-800 rounded-full p-1"
                      onClick={() => {
                        if (window.confirm("Are you to sure to delete ? "))
                          setTasks(tasks.filter((each) => each.id !== e.id));
                      }}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </table>
      </div> */}
      {selectedIds?.length > 0 ? (
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
      ) : null}
    </div>
  );
}
