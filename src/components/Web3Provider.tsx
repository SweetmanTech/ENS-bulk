import { useTheme } from 'next-themes'
import { APP_NAME } from '@/lib/consts'
import { createClient, WagmiConfig } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'

const client = createClient(
	getDefaultClient({
		appName: APP_NAME,
		autoConnect: true,
	})
)

const Web3Provider = ({ children }) => {
	const { resolvedTheme } = useTheme()

	return (
		<WagmiConfig client={client}>
			<ConnectKitProvider mode={resolvedTheme as 'light' | 'dark'}>{children}</ConnectKitProvider>
		</WagmiConfig>
	)
}

export default Web3Provider
