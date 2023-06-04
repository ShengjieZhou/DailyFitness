import React from 'react';
import '../stylesheets/tailwindcss.css';

function Sidebar() {
  return (
    <div className="lg:-mt-16">
      <div className="lg:pt-16 fixed lg:sticky top-0 left-0 right-0 py-0 shadow lg:shadow-none">
        <div className="sticky top-0 lg:bottom-0 lg:h-[calc(100vh-4rem)] flex flex-col">
          <div className="overflow-y-scroll no-bg-scrollbar lg:w-[342px] grow bg-wash" style={{ overscrollBehavior: 'contain' }}>
            <aside className="lg:grow flex-col w-full pb-8 lg:pb-0 lg:max-w-xs z-10 hidden lg:block">
              <nav role="navigation" style={{ '--bg-opacity': '.2' }} className="w-full lg:h-auto grow pr-0 lg:pr-5 pt-6 lg:pb-16 md:pt-4 lg:pt-4 scrolling-touch scrolling-gpu">
                <ul>
                  <div className="opacity-100" style={{ transition: 'opacity 250ms ease-in-out' }}>
                    <div id="react-collapsed-panel-:R49bm:" aria-hidden="false" style={{ boxSizing: 'border-box' }}>
                      <ul>
                        <li>
                          <a title="Recipe recommendation" target="" className="p-2 pr-2 w-full rounded-none lg:rounded-r-2xl text-left hover:bg-gray-5 relative flex items-center justify-between pl-5 text-base font-bold text-primary" href="/receipt">
                            <span>Recipe recommendation</span>
                            <span className="pr-1 text-tertiary ">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="duration-100 ease-in transition -rotate-90" style={{ minWidth: '20px', minHeight: '20px' }}>
                              <g fill="none" fillRule="evenodd" transform="translate(-446 -398)">
                                  <path fill="currentColor" fillRule="nonzero" d="M95.8838835,240.366117 C95.3957281,239.877961 94.6042719,239.877961 94.1161165,240.366117 C93.6279612,240.854272 93.6279612,241.645728 94.1161165,242.133883 L98.6161165,246.633883 C99.1042719,247.122039 99.8957281,247.122039 100.383883,246.633883 L104.883883,242.133883 C105.372039,241.645728 105.372039,240.854272 104.883883,240.366117 C104.395728,239.877961 103.604272,239.877961 103.116117,240.366117 L99.5,243.982233 L95.8838835,240.366117 Z" transform="translate(356.5 164.5)"></path>
                                </g>
                              </svg>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a title="Dietary recommendation" target="" className="p-2 pr-2 w-full rounded-none lg:rounded-r-2xl text-left hover:bg-gray-5 relative flex items-center justify-between pl-5 text-base font-bold text-primary" href="/">
                            <span>Dietary recommendation</span>
                            <span className="pr-1 text-tertiary ">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="duration-100 ease-in transition -rotate-90" style={{ minWidth: '20px', minHeight: '20px' }}>
                              <g fill="none" fillRule="evenodd" transform="translate(-446 -398)">
                                  <path fill="currentColor" fillRule="nonzero" d="M95.8838835,240.366117 C95.3957281,239.877961 94.6042719,239.877961 94.1161165,240.366117 C93.6279612,240.854272 93.6279612,241.645728 94.1161165,242.133883 L98.6161165,246.633883 C99.1042719,247.122039 99.8957281,247.122039 100.383883,246.633883 L104.883883,242.133883 C105.372039,241.645728 105.372039,240.854272 104.883883,240.366117 C104.395728,239.877961 103.604272,239.877961 103.116117,240.366117 L99.5,243.982233 L95.8838835,240.366117 Z" transform="translate(356.5 164.5)"></path>
                                </g>
                              </svg>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a title="Fitness video" target="" className="p-2 pr-2 w-full rounded-none lg:rounded-r-2xl text-left hover:bg-gray-5 relative flex items-center justify-between pl-5 text-base font-bold text-primary" href="/">
                            <span>Fitness video</span>
                            <span className="pr-1 text-tertiary ">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="duration-100 ease-in transition -rotate-90" style={{ minWidth: '20px', minHeight: '20px' }}>
                              <g fill="none" fillRule="evenodd" transform="translate(-446 -398)">
                                  <path fill="currentColor" fillRule="nonzero" d="M95.8838835,240.366117 C95.3957281,239.877961 94.6042719,239.877961 94.1161165,240.366117 C93.6279612,240.854272 93.6279612,241.645728 94.1161165,242.133883 L98.6161165,246.633883 C99.1042719,247.122039 99.8957281,247.122039 100.383883,246.633883 L104.883883,242.133883 C105.372039,241.645728 105.372039,240.854272 104.883883,240.366117 C104.395728,239.877961 103.604272,239.877961 103.116117,240.366117 L99.5,243.982233 L95.8838835,240.366117 Z" transform="translate(356.5 164.5)"></path>
                                </g>
                              </svg>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a title="Food Diary" target="" className="p-2 pr-2 w-full rounded-none lg:rounded-r-2xl text-left hover:bg-gray-5 relative flex items-center justify-between pl-5 text-base font-bold text-primary" href="/">
                            <span>Food Diary</span>
                            <span className="pr-1 text-tertiary ">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="duration-100 ease-in transition -rotate-90" style={{ minWidth: '20px', minHeight: '20px' }}>
                              <g fill="none" fillRule="evenodd" transform="translate(-446 -398)">
                                  <path fill="currentColor" fillRule="nonzero" d="M95.8838835,240.366117 C95.3957281,239.877961 94.6042719,239.877961 94.1161165,240.366117 C93.6279612,240.854272 93.6279612,241.645728 94.1161165,242.133883 L98.6161165,246.633883 C99.1042719,247.122039 99.8957281,247.122039 100.383883,246.633883 L104.883883,242.133883 C105.372039,241.645728 105.372039,240.854272 104.883883,240.366117 C104.395728,239.877961 103.604272,239.877961 103.116117,240.366117 L99.5,243.982233 L95.8838835,240.366117 Z" transform="translate(356.5 164.5)"></path>
                                </g>
                              </svg>
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ul>
              </nav>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
