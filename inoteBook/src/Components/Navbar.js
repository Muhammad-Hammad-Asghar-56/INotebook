import React, { useState } from 'react'
import { Disclosure } from '@headlessui/react';
import AddNewNote from './AddNewNote';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {  Link} from "react-router-dom";
import logo from '../img/logo.png'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
  const navigation = [
    { name: 'Dashboard', to: '/Home/Notes', current: true },
    // { name: 'Team', href: '#', current: false },
    // { name: 'Projects', href: '#', current: false },
    // { name: 'Calendar', href: '#', current: false },
  ]

  const [open,SetOpen]=useState(false);

  const handleClickEvent=(e)=>{
    SetOpen(!open); 
   }
  return (
    <>
    <Disclosure as="nav"  className="bg-gray-800 fixed top-0 left-0 right-0">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src={logo}
                    alt="Your Company"
                  />
                  <img
                    className="hidden px-2  h-10 w-auto lg:block bg-light rounded-md"
                    src={logo}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                      key={item.name}
                      to={item.to}
                      className={`rounded-md px-3 py-2 text-md font-medium underline-none ${ item.current
                        ? 'bg-gray-900 text-white': 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  as="Link"
                  to="/Home/NewNote"
                  onClick={handleClickEvent}
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <strong style={{fontSize:'1.2rem'}}>&#43;</strong> Crete New Note
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="Link"
                  to={item.to}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}

    </Disclosure>
      {open && <AddNewNote closeFunc={()=>(SetOpen(false))}/>}

</>
  )
}

export default Navbar
