'use client';

import {
    IconHome,
    IconSettings,
    IconUsers,
    IconChartBar,
    IconFile,
    IconLogout,
    IconChevronLeft,
    IconChevronRight,
    IconProps,
} from '@tabler/icons-react';
import {
    Group,
    Text,
    UnstyledButton,
    Stack,
    rem,
    Box,
    Divider,
    Tooltip,
    ActionIcon,
} from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
    icon: React.FC<IconProps>;
    label: string;
    href: string;
    active?: boolean;
    onClick?: () => void;
    collapsed?: boolean;
}

function NavLink({ icon: Icon, label, href, active, onClick, collapsed }: NavLinkProps) {
    const button = (
        <UnstyledButton
            component={Link}
            href={href}
            onClick={onClick}
            style={{
                display: 'block',
                width: '100%',
                padding: 'var(--mantine-spacing-xs)',
                borderRadius: 'var(--mantine-radius-sm)',
                color: active
                    ? 'var(--mantine-color-blue-filled)'
                    : 'var(--mantine-color-text)',
                backgroundColor: active
                    ? 'var(--mantine-color-blue-light)'
                    : 'transparent',
                transition: 'background-color 150ms ease',
            }}
            onMouseEnter={(e) => {
                if (!active) {
                    e.currentTarget.style.backgroundColor =
                        'var(--mantine-color-gray-light)';
                }
            }}
            onMouseLeave={(e) => {
                if (!active) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                }
            }}
        >
            <Group gap="sm" justify={collapsed ? 'center' : 'flex-start'}>
                <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                {!collapsed && (
                    <Text size="sm" fw={active ? 600 : 400}>
                        {label}
                    </Text>
                )}
            </Group>
        </UnstyledButton>
    );

    if (collapsed) {
        return (
            <Tooltip label={label} position="right" withArrow>
                {button}
            </Tooltip>
        );
    }

    return button;
}

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
    const pathname = usePathname();

    const mainLinks = [
        { icon: IconHome, label: 'Dashboard', href: '/' },
        { icon: IconChartBar, label: 'Demo', href: '/pages/demo' },
        { icon: IconUsers, label: 'Order', href: '/pages/order' },
        { icon: IconFile, label: 'Documents', href: '/documents' },
    ];

    const settingsLinks = [
        { icon: IconSettings, label: 'Settings', href: '/settings' },
    ];

    return (
        <Stack
            h="100%"
            gap={0}
            style={{
                padding: 'var(--mantine-spacing-md)',
            }}
        >
            {/* Logo/Brand Section with Collapse Button */}
            <Box mb="xl">
                <Group justify="space-between" wrap="nowrap">
                    {!collapsed && (
                        <Group gap="sm">
                            <Box
                                style={{
                                    width: rem(32),
                                    height: rem(32),
                                    borderRadius: 'var(--mantine-radius-md)',
                                    background: 'var(--mantine-color-blue-filled)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text c="white" fw={700} size="lg">
                                    A
                                </Text>
                            </Box>
                            <Text size="lg" fw={700}>
                                MyApp
                            </Text>
                        </Group>
                    )}

                    <Tooltip label={collapsed ? "Expand" : "Collapse"} position="right" withArrow>
                        <ActionIcon
                            variant="subtle"
                            color="gray"
                            onClick={onToggle}
                            size="lg"
                            style={{
                                marginLeft: collapsed ? 'auto' : 0,
                                marginRight: collapsed ? 'auto' : 0,
                            }}
                        >
                            {collapsed ? (
                                <IconChevronRight style={{ width: rem(18), height: rem(18) }} />
                            ) : (
                                <IconChevronLeft style={{ width: rem(18), height: rem(18) }} />
                            )}
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Box>

            {/* Main Navigation */}
            <Stack gap="xs" style={{ flex: 1 }}>
                {!collapsed && (
                    <Text size="xs" fw={500} c="dimmed" tt="uppercase" mb="xs">
                        Main
                    </Text>
                )}
                {mainLinks.map((link) => (
                    <NavLink
                        key={link.href}
                        {...link}
                        active={pathname === link.href}
                        collapsed={collapsed}
                    />
                ))}

                <Divider my="md" />

                {!collapsed && (
                    <Text size="xs" fw={500} c="dimmed" tt="uppercase" mb="xs">
                        Settings
                    </Text>
                )}
                {settingsLinks.map((link) => (
                    <NavLink
                        key={link.href}
                        {...link}
                        active={pathname === link.href}
                        collapsed={collapsed}
                    />
                ))}
            </Stack>

            {/* Footer/User Section */}
            <Box>
                <Divider mb="md" />
                <Tooltip label={collapsed ? "Logout" : ""} position="right" withArrow disabled={!collapsed}>
                    <UnstyledButton
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: 'var(--mantine-spacing-xs)',
                            borderRadius: 'var(--mantine-radius-sm)',
                            transition: 'background-color 150ms ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                                'var(--mantine-color-red-light)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                    >
                        <Group gap="sm" justify={collapsed ? 'center' : 'flex-start'}>
                            <IconLogout style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                            {!collapsed && <Text size="sm">Logout</Text>}
                        </Group>
                    </UnstyledButton>
                </Tooltip>
            </Box>
        </Stack>
    );
}
