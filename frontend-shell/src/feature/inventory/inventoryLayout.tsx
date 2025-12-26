import React from 'react'
interface Props {
    checkInventoryHealth(): Promise<void>
    handleCreateInventory(): Promise<void>
    error: string | null
    result: unknown
}
export default function InventoryLayout({ checkInventoryHealth, handleCreateInventory, error, result }: Props) {
    return (
        <>
            <button onClick={checkInventoryHealth}>
                Check Inventory Health
            </button>

            <button onClick={handleCreateInventory} style={{ marginLeft: 12 }}>
                Create Inventory
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        </>
    )
}
