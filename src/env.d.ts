/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

interface ImportMetaEnv {
    readonly VITE_ACCOUNTS_API_URL: string
    readonly VITE_PRODUCTS_API_URL: string
    readonly VITE_NOTIFY_API_URL: string

    readonly VITE_ENTERPRISE_DASHBOARD_URL: string
    readonly VITE_MERCHANTS_DASHBOARD_URL: string
    readonly VITE_PAYMENTS_DASHBOARD_URL: string
    readonly VITE_PRODUCTS_DASHBOARD_URL: string
    readonly VITE_NOTIFY_DASHBOARD_URL: string
    readonly VITE_SAVINGS_DASHBOARD_URL: string
    readonly VITE_USSD_DASHBOARD_URL: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}