import { useCallback, useEffect, useState,Fragment } from "react";
import { ethers } from "ethers";
import { ChainId } from "@biconomy/core-types";
import truncateEthAddress from 'truncate-eth-address'
import SocialLogin from "@biconomy/web3-auth";
import SmartAccount from "@biconomy/smart-account";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  ChatAltIcon,
  CodeIcon,
  DotsVerticalIcon,
  EyeIcon,
  FlagIcon,
  PlusSmIcon,
  SearchIcon,
  ShareIcon,
  StarIcon,
  ThumbUpIcon,
} from "@heroicons/react/solid";
import {
  BellIcon,
  DocumentIcon,
  HomeIcon,
  MenuIcon,
  UserGroupIcon,
  XIcon,
} from "@heroicons/react/outline";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Link from "next/link";
import Head from "next/head";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



const navigation = [
  { name: "Marketplace", href: "/Tutorials", icon: UserGroupIcon, current: false },
  { name: "Blog", href: "/Blog", icon: DocumentIcon, current: false },
  { name: "Media", href: "/Content", icon: HomeIcon, current: true },
];

const communities = [
  { name: "Subscription", href: "/Subscribe" },
  { name: "UnSubcription", href: "/Unsubscribe" },
];
const explore = [
  {
    name: "Product",
    href: "#",
  },
];
const tabs = [
  { name: "Recent", href: "#", current: true },
  { name: "Most Liked", href: "#", current: false },
  { name: "Most Answers", href: "#", current: false },
];
const post = [
  {
    id: "81614",
    likes: "29K",
    replies: "11K",
    views: "32.7k",
    author: {
      name: "ThePhoenixGuild",
      imageUrl:
        "https://pbs.twimg.com/profile_images/1564689303795814400/6XAwK3Oz_400x400.jpg",
      href: "#",
    },
    date: "December 3 at 11:00 AM",
    datetime: "2022-12-03T11:00:00",
    image:
      "https://bafybeia2aaq267nhfg6bpwhtigolascrd73cg4w43upoutr7iwbxiixjcm.ipfs.dweb.link/Post1.jpg",
    href: "#",
    title:
      "Here are your live updates for the day! @sneha_bb just concluded an amazing session on an Introduction to IPFS and Filecoin!",
    body: `
      <p>
      #TPGHackerHouse #Filecoin #IPFS #Gingari
      </p>
     `,
  },
  {
    id: "816",
    likes: "32K",
    replies: "10K",
    views: "42.7k",
    author: {
      name: "ThePhoenixGuild",
      imageUrl:
        "https://pbs.twimg.com/profile_images/1564689303795814400/6XAwK3Oz_400x400.jpg",
      href: "#",
    },
    date: "December 3 at 11:00 AM",
    datetime: "2022-12-03T11:00:00",
    vedio: "https://bafybeiflbvcusnb3vnjda3il6tdijajgwaeuraqnk6i5ndxq42pyugh2du.ipfs.dweb.link/videopost2.mp4",
    href: "#",
    title:
      "Hackers at work 😋 Use @tatum_io and complete the project super fast 😉",
    body: `
      <p>
      #TPGHackerHouse #Filecoin #IPFS #Gingari @PhoenixGuildHQ @Chingari_IN @devfolio @ETHGlobal @Filecoin @IPFS
      </p>
     `,
  },
  {
    id: "81615",
    likes: "32K",
    replies: "10K",
    views: "42.7k",
    author: {
      name: "ThePhoenixGuild",
      imageUrl:
        "https://pbs.twimg.com/profile_images/1564689303795814400/6XAwK3Oz_400x400.jpg",
      href: "#",
    },
    date: "December 3 at 11:00 AM",
    datetime: "2022-12-03T11:00:00",
    image:
      "https://pbs.twimg.com/media/FjB8ew2aEAE776A?format=jpg&name=900x900",
    href: "#",
    title:
      "With DAY 1 all done and dusted, we're finally moving over to DAY 2 of ETHIndia TPG Hacker House. Are you pumped? Cause we certainly are!🌸💜",
    body: `
      <p>
      #TPGHackerHouse #Filecoin #IPFS #Gingari
      </p>
     `,
  },
  // More post...
];
const whoToFollow = [
  {
    name: "ThePhoenixGuild",
    handle: "PhoenixGuildHQ",
    href: "#",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1564689303795814400/6XAwK3Oz_400x400.jpg",

  },
  {
    name: "Gryffindors",
    handle: "Gryffindors",
    href: "",
    imageUrl:
      "https://www.hp-lexicon.org/wp-content/uploads/2015/08/gryffindor-shield.jpg",
  },
];

function classNames(...classes : string[]): string {
  return classes.filter(Boolean).join(" ");
}

const Home = () => {
  const [provider, setProvider] = useState<any>();
  const [account, setAccount] = useState<string>();
  const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null);
  const [scwAddress, setScwAddress] = useState("");
  const [scwLoading, setScwLoading] = useState(false);
  const [socialLoginSDK, setSocialLoginSDK] = useState<SocialLogin | null>(
    null
  );

  const connectWeb3 = useCallback(async () => {
    if (typeof window === "undefined") return;
    console.log("socialLoginSDK", socialLoginSDK);
    if (socialLoginSDK?.provider) {
      const web3Provider = new ethers.providers.Web3Provider(
        socialLoginSDK.provider
      );
      setProvider(web3Provider);
      const accounts = await web3Provider.listAccounts();
      setAccount(accounts[0]);
      return;
    }
    if (socialLoginSDK) {
      socialLoginSDK.showWallet();
      return socialLoginSDK;
    }
    const sdk = new SocialLogin();
    await sdk.init(ethers.utils.hexValue(80001));
    setSocialLoginSDK(sdk);
    sdk.showConnectModal();
    sdk.showWallet();
    return socialLoginSDK;
  }, [socialLoginSDK]);

  // if wallet already connected close widget
  useEffect(() => {
    console.log("hidelwallet");
    if (socialLoginSDK && socialLoginSDK.provider) {
      socialLoginSDK.hideWallet();
    }
  }, [account, socialLoginSDK]);

  // after metamask login -> get provider event
  useEffect(() => {
    const interval = setInterval(async () => {
      if (account) {
        clearInterval(interval);
      }
      if (socialLoginSDK?.provider && !account) {
        connectWeb3();
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [account, connectWeb3, socialLoginSDK]);

  const disconnectWeb3 = async () => {
    if (!socialLoginSDK || !socialLoginSDK.web3auth) {
      console.error("Web3Modal not initialized.");
      return;
    }
    await socialLoginSDK.logout();
    socialLoginSDK.hideWallet();
    setProvider(undefined);
    setAccount(undefined);
    setScwAddress("");
  };

  

  useEffect(() => {
    async function setupSmartAccount() {
      setScwAddress("");
      setScwLoading(true);
      const smartAccount = new SmartAccount(provider, {
        activeNetworkId: ChainId.GOERLI,
        supportedNetworksIds: [ChainId.GOERLI],
      });
      await smartAccount.init();
      const context = smartAccount.getSmartAccountContext();
      setScwAddress(context.baseWallet.getAddress());
      setSmartAccount(smartAccount);
      setScwLoading(false);
    }
    if (!!provider && !!account) {
      setupSmartAccount();
      console.log("Provider...", provider);
    }
  }, [account, provider]);
  return (
      <>
      <Head>
        <title>NFT Media</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="min-h-full">
          <Popover
            as="header"
            className={({ open }) =>
              classNames(
                open ? "fixed inset-0 z-40 overflow-y-auto" : "",
                "bg-white shadow-sm lg:static lg:overflow-y-visible"
              )
            }
          >
            {({ open }) => (
              <>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-6">
                    <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                      <div className="flex-shrink-0 flex items-center">
                        <Link href="/">
                          <h1 className="text-2xl font-bold">NFT Media</h1>
                        </Link>
                      </div>
                    </div>
                    
                    <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                      <div className="flex items-center px-6 py-9 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                        <div className="w-full">
                          <label htmlFor="search" className="sr-only">
                            Search
                          </label>
                          <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                              <SearchIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </div>
                            <input
                              id="search"
                              name="search"
                              className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                              placeholder="Search"
                              type="search"
                            />
                          </div>
                        </div>
                        
                      </div>
                      
                    </div>
                    <div className="border-t justify-center border-gray-200 pt-4 ">
                  <div className="max-w-3xl mx-auto   flex items-center sm:px-6">
                    <div className="flex-shrink-0">
                    <div className="flex justify-center py-2 px-4 bg-white rounded-lg shadow">
                      <a
                        href="#"
                        className="text-sm font-medium pt-1 text-gray-900 hover:underline"
                      >
                        Go Premium
                      </a>
                      <a
                        href="#"
                        className="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 "
                      >
                         <Popup
    trigger={<AiOutlineCloudUpload className="h-6 w-6" />}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Upload Post </div>
        <div className="content">
        <form action="#" method="POST">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="bg-white py-6 px-4 space-y-6 sm:p-6">

              <div className="grid grid-cols-3 gap-6">
             
                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Upload photo</label>
                  <div className="mt-1 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder=""
                      defaultValue={''}
                    />
                  </div>
                </div>
            </div>
            
           
          </div>
        </form>
        </div>
        <div className="actions">
         <button className=" bg-blue-500 text-sm hover:bg-emerald-400 rounded-xl px-8 py-2">Post</button>
          
        </div>
      </div>
    )}
  </Popup>
                        
                      </a>
                      <a
                        href="#"
                        className="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </a>
                    </div>
                    
                  </div>
                  <div className="grid grid-flow-col px-9 ">
                    {account && <div className="px-2">Address: {truncateEthAddress(account)}</div>}
              
                    {account ? (
                      <button
                        className="btn-grad1 px-4  "
                        onClick={disconnectWeb3}
                      >
                        Disconnect Wallet
                      </button>
                    ) : (
                      <button className="btn-grad px-4" onClick={connectWeb3}>
                        Connect Wallet
                      </button>
                    )}
                    </div>
                  </div>
                </div>
                    
                    <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                      {/* Mobile menu button */}
                      <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                        <span className="sr-only">Open menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Popover.Button>
                    </div>
                    <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                      {/* Profile dropdown */}
                      <Menu as="div" className="flex-shrink-0 relative ml-6">
                        <div>
                          <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                            <span className="sr-only">Open user menu</span>
                            
                            
                          </Menu.Button>
                        </div>
                      </Menu>{" "}
                      {}
                    </div>
                  </div>
                </div>
  
                <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                  <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current
                            ? "bg-gray-100 text-gray-900"
                            : "hover:bg-gray-50",
                          "block rounded-md py-2 px-3 text-base font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  
  
                  <div className="mt-6 max-w-3xl mx-auto px-4 sm:px-6">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700"
                    >
                      New Post
                    </a>
  
                    <div className="mt-6 flex justify-center">
                      <Link
                        href="#"
                        className="text-base font-medium text-gray-900 hover:underline"
                      >
                        Blogs
                      </Link>
                    </div>
                  </div>
                </Popover.Panel>
              </>
            )}
          </Popover>
  
          <div className="py-5">
            <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
                <nav
                  aria-label="Sidebar"
                  className="sticky top-4 divide-y divide-gray-300"
                >
                  <div className="pb-8 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50",
                          "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="pt-10">
                    <p
                      className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      id="communities-headline"
                    >
                      My Subscription
                    </p>
                    <div
                      className="mt-3 space-y-2"
                      aria-labelledby="communities-headline"
                    >
                      {communities.map((community) => (
                        <Link
                          key={community.name}
                          href={community.href}
                          className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                        >
                          <span className="truncate">{community.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="pt-10">
                    <p
                      className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      id="communities-headline"
                    >
                      Explore
                    </p>
                    <div
                      className="mt-3 space-y-2"
                      aria-labelledby="communities-headline"
                    >
                      {explore.map((community) => (
                        <Link
                          key={community.name}
                          href={community.href}
                          className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                        >
                          <span className="truncate">{community.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                </nav>
              </div>
              <main className="lg:col-span-9 xl:col-span-6">
                <div className="px-4 sm:px-0">
                  <div className="sm:hidden">
                    <label htmlFor="question-tabs" className="sr-only">
                      Select a tab
                    </label>
                    <select
                      id="question-tabs"
                      className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                      defaultValue={tabs.find((tab) => tab.current).name}
                    >
                      {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="hidden sm:block">
                    <nav
                      className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
                      aria-label="Tabs"
                    >
                      {tabs.map((tab, tabIdx) => (
                        <Link
                          key={tab.name}
                          href={tab.href}
                          aria-current={tab.current ? "page" : undefined}
                          className={classNames(
                            tab.current
                              ? "text-gray-900"
                              : "text-gray-500 hover:text-gray-700",
                            tabIdx === 0 ? "rounded-l-lg" : "",
                            tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                            "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                          )}
                        >
                          <span>{tab.name}</span>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              tab.current ? "bg-rose-500" : "bg-transparent",
                              "absolute inset-x-0 bottom-0 h-0.5"
                            )}
                          />
                        </Link>
                      ))}
                    </nav>
                    
                  </div>
                </div>
                <div className="mt-4">
                {account ? (
                     <><h1 className="sr-only">Recent post</h1>
                     <ul role="list" className="space-y-4">
                       {post.map((posts) => (
                         <li
                           key={posts.id}
                           className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg"
                         >
                           <article aria-labelledby={"question-title-" + posts.id}>
                             <div>
                               <div className="flex space-x-3">
                                 <div className="flex-shrink-0">
                                   <img
                                     className="h-10 w-10 rounded-full"
                                     src={posts.author.imageUrl}
                                     alt=""
                                   />
                                 </div>
                                 
                                 <div className="min-w-0 flex-1">
                                   <p className="text-sm font-medium text-gray-900">
                                     <a
                                       href={posts.author.href}
                                       className="hover:underline"
                                     >
                                       {posts.author.name}
                                     </a>
                                   </p>
                                   <p className="text-sm text-gray-500">
                                     <a
                                       href={posts.href}
                                       className="hover:underline"
                                     >
                                       <time dateTime={posts.datetime}>
                                         {posts.date}
                                       </time>
                                     </a>
                                   </p>
                                 </div>
                                 <div className="flex-shrink-0 self-center flex">
                                   <Menu
                                     as="div"
                                     className="relative inline-block text-left"
                                   >
                                     <div>
                                       <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                                         <span className="sr-only">
                                           Open options
                                         </span>
                                         <DotsVerticalIcon
                                           className="h-5 w-5"
                                           aria-hidden="true"
                                         />
                                       </Menu.Button>
                                     </div>
     
                                     <Transition
                                       as={Fragment}
                                       enter="transition ease-out duration-100"
                                       enterFrom="transform opacity-0 scale-95"
                                       enterTo="transform opacity-100 scale-100"
                                       leave="transition ease-in duration-75"
                                       leaveFrom="transform opacity-100 scale-100"
                                       leaveTo="transform opacity-0 scale-95"
                                     >
                                       <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                         <div className="py-1">
                                           <Menu.Item>
                                             {({ active }) => (
                                               <a
                                                 href="#"
                                                 className={classNames(
                                                   active
                                                     ? "bg-gray-100 text-gray-900"
                                                     : "text-gray-700",
                                                   "flex px-4 py-2 text-sm"
                                                 )}
                                               >
                                                 <StarIcon
                                                   className="mr-3 h-5 w-5 text-gray-400"
                                                   aria-hidden="true"
                                                 />
                                                 <span>Add to favorites</span>
                                               </a>
                                             )}
                                           </Menu.Item>
                                           <Menu.Item>
                                             {({ active }) => (
                                               <a
                                                 href="#"
                                                 className={classNames(
                                                   active
                                                     ? "bg-gray-100 text-gray-900"
                                                     : "text-gray-700",
                                                   "flex px-4 py-2 text-sm"
                                                 )}
                                               >
                                                 <CodeIcon
                                                   className="mr-3 h-5 w-5 text-gray-400"
                                                   aria-hidden="true"
                                                 />
                                                 <span>Embed</span>
                                               </a>
                                             )}
                                           </Menu.Item>
                                           <Menu.Item>
                                             {({ active }) => (
                                               <a
                                                 href="#"
                                                 className={classNames(
                                                   active
                                                     ? "bg-gray-100 text-gray-900"
                                                     : "text-gray-700",
                                                   "flex px-4 py-2 text-sm"
                                                 )}
                                               >
                                                 <FlagIcon
                                                   className="mr-3 h-5 w-5 text-gray-400"
                                                   aria-hidden="true"
                                                 />
                                                 <span>Report content</span>
                                               </a>
                                             )}
                                           </Menu.Item>
                                         </div>
                                       </Menu.Items>
                                     </Transition>
                                   </Menu>
                                 </div>
                               </div>
                               <img
                                 id={"question-title-" + posts.id}
                                 className="mt-4 text-base font-medium text-gray-900"
                                 src={posts.image}
                               />
                               {posts.vedio ? ( <video width="520"  autoPlay muted>
                                 <source src={posts.vedio} type="video/mp4" />
                                 </video>):
                                 (<></>)}
                               <h2
                                 id={"question-title-" + posts.id}
                                 className="mt-4 text-base font-medium text-gray-900"
                               >
                                 {posts.title}
                               </h2>
                             </div>
                             <div
                               className="mt-2 text-sm text-gray-700 space-y-4"
                               dangerouslySetInnerHTML={{ __html: posts.body }}
                             />
                             <div className="mt-6 flex justify-between space-x-8">
                               <div className="flex space-x-6">
                                 <span className="inline-flex items-center text-sm">
                                   <button
                                     type="button"
                                     className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                   >
                                     <ThumbUpIcon
                                       className="h-5 w-5"
                                       aria-hidden="true"
                                     />
                                     <span className="font-medium text-gray-900">
                                       {posts.likes}
                                     </span>
                                     <span className="sr-only">likes</span>
                                   </button>
                                 </span>
                                 <span className="inline-flex items-center text-sm">
                                   <button
                                     type="button"
                                     className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                   >
                                     <ChatAltIcon
                                       className="h-5 w-5"
                                       aria-hidden="true"
                                     />
                                     <span className="font-medium text-gray-900">
                                       {posts.replies}
                                     </span>
                                     <span className="sr-only">replies</span>
                                   </button>
                                 </span>
                                 <span className="inline-flex items-center text-sm">
                                   <button
                                     type="button"
                                     className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                   >
                                     <EyeIcon
                                       className="h-5 w-5"
                                       aria-hidden="true"
                                     />
                                     <span className="font-medium text-gray-900">
                                       {posts.views}
                                     </span>
                                     <span className="sr-only">views</span>
                                   </button>
                                 </span>
                               </div>
                               <div className="flex text-sm">
                                 <span className="inline-flex items-center text-sm">
                                   <button
                                     type="button"
                                     className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                   >
                                     <ShareIcon
                                       className="h-5 w-5"
                                       aria-hidden="true"
                                     />
                                     <span className="font-medium text-gray-900">
                                       Share
                                     </span>
                                   </button>
                                 </span>
                               </div>
                             </div>
                           </article>
                         </li>
                       ))}
                     </ul></>
                    ) : (
                      <div className=" flex justify-center ">                      
                      <h2 className="py-3 px-3">Please Subscribe our Channel</h2>

                      <button className="btn-grad px-4"  onClick={connectWeb3}>
                        Subscribe US
                      </button>
                     

                      </div>

                    )}
                  
                </div>
              </main>
              <aside className="hidden xl:block xl:col-span-4">
                <div className="sticky top-4 space-y-4">
                 
                  <section aria-labelledby="who-to-follow-heading">
                    <div className="bg-white rounded-lg shadow">
                      <div className="p-6">
                        <h2
                          id="who-to-follow-heading"
                          className="text-base font-medium text-gray-900"
                        >
                          Suggested for you
                        </h2>
                        <div className="mt-6 flow-root">
                          <ul
                            role="list"
                            className="-my-4 divide-y divide-gray-200"
                          >
                            {whoToFollow.map((user) => (
                              <li
                                key={user.handle}
                                className="flex items-center py-4 space-x-3"
                              >
                                <div className="flex-shrink-0">
                                  <img
                                    className="h-8 w-8 rounded-full"
                                    src={user.imageUrl}
                                    alt=""
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-gray-900">
                                    <a href={user.href}>{user.name}</a>
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    <a href={user.href}>{"@" + user.handle}</a>
                                  </p>
                                </div>
                                <div className="flex-shrink-0">
                                  <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-0.5 rounded-full bg-rose-50 text-sm font-medium text-rose-700 hover:bg-rose-100"
                                  >
                                    <PlusSmIcon
                                      className="-ml-1 mr-0.5 h-5 w-5 text-rose-400"
                                      aria-hidden="true"
                                    />
                                    <span>Follow</span>
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-6">
                          <a
                            href="#"
                            className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            View all
                          </a>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </>
    );
};

export default Home;