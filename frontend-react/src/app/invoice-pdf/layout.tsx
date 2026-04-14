import { Provider } from "@/components/ui/provider";
import React, { ReactNode } from "react";

export default function InvoicePdfLayout({ children }: { children: ReactNode }) {
    return <Provider>{children}</Provider>
}