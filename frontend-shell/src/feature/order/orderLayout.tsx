import React from 'react'
interface Props {
    checkOrderHealth(): Promise<void>
    handleCreateOrder(): Promise<void>
    error: string | null
    result: unknown
}
export default function OrderLayout({ checkOrderHealth, handleCreateOrder, error, result }: Props) {
    return (
        <>
            <button onClick={checkOrderHealth}>
                Check Order Health
            </button>

            <button onClick={handleCreateOrder} style={{ marginLeft: 12 }}>
                Create Order
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        </>
    )
}
