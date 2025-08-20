import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, Bell, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const { t, isRTL } = useLanguage();

  const handleLogout = () => {
    logout();
  };

  const getUserInitials = () => {
    if (!user) return 'U';
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || user.username?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <div className={`flex h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className={`${isRTL ? 'ml-4' : 'mr-4'}`}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {t('welcomeBack')}, {user?.first_name || user?.username}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar_url} alt={user?.username} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align={isRTL ? 'start' : 'end'} forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.first_name} {user?.last_name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {t(user?.role?.toLowerCase())}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                    <span>{t('profile')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                    <span>{t('settings')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                    <span>{t('logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

