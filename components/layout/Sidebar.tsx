import { BsHouseFill, BsBellFill, } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import SidebarTweetButton from './SidebarTweetButton';
import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';

const Sidebar = () => {
    const { data: currentuser } = useCurrentUser();

    const items = [
        {
            label: 'Home',
            href: '/',
            icon: BsHouseFill
        },
        {
            label: 'Notification',
            href: '/notification',
            icon: BsBellFill
        },
        {
            label: 'Profile',
            href: '/user/123',
            icon: FaUser
        },
    ];
    return (
        <div className='cols-span-1 h-full pr-4 md:pr-6'>
            <div className='flex flex-col items-end'>
                <div className='space-y-2 lg:w-[230px] mt-2'>
                    <SidebarLogo />
                    {items.map(
                        (item) => (
                            <SidebarItem
                                key={item.href}
                                href={item.href}
                                label={item.label}
                                icon={item.icon}
                            />
                        )
                    )}
                    {currentuser && (
                        <SidebarItem
                            label='Logout'
                            icon={BiLogOut}
                            onClick={() => signOut()}
                        />
                    )}
                    <SidebarTweetButton />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;