"use client";

import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from 'next-themes';
interface Props {
    children: React.ReactNode;
}

const Providers = ({ children }: Props) => {

    const client = new QueryClient();

    return (
        // <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
            <QueryClientProvider client={client}>
                <ClerkProvider>
                    {children}
                </ClerkProvider>
            </QueryClientProvider>
        // </ThemeProvider>
    )
};

export default Providers
