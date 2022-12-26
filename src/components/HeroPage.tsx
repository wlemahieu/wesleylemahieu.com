/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import profileImg from '@assets/profile.jpg';
import pugsllcLogo from '@assets/pugsllc-logo.png';
import coinSpongeLogo from '@assets/coinsponge-logo.png';
import axsripoffLogo from '@assets/axsripoff-logo.png';
import github from '@assets/github.svg';

const features = [
  {
    name: 'PugsLLC.com',
    href: 'https://pugsllc.com',
    description: 'A simple landing page for Pugs, LLC.',
    icon: () => <img style={{ width: '20px' }} src={pugsllcLogo} alt="PugsLLC.com logo" />,
  },
  {
    name: 'CoinSponge.com',
    href: 'https://coinsponge.com',
    description:
      'A website for finding crypto related information such as prices, social trends and coins that have real utility.',
    icon: () => <img style={{ width: '20px' }} src={coinSpongeLogo} alt="CoinSponge.com logo" />,
  },
  {
    name: 'AXSRipoff.com',
    href: 'https://axsripoff.com',
    description: 'A website where people can share their frustrating experiences with AXS.com.',
    icon: () => <img style={{ width: '20px' }} src={axsripoffLogo} alt="AXSRipoff.com logo" />,
  },
];

const HeroPage = () => {
  return (
    <>
      <div className="relative bg-gray-50">
        <Popover className="relative bg-white shadow">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 px-6">
                <div className="flex justify-between items-center py-6">
                  <div className="flex justify-start">
                    <a href="#">
                      <span className="sr-only">Workflow</span>
                      <img style={{ width: '60px' }} src={pugsllcLogo} alt="PugsLLC.com logo" />
                    </a>
                  </div>
                  <div className="-mr-2 -my-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                      <span>Open portfolio</span>
                      <MenuIcon className="h-10 w-10" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  static
                  className="absolute top-0 inset-x-0 z-10 p-2 transition transform origin-top-right"
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                    <div className="pt-5 pb-6 px-5">
                      <div className="flex items-center justify-between">
                        <div></div>
                        <div className="-mr-2">
                          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                            <span>Close portfolio</span>
                            <XIcon className="h-10 w-10" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="mt-6">
                        <nav className="grid gap-y-8">
                          {features.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                              target="_blank"
                              rel="external nofollow noopener"
                            >
                              <item.icon aria-hidden="true" />
                              <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                            </a>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <main>
          <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center">
            <div className="px-4 px-8">
              <img src={profileImg} alt="" width="140px" style={{ margin: '0 auto' }} />
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 text-5xl">
                <span>Hi, I'm Wes.</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 text-xl">
                I love to create things, have two pugs and enjoy traveling.
              </p>
              <div className="mt-10 flex justify-center">
                <div className="mt-3 rounded-md shadow mt-0 ml-3">
                  <a
                    href="https://pugsllc.com/contact"
                    target="_blank"
                    rel="external nofollow noopener"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Contact me
                  </a>
                </div>
                <div className="mt-3 rounded-md shadow mt-0 ml-3">
                  <a
                    href="https://github.com/wlemahieu?tab=repositories"
                    target="_blank"
                    rel="external nofollow noopener"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
                  >
                    <img src={github} width="20px" style={{ paddingRight: '4px' }} /> My Github
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div style={{ textAlign: 'center', marginTop: '.75rem' }}>
        Like crypto? Check out{' '}
        <a
          href="https://nano.org"
          target="_blank"
          rel="external nofollow noopener"
          className="font-small text-blue-600"
        >
          Nano!
        </a>
      </div>
    </>
  );
};

export default HeroPage;
