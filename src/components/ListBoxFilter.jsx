import React, { useEffect } from "react";
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const ListBoxFilter = ({ list, locale }) => {
    const [selectedList, setSelectedList] = useState(list[0])
    useEffect(() => {
        setSelectedList((prevSelect) => {
            const newSelect = { id: prevSelect.id, name: list[list.findIndex((f) => f.id === prevSelect.id)].name };
            return newSelect;
        });
    }, [locale, list]);
    return (
        <Listbox value={selectedList} onChange={setSelectedList}>
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-200 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selectedList.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </span>
            </Listbox.Button>
            <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Listbox.Options className="static lg:absolute mt-1 max-h-60 overflow-auto rounded-md bg-slate-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {list.map((l, idx) => (
                        <Listbox.Option
                            key={idx}
                            className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                }`
                            }
                            value={l}
                        >
                            {({ selected }) => (
                                <>
                                    <span
                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                            }`}
                                    >
                                        {l.name}
                                    </span>
                                    {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                </>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Transition>
        </Listbox>
    )
};

export default ListBoxFilter;
