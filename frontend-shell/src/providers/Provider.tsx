"use client"

import CustomMantineProvider from "@/providers/CustomMantineProvider";
import { ReactNode } from "react";


export default function Provider({ children }: { children?: ReactNode }) {
    return (
        <CustomMantineProvider>
            {children}
        </CustomMantineProvider>
    )
}
