"use client";
import { Tab } from "@headlessui/react";

interface TabsProps {
  lists: string[];
  panels: React.ReactNode[];
}

function Tabs({ lists, panels }: TabsProps) {
  return (
    <Tab.Group>
      {/* bagian list */}

      <div className="max-w-fit mx-auto bg-indigo-50 dark:bg-gray-900 rounded-md my-3">
        <Tab.List className="flex divide-x-2 divide-white dark:divide-transparent">
          {lists.map((list, i) => (
            <Tab key={i}>
              {({ selected }) => (
                <div
                  className={`${
                    selected
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-50 text-indigo-600 dark:bg-gray-900 dark:text-white"
                  } cursor-pointer p-1 px-3 rounded-md`}
                >
                  {list}
                </div>
              )}
            </Tab>
          ))}
        </Tab.List>
      </div>

      {/* bagian panel */}

      <Tab.Panels>
        {panels.map((panel, i) => (
          <Tab.Panel key={i}>{panel}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

export default Tabs;
