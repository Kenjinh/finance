'use client';

import {useTheme} from 'next-themes';
import { useEffect, useState } from 'react';

import { SunIcon, MoonIcon } from '@heroicons/react/20/solid';
import { Switch } from '@nextui-org/react';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <Switch
    defaultSelected
    size='sm'
    color='secondary'
    onChange={()=> theme == 'dark' ? setTheme('light') : setTheme('dark')}
    thumbIcon={({ isSelected, className }) =>
        isSelected ? (
            <SunIcon className={className} />
            ) : (
            <MoonIcon className={className} />
        )
    }
    >
    </Switch>
    )
};